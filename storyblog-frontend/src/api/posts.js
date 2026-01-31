export async function getPosts() {
    const res = await fetch("/api/posts");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}

export async function createPost(payload) {
    const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        //if backend sends valdation errors message
        const text = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status} ${text}`);
    }

    return res.json();
}