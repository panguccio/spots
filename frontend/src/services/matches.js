import { apiFetch } from './api'
const name = "matches";

export function details(id) {
    return apiFetch(`/${name}/${id}`, { method: 'GET' })
}

export function edit(points1, points2) {
    return apiFetch(`/${name}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ points1, points2 })
    })
}