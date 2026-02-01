import { apiFetch } from './api'
const page = "teams";

export function list(searchTerm = '') {
    const query = searchTerm ? `?q=${encodeURIComponent(searchTerm)}` : ''
    return apiFetch(`/${page}/${query}`, { method: 'GET' })
}

export function create(name) {
    return apiFetch(`/${name}`, {
        method: 'POST',
        body: JSON.stringify({ name })
    })
}

export function details(id) {
    return apiFetch(`/${page}/${id}`, { method: 'GET' })
}

export function edit(id, name, addPlayers, remPlayers) {
    return apiFetch(`/${page}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ name, addPlayers, remPlayers })
    })
}

export function cancel(id) {
    return apiFetch(`/${page}/${id}`, { method: 'DELETE' })
}


export function players(id) {
    return apiFetch(`/${page}/${id}/players`, { method: 'GET' })
}

export function listPlayers(searchTerm = '') {
    const query = searchTerm ? `?q=${encodeURIComponent(searchTerm)}` : ''
    return apiFetch(`/players/${query}`, { method: 'GET' })
}

