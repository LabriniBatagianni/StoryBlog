import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div style={{ background: "white", padding: 18, borderRadius: 12, border: "1px solid #eee" }}>
            <h2 style={{ marginTop: 0 }}>404 — Not Found</h2>
            <p>Η σελίδα δεν υπάρχει.</p>
            <Link to="/">Πίσω στο Home</Link>
        </div>
    );
}