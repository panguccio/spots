import { apiFetch } from './api'
const name = "users";

export function list(searchTerm = '') {
    const query = searchTerm ? `?q=${encodeURIComponent(searchTerm)}` : ''
    return apiFetch(`/${name}/${query}`, { method: 'GET' })
}

export function profile() {
    return apiFetch(`/${name}/whoami`, { method: 'GET' })
}

export function details(id) {
    return apiFetch(`/${name}/${id}`, { method: 'GET' })
}

export function bookings() {
    return apiFetch(`/${name}/bookings`, { method: 'GET' })
}