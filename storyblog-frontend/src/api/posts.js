const API_BASE = "/api/posts";

export async function getPosts() {
    const res = await fetch(API_BASE);
    if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);
    return res.json();
}

export async function getPostById(id) {
    const res = await fetch(`${API_BASE}/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch post ${id}: ${res.status}`);
    return res.json();
}

export async function createPost(post) {
    const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
    });
    if (!res.ok) throw new Error(`Failed to create post: ${res.status}`);
    return res.json();
}

export async function updatePost(id, post) {
    const res = await fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
    });
    if (!res.ok) throw new Error(`Failed to update post ${id}: ${res.status}`);
    return res.json();
}

export async function deletePost(id) {
    const res = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error(`Failed to delete post ${id}: ${res.status}`);
    return true;
}