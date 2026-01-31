import { useEffect, useState } from "react";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("/api/users")
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error ${res.status}`);
                }
                return res.json();
            })
            .then((data) => setUsers(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading users...</p>;
    if (error) return <p style={{ color: "salmon" }}>Error: {error}</p>;

    return (
        <div>
            <h2>Users</h2>

            {users.length === 0 ? (
                <p>No users yet.</p>
            ) : (
                <ul>
                    {users.map((u) => (
                        <li key={u.id}>
                            {u.username ?? u.name ?? "Unnamed user"}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}