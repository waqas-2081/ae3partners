const DEFAULT_API_HOST = 'ae3partnersadmin.testdemolink.com';

/**
 * Parse env into a bare host (no protocol / trailing slash).
 * Accepts: https://www.x.com, http://x.com, www.x.com, x.com
 */
function parseConfiguredHost(raw) {
  const value = String(raw || DEFAULT_API_HOST)
    .trim()
    .replace(/\/$/, '');
  try {
    const withScheme = /^https?:\/\//i.test(value) ? value : `http://${value}`;
    const url = new URL(withScheme);
    const host = url.hostname.replace(/^www\./i, '');
    const prefersWww = /^www\./i.test(url.hostname);
    return { host, prefersWww };
  } catch (_) {
    return { host: DEFAULT_API_HOST, prefersWww: false };
  }
}

function pageProtocol() {
  if (typeof window === 'undefined') return 'https:';
  return window.location.protocol === 'https:' ? 'https:' : 'http:';
}

function buildApiOrigin(host, withWww, protocol) {
  const hostname = withWww ? `www.${host}` : host;
  return `${protocol}//${hostname}`;
}

/** Candidate API origins: current page protocol × www/non-www. */
export function getApiOriginCandidates() {
  const { host, prefersWww } = parseConfiguredHost(process.env.REACT_APP_API_URL);
  const protocol = pageProtocol();
  const ordered = [
    buildApiOrigin(host, prefersWww, protocol),
    buildApiOrigin(host, !prefersWww, protocol),
  ];
  // On HTTP pages, HTTPS API is still fine (upgrade). Never call HTTP API from HTTPS pages.
  if (protocol === 'http:') {
    ordered.push(buildApiOrigin(host, prefersWww, 'https:'));
    ordered.push(buildApiOrigin(host, !prefersWww, 'https:'));
  }
  return [...new Set(ordered)];
}

let cachedApiBase = null;
let resolvingApiBase = null;

/**
 * Pick a working API base for http/https + www/non-www.
 * Result is cached for the session.
 */
export async function resolveApiBaseUrl() {
  if (cachedApiBase) return cachedApiBase;
  if (resolvingApiBase) return resolvingApiBase;

  resolvingApiBase = (async () => {
    const candidates = getApiOriginCandidates();
    for (const base of candidates) {
      try {
        const controller =
          typeof AbortController !== 'undefined' ? new AbortController() : null;
        const timer =
          controller && typeof window !== 'undefined'
            ? window.setTimeout(() => controller.abort(), 4500)
            : 0;
        const res = await fetch(`${base}/api/v1/project-categories`, {
          headers: { Accept: 'application/json' },
          signal: controller ? controller.signal : undefined,
        });
        if (timer) window.clearTimeout(timer);
        if (res.ok) {
          cachedApiBase = base;
          return base;
        }
      } catch (_) {
        /* try next candidate */
      }
    }
    cachedApiBase = candidates[0];
    return cachedApiBase;
  })();

  try {
    return await resolvingApiBase;
  } finally {
    resolvingApiBase = null;
  }
}

/** Sync accessor — prefer cached resolved base, else best-guess for current page. */
export function getApiBaseUrl() {
  if (cachedApiBase) return cachedApiBase;
  return getApiOriginCandidates()[0];
}

/**
 * Rewrite media URLs to match the page protocol (fixes mixed-content on HTTPS).
 * Keeps host as returned by API (www or non-www).
 */
export function normalizeMediaUrl(url) {
  if (!url || typeof url !== 'string') return url;
  try {
    const absolute = /^https?:\/\//i.test(url)
      ? url
      : `${getApiBaseUrl()}${url.startsWith('/') ? '' : '/'}${url}`;
    const parsed = new URL(absolute);
    if (typeof window !== 'undefined') {
      parsed.protocol = window.location.protocol === 'https:' ? 'https:' : parsed.protocol;
      // If page is HTTPS, always force HTTPS on media
      if (window.location.protocol === 'https:') {
        parsed.protocol = 'https:';
      }
    }
    return parsed.toString();
  } catch (_) {
    if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
      return url.replace(/^http:\/\//i, 'https://');
    }
    return url;
  }
}

function normalizeProject(item) {
  if (!item || typeof item !== 'object') return item;
  return {
    ...item,
    image: normalizeMediaUrl(item.image),
  };
}

async function apiGet(path) {
  const base = await resolveApiBaseUrl();
  const res = await fetch(`${base}${path}`, {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) {
    // One retry with alternate www if first resolved base suddenly fails
    cachedApiBase = null;
    const retryBase = await resolveApiBaseUrl();
    if (retryBase !== base) {
      const retry = await fetch(`${retryBase}${path}`, {
        headers: { Accept: 'application/json' },
      });
      if (!retry.ok) throw new Error(`API ${retry.status}: ${path}`);
      return retry.json();
    }
    throw new Error(`API ${res.status}: ${path}`);
  }
  return res.json();
}

/** Laravel Resource collections wrap items in `{ data: [...] }`. */
function unwrapList(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

export async function fetchProjectCategories() {
  const json = await apiGet('/api/v1/project-categories');
  return unwrapList(json);
}

export async function fetchProjects({ category, limit } = {}) {
  const params = new URLSearchParams();
  if (category && category !== 'all') params.set('category', category);
  if (limit != null) params.set('limit', String(limit));
  const qs = params.toString();
  const json = await apiGet(`/api/v1/projects${qs ? `?${qs}` : ''}`);
  return unwrapList(json).map(normalizeProject);
}

/** Laravel JsonResource wraps a single item in `{ data: {...} }`. */
function unwrapItem(payload) {
  if (payload && typeof payload === 'object' && payload.data && !Array.isArray(payload.data)) {
    return payload.data;
  }
  return payload;
}

export async function fetchProjectBySlug(slug) {
  if (!slug) throw new Error('Missing project slug');
  const json = await apiGet(`/api/v1/projects/${encodeURIComponent(slug)}`);
  const project = unwrapItem(json);
  if (!project || typeof project !== 'object') return project;
  return {
    ...project,
    image: normalizeMediaUrl(project.image),
    gallery: Array.isArray(project.gallery)
      ? project.gallery.map((img) => ({
          ...img,
          src: normalizeMediaUrl(img.src),
        }))
      : project.gallery,
  };
}
