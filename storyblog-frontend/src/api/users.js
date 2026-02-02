const API_BASE = "/api/users";

export async function getUsers() {
    const res = await fetch(API_BASE);
    if (!res.ok) throw new Error(`Failed to fetch users: ${res.status}`);
    return res.json();
}

export async function getUserById(id) {
    const res = await fetch(`${API_BASE}/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch user ${id}: ${res.status}`);
    return res.json();
}

export async function createUser(user) {
    const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    });
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Failed to create user: ${res.status} ${text}`);
    }
    return res.json();
}

export async function updateUser(id, user) {
    const res = await fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    });
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Failed to update user ${id}: ${res.status} ${text}`);
    }
    return res.json();
}

export async function deleteUser(id) {
    const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Failed to delete user ${id}: ${res.status} ${text}`);
    }
    return true;
}