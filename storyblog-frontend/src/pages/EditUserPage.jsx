import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StatusBox from "../components/StatusBox";
import { getUserById, updateUser } from "../api/users";

export default function EditUserPage() {
    const { id } = useParams();
    const nav = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function load() {
            try {
                setError("");
                setLoading(true);
                const u = await getUserById(id);
                setName(u.name || "");
                setEmail(u.email || "");
            } catch (e) {
                setError(e?.message || "Failed to load user");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [id]);

    async function onSubmit(e) {
        e.preventDefault();
        setSaving(true);
        setError("");

        try {
            await updateUser(id, { name, email });
            nav("/users");
        } catch (e) {
            setError(e?.message || "Failed to update user");
        } finally {
            setSaving(false);
        }
    }

    return (
        <>
            <h3>Edit User</h3>

            <StatusBox loading={loading} error={error}>
                <form onSubmit={onSubmit} style={{ display: "grid", gap: 10, maxWidth: 520 }}>
                    <label>
                        Name
                        <input value={name} onChange={(e) => setName(e.target.value)} required />
                    </label>

                    <label>
                        Email
                        <input value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </label>

                    <div style={{ display: "flex", gap: 8 }}>
                        <button type="submit" disabled={saving}>
                            {saving ? "Saving..." : "Save"}
                        </button>
                        <button type="button" onClick={() => nav("/users")} disabled={saving}>
                            Cancel
                        </button>
                    </div>
                </form>
            </StatusBox>
        </>
    );
}