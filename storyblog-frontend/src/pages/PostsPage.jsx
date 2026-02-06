import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts, deletePost } from "../api/posts.js";
import StatusBox from "../components/StatusBox";

export default function PostsPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function load() {
        try {
            setError("");
            setLoading(true);
            const data = await getPosts();
            console.log("POSTS DATA:", data, "isArray:", Array.isArray(data));
            console.log("getPosts() returned:", data);
            setPosts(data);
        } catch (e) {
            console.error("load() failed:", e);
            setError(e?.message || "Failed to load posts");
        } finally {
            setLoading(false);
        }
    }

    console.log("posts state:", posts);

    useEffect(() => {
        load();
    }, []);

    async function handleDelete(id) {
        const ok = window.confirm("Delete this post?");
        if (!ok) return;

        try {
            await deletePost(id);
            setPosts(prev => prev.filter(p => p.id !== id));
        } catch (e) {
            alert(e?.message || "Failed to delete");
        }
    }

    return (
        <>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <h3 style={{ margin: 0 }}>Posts</h3>
                <div className="btn-row" style={{ marginLeft: "auto" }}>
                    <button type="button" className="btn" onClick={load}>
                        Refresh
                    </button>
                    <Link to="/posts/new" className="btn">
                        Create
                    </Link>
                </div>
            </div>

            <StatusBox loading={loading} error={error}>
                {posts.length === 0 ? (
                    <div style={{ padding: 12, border: "1px dashed #ccc", borderRadius: 10 }}>
                        No posts yet. Create your first post!
                    </div>
                ) : (
                    <div style={{ border: "1px solid #ddd", borderRadius: 12, overflow: "hidden" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead style={{ background: "#f6f6f6" }}>
                            <tr>
                                <th style={{ textAlign: "left", padding: 10 }}>Title</th>
                                <th style={{ textAlign: "left", padding: 10 }}>Author</th>
                                <th style={{ textAlign: "left", padding: 10 }}>Content</th>
                                <th style={{ padding: 10, width: 220 }}>Actions</th>
                            </tr>
                            </thead>

                            <tbody>
                            {posts.map((p) => (
                                <tr key={p.id} style={{ borderTop: "1px solid #eee" }}>
                                    <td style={{ padding: 10, fontWeight: 600 }}>{p.title}</td>

                                    <td style={{ padding: 10 }}>
                                        {p.author ? (
                                            <Link to={`/users/${p.author.id}`} style={{ fontWeight: 700, textDecoration: "none" }}>
                                                {p.author.name}
                                            </Link>
                                        ) : (
                                            <span style={{ color: "#777" }}>—</span>
                                        )}
                                    </td>

                                    <td style={{ padding: 10, color: "#333" }}>
                                        {p.content?.length > 120 ? p.content.slice(0, 120) + "…" : p.content}
                                    </td>

                                    <td style={{ padding: 10 }}>
                                        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                                            <Link to={`/posts/${p.id}`} className="btn">Read</Link>
                                            <Link to={`/posts/${p.id}/edit`} className="btn">Edit</Link>
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() => handleDelete(p.id)}
                                            >
                                                Delete
                                            </button>

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