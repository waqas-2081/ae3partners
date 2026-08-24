const API_BASE = (
  process.env.REACT_APP_API_URL || 'https://ae3partnersadmin.testdemolink.com'
).replace(/\/$/, '');

async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) {
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
  return unwrapList(json);
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
  return unwrapItem(json);
}

export function getApiBaseUrl() {
  return API_BASE;
}
