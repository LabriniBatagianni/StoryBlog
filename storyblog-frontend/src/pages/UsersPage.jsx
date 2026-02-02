import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StatusBox from "../components/StatusBox";
import { getUsers, deleteUser } from "../api/users";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function load() {
        try {
            setError("");
            setLoading(true);
            const data = await getUsers();
            setUsers(data);
        } catch (e) {
            setError(e?.message || "Failed to load users");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { load(); }, []);

    async function handleDelete(id) {
        const ok = window.confirm("Delete this user?");
        if (!ok) return;

        try {
            await deleteUser(id);
            setUsers((prev) => prev.filter((u) => u.id !== id));
        } catch (e) {
            alert(e?.message || "Failed to delete user");
        }
    }

    return (
        <>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <h3 style={{ margin: 0 }}>Users</h3>

                <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                    <button onClick={load}>Refresh</button>
                    <Link to="/users/new"><button>Create</button></Link>
                </div>
            </div>

            <StatusBox loading={loading} error={error}>
                {users.length === 0 ? (
                    <div style={{ padding: 12, border: "1px dashed #ccc", borderRadius: 10 }}>
                        No users yet. Create your first user!
                    </div>
                ) : (
                    <div style={{ border: "1px solid #ddd", borderRadius: 12, overflow: "hidden" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead style={{ background: "#f6f6f6" }}>
                            <tr>
                                <th style={{ textAlign: "left", padding: 10 }}>Name</th>
                                <th style={{ textAlign: "left", padding: 10 }}>Email</th>
                                <th style={{ padding: 10, width: 160 }}>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map((u) => (
                                <tr key={u.id} style={{ borderTop: "1px solid #eee" }}>
                                    <td style={{ padding: 10, fontWeight: 600 }}>{u.name}</td>
                                    <td style={{ padding: 10, color: "#333" }}>{u.email}</td>
                                    <td style={{ padding: 10 }}>
                                        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                                            <Link to={`/users/${u.id}/edit`}><button>Edit</button></Link>
                                            <button onClick={() => handleDelete(u.id)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </StatusBox>
        </>
    );
}