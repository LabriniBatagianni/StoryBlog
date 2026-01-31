const BASE = '/api'

async function request(path, options) {
    const res = await fetch(`${BASE}${path}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options
    })

    if (!res.ok) {
        const text = await res.text()
        throw new Error(text || `HTTP ${res.status}`)
    }

    // For endpoints that return "204 No Content"
    if (res.status === 204) return null

    return res.json()
}

export const api = {
    getUsers: () => request('/users'),
    getPosts: () => request('/posts'),
    createPost: (payload) =>
        request('/posts', { method: 'POST', body: JSON.stringify(payload) })
}