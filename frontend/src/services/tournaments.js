import { apiFetch } from './api'
const name = "tournaments";

export function list(searchTerm = '') {
    const query = searchTerm ? `?q=${encodeURIComponent(searchTerm)}` : ''
    return apiFetch(`/${name}/${query}`, { method: 'GET' })
}

export function create(name, sport, maxTeams, date) {
    return apiFetch(`/${name}`, {
        method: 'POST',
        body: JSON.stringify({ name, sport, maxTeams, date })
    })
}

export function details(id) {
    return apiFetch(`/${name}/${id}`, { method: 'GET' })
}

export function edit(name, sport, maxTeams, date, addTeams, remTeams) {
    return apiFetch(`/${name}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ name, sport, maxTeams, date, addTeams, remTeams })
    })
}

export function cancel(id) {
    return apiFetch(`/${name}/${id}`, { method: 'DELETE' })
}

export function schedule(id) {
    return apiFetch(`/${name}/${id}/matches/generate`, { method: 'POST' })
}

export function matches(id) {
    return apiFetch(`/${name}/${id}/matches`, { method: 'GET' })
}

export function standings(id) {
    return apiFetch(`/${name}/${id}/standings`, { method: 'GET' })
}


