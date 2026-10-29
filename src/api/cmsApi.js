import {
  getApiBaseUrl,
  normalizeMediaUrl,
  resolveApiBaseUrl,
} from './projectsApi';

/** Resolve CMS media: frontend static `/assets/...` or uploaded storage URLs. */
export function resolveCmsMedia(url) {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('/assets/') || trimmed.startsWith('assets/')) {
    const path = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
    return `${process.env.PUBLIC_URL || ''}${path}`;
  }
  return normalizeMediaUrl(trimmed);
}

/** Keep old `/studio` admin links working after rename to Our Firm. */
export function normalizeAppPath(path) {
  if (!path || typeof path !== 'string') return '';
  const trimmed = path.trim();
  if (!trimmed) return '';
  if (
    trimmed === '/studio' ||
    trimmed.startsWith('/studio/') ||
    trimmed.startsWith('/studio#') ||
    trimmed.startsWith('/studio?')
  ) {
    return trimmed.replace(/^\/studio/, '/our-firm');
  }
  return trimmed;
}

const MEDIA_KEYS = new Set([
  'image',
  'video',
  'src',
  'poster',
  'sideImage',
  'side_image',
]);

function walkMedia(value) {
  if (Array.isArray(value)) return value.map(walkMedia);
  if (value && typeof value === 'object') {
    const out = {};
    Object.entries(value).forEach(([key, child]) => {
      if (typeof child === 'string' && MEDIA_KEYS.has(key)) {
        out[key] = resolveCmsMedia(child);
      } else if (
        typeof child === 'string' &&
        (key.endsWith('_link') || key === 'button_link' || key === 'primary_link' || key === 'secondary_link' || key === 'bottom_link_url')
      ) {
        out[key] = normalizeAppPath(child);
      } else {
        out[key] = walkMedia(child);
      }
    });
    return out;
  }
  return value;
}

async function apiGet(path) {
  const base = await resolveApiBaseUrl();
  const res = await fetch(`${base}${path}`, {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) {
    throw new Error(`API ${res.status}: ${path}`);
  }
  return res.json();
}

function unwrapData(payload) {
  if (payload && typeof payload === 'object' && 'data' in payload) {
    return payload.data;
  }
  return payload;
}

export async function fetchHomeContent() {
  const json = await apiGet('/api/v1/home');
  return walkMedia(unwrapData(json) || {});
}

export async function fetchExpertiseContent() {
  const json = await apiGet('/api/v1/expertise');
  return walkMedia(unwrapData(json) || {});
}

export async function fetchStudioContent() {
  const json = await apiGet('/api/v1/studio');
  return walkMedia(unwrapData(json) || {});
}

export async function fetchContactContent() {
  const json = await apiGet('/api/v1/contact');
  return walkMedia(unwrapData(json) || {});
}

let siteSettingsCache = null;
let siteSettingsPromise = null;

export async function fetchSiteSettings({ force = false } = {}) {
  if (!force && siteSettingsCache) return siteSettingsCache;
  if (!force && siteSettingsPromise) return siteSettingsPromise;

  siteSettingsPromise = (async () => {
    const json = await apiGet('/api/v1/site-settings');
    const data = walkMedia(unwrapData(json) || {});
    siteSettingsCache = data;
    return data;
  })();

  try {
    return await siteSettingsPromise;
  } catch (err) {
    siteSettingsPromise = null;
    throw err;
  } finally {
    siteSettingsPromise = null;
  }
}

function unwrapList(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

function normalizeBlog(item, { withBody = false } = {}) {
  if (!item || typeof item !== 'object') return item;
  const image = resolveCmsMedia(item.image);
  const base = {
    id: item.slug,
    slug: item.slug,
    title: item.title || '',
    category: item.category || '',
    excerpt: item.excerpt || '',
    date: item.date || '',
    published_at: item.published_at || '',
    readTime: item.read_time || item.readTime || '',
    image,
  };
  if (withBody) {
    base.body = item.body || '';
  }
  return base;
}

export async function fetchBlogs({ category, limit } = {}) {
  const params = new URLSearchParams();
  if (category) params.set('category', category);
  if (limit != null) params.set('limit', String(limit));
  const qs = params.toString();
  const json = await apiGet(`/api/v1/blogs${qs ? `?${qs}` : ''}`);
  return unwrapList(json).map((item) => normalizeBlog(item));
}

export async function fetchBlogBySlug(slug) {
  if (!slug) throw new Error('Missing blog slug');
  const json = await apiGet(`/api/v1/blogs/${encodeURIComponent(slug)}`);
  const data = unwrapData(json);
  const related = Array.isArray(json?.related)
    ? json.related.map((item) => normalizeBlog(item))
    : [];
  return {
    article: normalizeBlog(data, { withBody: true }),
    related,
  };
}

export { getApiBaseUrl };
