const BASE = "/api/posts";

async function handle(res) {
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`${res.status} ${res.statusText} ${text}`.trim());
    }
    // 204 No Content (π.χ. delete)
    if (res.status === 204) return null;
    return res.json();
}

export async function getPosts() {
    const res = await fetch(BASE);
    return handle(res);
}

export async function getPostById(id) {
    const res = await fetch(`${BASE}/${id}`);
    return handle(res);
}

export async function createPost(payload) {
    const res = await fetch(BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    return handle(res);
}

export async function updatePost(id, payload) {
    const res = await fetch(`${BASE}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    return handle(res);
}

export async function deletePost(id) {
    const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
    return handle(res);
}