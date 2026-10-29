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
    const port = url.port || '';
    const isLocal =
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host.endsWith('.local');
    return {
      host,
      prefersWww: isLocal ? false : prefersWww,
      port,
      isLocal,
      // Prefer the env protocol for local backends (e.g. http://localhost:8000).
      preferredProtocol: isLocal ? url.protocol : null,
    };
  } catch (_) {
    return {
      host: DEFAULT_API_HOST,
      prefersWww: false,
      port: '',
      isLocal: false,
      preferredProtocol: null,
    };
  }
}

function pageProtocol() {
  if (typeof window === 'undefined') return 'https:';
  return window.location.protocol === 'https:' ? 'https:' : 'http:';
}

function buildApiOrigin(host, withWww, protocol, port = '') {
  const hostname = withWww ? `www.${host}` : host;
  const portPart = port ? `:${port}` : '';
  return `${protocol}//${hostname}${portPart}`;
}

/** Candidate API origins: current page protocol × www/non-www (port preserved). */
export function getApiOriginCandidates() {
  const { host, prefersWww, port, isLocal, preferredProtocol } = parseConfiguredHost(
    process.env.REACT_APP_API_URL
  );
  const protocol = preferredProtocol || pageProtocol();
  const ordered = [
    buildApiOrigin(host, prefersWww, protocol, port),
  ];
  if (!isLocal) {
    ordered.push(buildApiOrigin(host, !prefersWww, protocol, port));
  }
  // On HTTP pages, HTTPS API is still fine (upgrade). Never call HTTP API from HTTPS pages.
  // Skip protocol flipping for local backends that usually only speak HTTP.
  if (!isLocal && protocol === 'http:') {
    ordered.push(buildApiOrigin(host, prefersWww, 'https:', port));
    ordered.push(buildApiOrigin(host, !prefersWww, 'https:', port));
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
        // Probe either projects or CMS home — both confirm a live Laravel API.
        const probePaths = ['/api/v1/project-categories', '/api/v1/home'];
        let ok = false;
        for (const probe of probePaths) {
          const res = await fetch(`${base}${probe}`, {
            headers: { Accept: 'application/json' },
            signal: controller ? controller.signal : undefined,
          });
          if (res.ok) {
            ok = true;
            break;
          }
        }
        if (timer) window.clearTimeout(timer);
        if (ok) {
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
 * Keeps local /storage/ URLs as-is so synced files load from Laravel.
 * Use storageFallbackUrl() / mediaSrcChain() when a remote backup host is configured.
 * Set REACT_APP_STORAGE_FALLBACK_URL=https://ae3partnersadmin.testdemolink.com
 */
export function normalizeMediaUrl(url) {
  if (!url || typeof url !== 'string') return url;
  try {
    const absolute = /^https?:\/\//i.test(url)
      ? url
      : getApiBaseUrl() + (url.startsWith('/') ? '' : '/') + url;
    const parsed = new URL(absolute);
    if (typeof window !== 'undefined') {
      parsed.protocol = window.location.protocol === 'https:' ? 'https:' : parsed.protocol;
      if (window.location.protocol === 'https:') {
        parsed.protocol = 'https:';
      }
    }
    return parsed.toString();
  } catch (_) {
    if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
      return url.replace(/^http:\/\//i, 'https:');
    }
    return url;
  }
}

/** Remote mirror of a local /storage/... URL (or null if not applicable). */
export function storageFallbackUrl(url) {
  if (!url || typeof url !== 'string') return null;
  const fallbackRaw = String(process.env.REACT_APP_STORAGE_FALLBACK_URL || '').trim();
  if (!fallbackRaw) return null;
  try {
    const absolute = /^https?:\/\//i.test(url)
      ? url
      : getApiBaseUrl() + (url.startsWith('/') ? '' : '/') + url;
    const parsed = new URL(absolute);
    const isLocalHost =
      parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1';
    if (!isLocalHost || !parsed.pathname.startsWith('/storage/')) return null;
    const fallback = new URL(
      /^https?:\/\//i.test(fallbackRaw) ? fallbackRaw : 'https://' + fallbackRaw
    );
    parsed.protocol = fallback.protocol;
    parsed.host = fallback.host;
    return parsed.toString();
  } catch (_) {
    return null;
  }
}

/** Deduped src list: primaries + remote storage mirrors + extras. */
export function mediaSrcChain(...urls) {
  const list = [];
  urls.flat().forEach((u) => {
    if (typeof u !== 'string' || !u) return;
    if (!list.includes(u)) list.push(u);
    const remote = storageFallbackUrl(u);
    if (remote && !list.includes(remote)) list.push(remote);
  });
  return list;
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

function extractYouTubeId(url) {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./i, '');
    if (host === 'youtu.be') {
      return parsed.pathname.split('/').filter(Boolean)[0] || null;
    }
    if (
      host === 'youtube.com' ||
      host === 'm.youtube.com' ||
      host === 'music.youtube.com' ||
      host === 'youtube-nocookie.com'
    ) {
      const fromQuery = parsed.searchParams.get('v');
      if (fromQuery) return fromQuery;
      const parts = parsed.pathname.split('/').filter(Boolean);
      const marker = parts.findIndex((part) => part === 'embed' || part === 'shorts' || part === 'live');
      if (marker >= 0 && parts[marker + 1]) return parts[marker + 1];
    }
  } catch (_) {
    return null;
  }
  return null;
}

function extractVimeoId(url) {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./i, '');
    if (host !== 'vimeo.com' && host !== 'player.vimeo.com') return null;
    const parts = parsed.pathname.split('/').filter(Boolean);
    return [...parts].reverse().find((part) => /^\d+$/.test(part)) || null;
  } catch (_) {
    return null;
  }
}

