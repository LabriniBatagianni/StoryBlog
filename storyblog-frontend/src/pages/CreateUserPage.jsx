import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../api/users";

export default function CreateUserPage() {
    const nav = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    async function onSubmit(e) {
        e.preventDefault();
        setError("");
        setSaving(true);

        try {
            await createUser({ name, email });
            nav("/users");
        } catch (err) {
            setError(err?.message || "Failed to create user");
        } finally {
            setSaving(false);
        }
    }

    return (
        <>
            <h3>Create User</h3>

            {error && (
                <div style={{ padding: 12, border: "1px solid #f5c2c2", background: "#ffecec", borderRadius: 10 }}>
                    <b>Error:</b> {error}
                </div>
            )}

            <form onSubmit={onSubmit} style={{ display: "grid", gap: 10, maxWidth: 520 }}>
                <label>
                    Name
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Labrini"
                        required
                    />
                </label>

                <label>
                    Email
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. labrini@email.com"
                        required
                    />
                </label>

                <div style={{ display: "flex", gap: 8 }}>
                    <button type="submit" disabled={saving}>{saving ? "Saving..." : "Create"}</button>
                    <button type="button" onClick={() => nav("/users")} disabled={saving}>Cancel</button>
                </div>
            </form>
        </>
    );
}