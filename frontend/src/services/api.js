const API_URL = 'http://localhost:3000/api'

import { useAuthStore } from '@/store/auth.js'
import router from '@/router'

async function handleResponse(res) {
  if (!res.ok) {
    let data

    try {
      data = await res.json()
    } catch {
      data = { message: res.statusText }
    }

    if (res.status === 401) {
      const {logout} = useAuthStore()
      logout();
      router.push({ name: "login" })
    }

    const err = new Error(data.message || 'Request failed')
    err.status = res.status
    throw err
  }

  return res.json()
}

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('token')

  return fetch(API_URL + path, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    },
    ...options
  }).then(handleResponse)
}
