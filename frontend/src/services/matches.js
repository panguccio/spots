import { apiFetch } from './api'
const page = "matches";

export function details(id) {
    return apiFetch(`/${page}/${id}`, { method: 'GET' })
}

export function edit(id, points1, points2) {
    return apiFetch(`/${page}/${id}/result`, {
        method: 'PUT',
        body: JSON.stringify({ points1, points2 })
    })
}