import { apiFetch } from './api'

export function list(searchTerm = '') {
  const query = searchTerm ? `?q=${encodeURIComponent(searchTerm)}` : ''
  return apiFetch(`/fields${query}`, { method: 'GET' })
}

export function details(id) {
  return apiFetch(`/fields/${id}`, { method: 'GET' })
}

export function slots(id) {
  return apiFetch(`/fields/${id}/slots`, { method: 'GET' })
}

export function book(id, date, startHour, endHour) {
  return apiFetch(`/fields/${id}/slots`, {
    method: 'POST',
    body: JSON.stringify({ date, startHour, endHour })
  })
}

export function unbook(id) {
  return apiFetch(`/fields/${id}/slots`, {
    method: 'DELETE'
  })
}
