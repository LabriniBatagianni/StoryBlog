import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/posts";
import Layout from "../components/Layout";

export default function CreatePostPage() {
    const nav = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const canSave = title.trim().length > 0 && content.trim().length > 0 && !saving;

    async function onSubmit(e) {
        e.preventDefault();
        if (!canSave) return;

        try {
            setSaving(true);
            setError("");
            await createPost({ title: title.trim(), content: content.trim() });
            nav("/posts");
        } catch (e2) {
            setError(e2?.message || "Failed to create post");
        } finally {
            setSaving(false);
        }
    }

    return (
        <Layout>
            <h3>Create Post</h3>

            {error && (
                <div style={{ padding: 12, border: "1px solid #f5c2c2", background: "#ffecec", borderRadius: 10, marginBottom: 10 }}>
                    <b>Error:</b> {error}
                </div>
            )}

            <form onSubmit={onSubmit} style={{ display: "grid", gap: 10 }}>
                <label>
                    Title
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ccc" }}
                    />
                </label>

                <label>
                    Content
                    <textarea
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        rows={8}
                        style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ccc" }}
                    />
                </label>

                <div style={{ display: "flex", gap: 8 }}>
                    <button type="submit" disabled={!canSave}>
                        {saving ? "Saving..." : "Create"}
                    </button>
                    <button type="button" onClick={() => nav("/posts")}>
                        Cancel
                    </button>
                </div>
            </form>
        </Layout>
    );
}