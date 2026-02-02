import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/posts";

export default function CreatePostPage() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!title.trim() || !content.trim()) {
            setError("Συμπλήρωσε τίτλο και περιεχόμενο.");
            return;
        }

        try {
            setSubmitting(true);
            await createPost({ title: title.trim(), content: content.trim() });
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

            <form onSubmit={onSubmit} className="card">
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
                    Content
                    <textarea
                        rows={6}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Γράψε την ιστορία σου εδώ..."
                    />
                </label>

                {error && <p className="error">{error}</p>}

                <button type="submit" disabled={submitting}>
                    {submitting ? "Saving..." : "Save Post"}
                </button>
            </form>
        </div>
    );
}