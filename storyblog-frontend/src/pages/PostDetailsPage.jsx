import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostById } from "../api/posts";
import StatusBox from "../components/StatusBox";

export default function PostDetailsPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
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
        load();
    }, [id]);

    return (
        <div style={{ display: "grid", gap: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ margin: 0 }}>{post?.title || "Read Post"}</h2>
                <Link to="/posts" className="btn">Back</Link>
            </div>

            <StatusBox loading={loading} error={error}>
                {!post ? null : (
                    <>
                        {post?.author ? (
                            <div style={{ color: "#555", marginBottom: 10 }}>
                                By{" "}
                                <Link to={`/users/${post.author.id}`} style={{ fontWeight: 700 }}>
                                    {post.author.name}
                                </Link>{" "}
                                · {post.author.email}
                            </div>
                        ) : (
                            <div style={{ color: "#777", marginBottom: 10 }}>
                                By <i>Unknown author</i>
                            </div>
                        )}

                        <article style={{ border: "1px solid #ddd", borderRadius: 12, padding: 14 }}>
                            <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}>
                                {post.content}
                            </div>
                        </article>
                    </>
                )}
            </StatusBox>
        </div>
    );
}