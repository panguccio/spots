import { apiFetch } from './api';
const name = "fields";

export function list(searchTerm = '') {
  const query = searchTerm ? `?q=${encodeURIComponent(searchTerm)}` : ''
  return apiFetch(`/${name}${query}`, { method: 'GET' })
}

export function details(id) {
  return apiFetch(`/${name}/${id}`, { method: 'GET' })
}

export function slots(id, date) {
  const query = date ? `?q=${encodeURIComponent(date)}` : ''
  return apiFetch(`/${name}/${id}/slots${query}`, { method: 'GET' })
}

export function book(id, date, startHour, endHour) {
  return apiFetch(`/${name}/${id}/slots`, {
    method: 'POST',
    body: JSON.stringify({ date, startHour, endHour })
  })
}

export function unbook(id) {
  return apiFetch(`/${name}/${id}/slots`, {
    method: 'DELETE'
  })
}
