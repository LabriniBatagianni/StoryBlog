import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById, updatePost } from "../api/posts";

export default function EditPostPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        setError("");
        getPostById(id)
            .then((p) => {
                setTitle(p.title ?? "");
                setContent(p.content ?? "");
            })
            .catch((e) => setError(e.message || "Failed to load post"))
            .finally(() => setLoading(false));
    }, [id]);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        try {
            await updatePost(id, { title, content });
            navigate("/posts");
        } catch (e) {
            setError(e.message || "Failed to update post");
        }
    }

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1>Edit Post</h1>

            {error && <p style={{ color: "crimson" }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />

                <button type="submit">Save</button>
                <button type="button" onClick={() => navigate("/posts")}>
                    Cancel
                </button>
            </form>
        </div>
    );
}