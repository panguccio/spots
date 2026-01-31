import { apiFetch } from './api'
const name = "teams";

export function list(searchTerm = '') {
    const query = searchTerm ? `?q=${encodeURIComponent(searchTerm)}` : ''
    return apiFetch(`/${name}/${query}`, { method: 'GET' })
}

export function create(name) {
    return apiFetch(`/${name}`, {
        method: 'POST',
        body: JSON.stringify({ name })
    })
}

export function details(id) {
    return apiFetch(`/${name}/${id}`, { method: 'GET' })
}

export function edit(name, addPlayers, remPlayers) {
    return apiFetch(`/${name}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ name, sport, maxTeams, date, addTeams, remTeams })
    })
}

export function cancel(id) {
    return apiFetch(`/${name}/${id}`, { method: 'DELETE' })
}


export function players(id) {
    return apiFetch(`/${name}/${id}/players`, { method: 'GET' })
}


