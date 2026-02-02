import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <div className="card">
            <h1>Welcome to Storyverse!</h1>
            <p>What would you like to do?</p>

            <div className="grid">
                <Link to="/posts" className="btn">
                    Browse Posts
                </Link>

                <Link to="/posts/new" className="btn btn-primary">
                    Create Post
                </Link>

                <Link to="/users" className="btn">
                    View Users
                </Link>
            </div>
        </div>
    );
}