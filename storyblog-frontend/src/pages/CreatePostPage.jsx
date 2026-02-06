import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/posts";
import { getUsers } from "../api/users";
import StatusBox from "../components/StatusBox";

export default function CreatePostPage() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [authorId, setAuthorId] = useState(""); // string για select

    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadUsers() {
            try {
                setLoadingUsers(true);
                const data = await getUsers();
                setUsers(Array.isArray(data) ? data : []);
            } catch (e) {
                setError(e?.message || "Failed to load users");
            } finally {
                setLoadingUsers(false);
            }
        }
        loadUsers();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!title.trim() || !content.trim()) {
            setError("Συμπλήρωσε τίτλο και περιεχόμενο.");
            return;
        }

        try {
            setSubmitting(true);

            const payload = {
                title: title.trim(),
                content: content.trim(),
                authorId: authorId ? Number(authorId) : null,
            };

            await createPost(payload);
            navigate("/posts");
        } catch (err) {
            setError(err?.message || "Κάτι πήγε στραβά στο Create Post.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="page">
            <h1>Create Post</h1>

            <form onSubmit={onSubmit} className="card" style={{ display: "grid", gap: 12 }}>
                <label>
                    Title
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Η Ιστορία Μου"
                    />
                </label>

                <label>
                    Author
                    <StatusBox loading={loadingUsers} error={""}>
                        <select value={authorId} onChange={(e) => setAuthorId(e.target.value)}>
                            <option value="">(No author)</option>
                            {users.map((u) => (
                                <option key={u.id} value={u.id}>
                                    {u.name} ({u.email})
                                </option>
                            ))}
                        </select>
                    </StatusBox>
                </label>

                <label>
                    Content
                    <textarea
                        rows={10}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Γράψε την ιστορία σου εδώ..."
                    />
                </label>

                {error && <p className="error">{error}</p>}

                <button type="submit" className="btn" disabled={submitting}>
                    {submitting ? "Saving..." : "Save Post"}
                </button>
            </form>
        </div>
    );
}