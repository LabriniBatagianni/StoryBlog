import { useEffect, useState } from "react";
import { createPost, getPosts } from "../api/posts";

export default function PostsPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [submitting, setSubmitting] = useState(false);

    async function load() {
        try {
            setErr("");
            setLoading(true);
            const data = await getPosts();
            setPosts(data);
        } catch (e) {
            setErr(e.message || "Failed to load posts");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    async function onSubmit(e) {
        e.preventDefault();
        try {
            setSubmitting(true);
            setErr("");

            const newPost = await createPost({ title, content });

            setTitle("");
            setContent("");

            setPosts((prev) => [newPost, ...prev]);
        } catch (e) {
            setErr(e.message || "Failed to create post");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div style={{ maxWidth: 720 }}>
            <h1>Posts</h1>

            <form onSubmit={onSubmit} style={{ margin: "16px 0" }}>
                <div style={{ marginBottom: 8 }}>
                    <label>Title</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Post title"
                        style={{ width: "100%", padding: 8 }}
                        required
                    />
                </div>

                <div style={{ marginBottom: 8 }}>
                    <label>Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write something..."
                        style={{ width: "100%", padding: 8, minHeight: 120 }}
                        required
                    />
                </div>

                <button type="submit" disabled={submitting}>
                    {submitting ? "Saving..." : "Create Post"}
                </button>
            </form>

            {err && <p style={{ color: "tomato" }}>Error: {err}</p>}

            {loading ? (
                <p>Loading...</p>
            ) : posts.length === 0 ? (
                <p>No posts yet.</p>
            ) : (
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {posts.map((p) => (
                        <li
                            key={p.id}
                            style={{
                                border: "1px solid #333",
                                borderRadius: 10,
                                padding: 12,
                                marginBottom: 12,
                            }}
                        >
                            <h3 style={{ margin: "0 0 6px" }}>{p.title}</h3>
                            <p style={{ margin: 0, opacity: 0.9, whiteSpace: "pre-wrap" }}>
                                {p.content}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}