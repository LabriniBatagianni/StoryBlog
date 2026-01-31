import { NavLink, Outlet } from "react-router-dom";

const linkStyle = ({ isActive }) => ({
    padding: "8px 12px",
    borderRadius: 8,
    textDecoration: "none",
    color: "inherit",
    background: isActive ? "rgba(0,0,0,0.08)" : "transparent",
    fontWeight: isActive ? 600 : 400,
});

export default function Layout() {
    return (
        <div style={{ minHeight: "100vh", background: "#fafafa" }}>
            <header style={{ background: "white", borderBottom: "1px solid #eee" }}>
                <div style={{ maxWidth: 980, margin: "0 auto", padding: "14px 16px", display: "flex", gap: 12, alignItems: "center" }}>
                    <div style={{ fontWeight: 800 }}>StoryBlog</div>
                    <nav style={{ display: "flex", gap: 8 }}>
                        <NavLink to="/" style={linkStyle} end>Home</NavLink>
                        <NavLink to="/users" style={linkStyle}>Users</NavLink>
                        <NavLink to="/posts" style={linkStyle}>Posts</NavLink>
                        <NavLink to="/posts/new" style={linkStyle}>Create Post</NavLink>
                    </nav>
                </div>
            </header>

            <main style={{ maxWidth: 980, margin: "0 auto", padding: "18px 16px" }}>
                <Outlet />
            </main>

            <footer style={{ borderTop: "1px solid #eee", background: "white" }}>
                <div style={{ maxWidth: 980, margin: "0 auto", padding: "14px 16px", fontSize: 13, color: "#666" }}>
                    © {new Date().getFullYear()} StoryBlog
                </div>
            </footer>
        </div>
    );
}