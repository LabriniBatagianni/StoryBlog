import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts, deletePost } from "../api/posts";
import StatusBox from "../components/StatusBox";
import Layout from "../components/Layout";

export default function PostsPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function load() {
        try {
            setError("");
            setLoading(true);
            const data = await getPosts();
            setPosts(data);
        } catch (e) {
            setError(e?.message || "Failed to load posts");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    async function handleDelete(id) {
        const ok = window.confirm("Delete this post?");
        if (!ok) return;

        try {
            await deletePost(id);
            // αφαιρεί το post από το state χωρίς refetch
            setPosts(prev => prev.filter(p => p.id !== id));
        } catch (e) {
            alert(e?.message || "Failed to delete");
        }
    }

    return (
        <Layout>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <h3 style={{ margin: 0 }}>Posts</h3>
                <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                    <button onClick={load}>Refresh</button>
                    <Link to="/posts/new">
                        <button>Create</button>
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
                                <th style={{ textAlign: "left", padding: 10 }}>Content</th>
                                <th style={{ padding: 10, width: 160 }}>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {posts.map(p => (
                                <tr key={p.id} style={{ borderTop: "1px solid #eee" }}>
                                    <td style={{ padding: 10, fontWeight: 600 }}>{p.title}</td>
                                    <td style={{ padding: 10, color: "#333" }}>
                                        {p.content?.length > 120 ? p.content.slice(0, 120) + "…" : p.content}
                                    </td>
                                    <td style={{ padding: 10 }}>
                                        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                                            <Link to={`/posts/${p.id}/edit`}>
                                                <button>Edit</button>
                                            </Link>
                                            <button onClick={() => handleDelete(p.id)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </StatusBox>
        </Layout>
    );
}