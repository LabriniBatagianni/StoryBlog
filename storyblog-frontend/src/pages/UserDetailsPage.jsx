import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import StatusBox from "../components/StatusBox";
import { getUserById, getUserPosts } from "../api/users";

export default function UserDetailsPage() {
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

                const [u, ps] = await Promise.all([
                    getUserById(id),
                    getUserPosts(id),
                ]);

                setUser(u);
                setPosts(Array.isArray(ps) ? ps : []);
            } catch (e) {
                setError(e?.message || "Failed to load user details");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [id]);

    return (
        <div style={{ display: "grid", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h2 style={{ margin: 0 }}>User Details</h2>
                <Link to="/users" className="btn">Back</Link>
            </div>

            <StatusBox loading={loading} error={error}>
                {!user ? null : (
                    <>
                        <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 14 }}>
                            <div><b>Name:</b> {user.name}</div>
                            <div><b>Email:</b> {user.email}</div>
                        </div>

                        <div style={{ border: "1px solid #ddd", borderRadius: 12, overflow: "hidden" }}>
                            <div style={{ padding: 12, fontWeight: 700, background: "#f6f6f6" }}>
                                Posts by this user
                            </div>

                            {posts.length === 0 ? (
                                <div style={{ padding: 12 }}>No posts yet.</div>
                            ) : (
                                <ul style={{ margin: 0, padding: 12, display: "grid", gap: 10 }}>
                                    {posts.map((p) => (
                                        <li key={p.id} style={{ listStyle: "none" }}>
                                            <Link to={`/posts/${p.id}`} style={{ fontWeight: 700, textDecoration: "none" }}>
                                                {p.title}
                                            </Link>
                                            <div style={{ color: "#444" }}>
                                                {(p.content || "").length > 140 ? (p.content || "").slice(0, 140) + "…" : (p.content || "")}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </>
                )}
            </StatusBox>
        </div>
    );
}