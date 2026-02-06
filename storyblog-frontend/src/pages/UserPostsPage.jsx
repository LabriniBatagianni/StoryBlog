import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import StatusBox from "../components/StatusBox";
import { getUserById } from "../api/users";
import { getUserPosts } from "../api/users";

export default function UserPostsPage() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function load() {
            try {
                setError("");
                setLoading(true);
                const [u, p] = await Promise.all([getUserById(id), getUserPosts(id)]);
                setUser(u);
                setPosts(p);
            } catch (e) {
                setError(e?.message || "Failed to load user posts");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [id]);

    return (
        <div style={{ display: "grid", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h2 style={{ margin: 0 }}>
                    Posts by {user ? user.name : "User"}
                </h2>

                <Link to="/users" className="btn">Back</Link>
            </div>

            <StatusBox loading={loading} error={error}>
                {posts.length === 0 ? (
                    <div style={{ padding: 12, border: "1px dashed #ccc", borderRadius: 10 }}>
                        No posts for this user yet.
                    </div>
                ) : (
                    <div style={{ border: "1px solid #ddd", borderRadius: 12, overflow: "hidden" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead style={{ background: "#f6f6f6" }}>
                            <tr>
                                <th style={{ textAlign: "left", padding: 10 }}>Title</th>
                                <th style={{ textAlign: "left", padding: 10 }}>Preview</th>
                                <th style={{ padding: 10, width: 220 }}>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {posts.map((p) => (
                                <tr key={p.id} style={{ borderTop: "1px solid #eee" }}>
                                    <td style={{ padding: 10, fontWeight: 700 }}>{p.title}</td>
                                    <td style={{ padding: 10 }}>
                                        {(p.content || "").length > 120 ? (p.content || "").slice(0, 120) + "…" : (p.content || "")}
                                    </td>
                                    <td style={{ padding: 10 }}>
                                        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
                                            <Link to={`/posts/${p.id}`} className="btn">Read</Link>
                                            <Link to={`/posts/${p.id}/edit`} className="btn">Edit</Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </StatusBox>
        </div>
    );
}