// ─────────────────────────────────────────────
//  All API calls go through this file.
//  Change BASE_URL when you deploy to production.
// ─────────────────────────────────────────────

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Helper — attach auth token if stored
function headers(extra = {}) {
  const token = localStorage.getItem('pyq_token')
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extra,
  }
}

async function request(path, opts = {}) {
  const res  = await fetch(`${BASE_URL}${path}`, { headers: headers(), ...opts })
  const data = await res.json()
  if (!data.success) throw new Error(data.message || 'Request failed')
  return data
}

// ── Auth ──────────────────────────────────────
export const auth = {
  register: (body)    => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login:    (body)    => request('/auth/login',    { method: 'POST', body: JSON.stringify(body) }),
  me:       ()        => request('/auth/me'),
  save:     (paperId) => request(`/auth/save/${paperId}`, { method: 'PUT' }),
}

// ── Exams ─────────────────────────────────────
export const exams = {
  all:   ()   => request('/exams'),
  byId:  (id) => request(`/exams/${id}`),
  years: (examId, subId) => request(`/exams/${examId}/${subId}/years`),
}

// ── Papers ────────────────────────────────────
export const papers = {
  list:     (params) => request(`/papers?${new URLSearchParams(params)}`),
  byId:     (id)     => request(`/papers/${id}`),
  download: (id)     => request(`/papers/${id}/download`),
  search:   (q)      => request(`/papers/search?q=${encodeURIComponent(q)}`),
}

// ── AI ────────────────────────────────────────
export const ai = {
  analyse:       (paperId) => request(`/ai/analyse/${paperId}`,  { method: 'POST' }),
  analyseCustom: (body)    => request('/ai/analyse-custom', { method: 'POST', body: JSON.stringify(body) }),
}