/**
 * Uploaded file wins over an external link.
 * `{ kind: 'file', src }` for a direct video, `{ kind: 'embed', src, poster }` for YouTube/Vimeo.
 */
export function resolvePlayableMedia(fileUrl, externalUrl, options = {}) {
  const { autoplay = true, muted = true, loop = true } = options;
  const file = fileUrl ? normalizeMediaUrl(fileUrl) : '';
  const external = externalUrl ? String(externalUrl).trim() : '';
  if (!file && !external) return null;

  if (file) {
    return { kind: 'file', src: file, poster: '' };
  }

  const youtubeId = extractYouTubeId(external);
  if (youtubeId) {
    const params = new URLSearchParams({
      rel: '0',
      modestbranding: '1',
      playsinline: '1',
    });
    if (autoplay) params.set('autoplay', '1');
    if (muted) params.set('mute', '1');
    if (loop) {
      params.set('loop', '1');
      params.set('playlist', youtubeId);
    }
    return {
      kind: 'embed',
      src: `https://www.youtube.com/embed/${youtubeId}?${params.toString()}`,
      poster: `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`,
    };
  }

  const vimeoId = extractVimeoId(external);
  if (vimeoId) {
    const params = new URLSearchParams();
    if (autoplay) params.set('autoplay', '1');
    if (muted) params.set('muted', '1');
    if (loop) params.set('loop', '1');
    const qs = params.toString();
    return {
      kind: 'embed',
      src: `https://player.vimeo.com/video/${vimeoId}${qs ? `?${qs}` : ''}`,
      poster: '',
    };
  }

  return { kind: 'file', src: normalizeMediaUrl(external) || external, poster: '' };
}

export async function fetchProjectCategories() {
  const json = await apiGet('/api/v1/project-categories');
  return unwrapList(json).map((cat) => ({
    ...cat,
    video: cat?.video ? normalizeMediaUrl(cat.video) : cat?.video,
  }));
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
          video: img?.video ? normalizeMediaUrl(img.video) : img?.video,
        }))
      : project.gallery,
  };
}
