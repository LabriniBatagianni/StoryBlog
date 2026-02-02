import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import StatusBox from "../components/StatusBox";
import { getPostById, deletePost } from "../api/posts";

export default function PostDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function load() {
        try {
            setError("");
            setLoading(true);
            const data = await getPostById(id);
            setPost(data);
        } catch (e) {
            setError(e?.message || "Failed to load post");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { load(); }, [id]);

    async function handleDelete() {
        const ok = window.confirm("Delete this post?");
        if (!ok) return;

        try {
            await deletePost(id);
            navigate("/posts");
        } catch (e) {
            alert(e?.message || "Failed to delete");
        }
    }

    return (
        <>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <h3 style={{ margin: 0 }}>Read Post</h3>
                <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                    <Link to={`/posts/${id}/edit`}><button>Edit</button></Link>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            </div>

            <StatusBox loading={loading} error={error}>
                {!post ? null : (
                    <article style={{ background: "#fff", border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
                        <h2 style={{ marginTop: 0 }}>{post.title}</h2>
                        <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.6, color: "#222" }}>
                            {post.content}
                        </div>

                        <div style={{ marginTop: 16 }}>
                            <Link to="/posts">← Back to Posts</Link>
                        </div>
                    </article>
                )}
            </StatusBox>
        </>
    );
}