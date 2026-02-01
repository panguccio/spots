import { apiFetch } from './api'
const page = "tournaments";

export function list(searchTerm = '') {
    const query = searchTerm ? `?q=${encodeURIComponent(searchTerm)}` : ''
    return apiFetch(`/${page}/${query}`, { method: 'GET' })
}

export function create(name, sport, maxTeams, date) {
    return apiFetch(`/${name}`, {
        method: 'POST',
        body: JSON.stringify({ name, sport, maxTeams, date })
    })
}

export function details(id) {
    return apiFetch(`/${page}/${id}`, { method: 'GET' })
}

export function edit(id, name, sport, maxTeams, date, addTeams, remTeams) {
    return apiFetch(`/${page}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ name, sport, maxTeams, date, addTeams, remTeams })
    })
}

export function cancel(id) {
    return apiFetch(`/${page}/${id}`, { method: 'DELETE' })
}

export function schedule(id) {
    return apiFetch(`/${page}/${id}/matches/generate`, { method: 'POST' })
}

export function matches(id) {
    return apiFetch(`/${page}/${id}/matches`, { method: 'GET' })
}

export function standings(id) {
    return apiFetch(`/${page}/${id}/standings`, { method: 'GET' })
}


