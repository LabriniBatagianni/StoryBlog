import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <div
            style={{
                background: "white",
                padding: 24,
                borderRadius: 12,
                border: "1px solid #eee",
            }}
        >
            <h1 style={{ marginTop: 0 }}>📚 Storyverse</h1>

            <p style={{ fontSize: 16, lineHeight: 1.6 }}>
                Καλωσήρθατε στο <strong>Storyverse</strong>!
                Πρόκειται για ένα full-stack demo project με:
            </p>

            <ul>
                <li>⚙️ Backend: Spring Boot + JPA + MySQL</li>
                <li>🎨 Frontend: React + Vite</li>
                <li>🔗 REST API για Users & Posts</li>
            </ul>

            <p>
                Από εδώ μπορείτε να:
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link to="/users" style={buttonStyle}>
                    👤 Προβολή Χρηστών
                </Link>

                <Link to="/posts" style={buttonStyle}>
                    📝 Προβολή Posts
                </Link>

                <Link to="/posts/new" style={buttonStyle}>
                    ➕ Δημιουργία Post
                </Link>
            </div>

            <hr style={{ margin: "24px 0" }} />

            <p style={{ fontSize: 14, color: "#666" }}>
                Το project αυτό υλοποιήθηκε στο πλαίσιο εκπαιδευτικής εργασίας και
                δείχνει βασικές αρχές full-stack ανάπτυξης.
            </p>
        </div>
    );
}

const buttonStyle = {
    padding: "10px 14px",
    borderRadius: 8,
    background: "#f5f5f5",
    textDecoration: "none",
    color: "black",
    border: "1px solid #ddd",
    fontWeight: 500,
};