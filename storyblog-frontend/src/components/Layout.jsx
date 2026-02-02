import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="page">
            <header className="header">
                <div className="header-inner">
                    <div className="brand">Storyverse</div>

                    <nav className="nav">
                        <NavLink to="/" end>Home</NavLink>
                        <NavLink to="/users">Users</NavLink>
                        <NavLink to="/users/new">Create User</NavLink>
                        <NavLink to="/posts">Posts</NavLink>
                        <NavLink to="/posts/new">Create Post</NavLink>
                    </nav>
                </div>
            </header>

            <main className="container">
                <Outlet />
            </main>

            <footer className="footer">
                © {new Date().getFullYear()} Storyverse
            </footer>
        </div>
    );
}