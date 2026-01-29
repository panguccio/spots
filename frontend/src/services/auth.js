import { apiFetch } from './api'

export function login(username, password) {
  return apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password })
  })
}

export function signup(data) {
  return apiFetch('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(data)
  })
}
