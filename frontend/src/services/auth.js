import { apiFetch } from './api'

export function login(username, password) {
  return apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password })
  })
}

export function signup(name, surname, username, password) {
  return apiFetch('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ name, surname, username, password })
  })
}
