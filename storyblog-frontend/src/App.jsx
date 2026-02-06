import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

import HomePage from "./pages/HomePage";
import UsersPage from "./pages/UsersPage";
import CreateUserPage from "./pages/CreateUserPage";
import UserDetailsPage from "./pages/UserDetailsPage";
import EditUserPage from "./pages/EditUserPage";
import UserPostsPage from "./pages/UserPostsPage";
import PostsPage from "./pages/PostsPage";
import CreatePostPage from "./pages/CreatePostPage";
import PostDetailsPage from "./pages/PostDetailsPage";
import EditPostPage from "./pages/EditPostPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />

                <Route path="/users" element={<UsersPage />} />
                <Route path="/users/new" element={<CreateUserPage />} />
                <Route path="/users/:id" element={<UserDetailsPage />} />
                <Route path="/users/:id/edit" element={<EditUserPage />} />

                <Route path="/users/:id/posts" element={<UserPostsPage />} />

                <Route path="/posts" element={<PostsPage />} />
                <Route path="/posts/new" element={<CreatePostPage />} />
                <Route path="/posts/:id" element={<PostDetailsPage />} />
                <Route path="/posts/:id/edit" element={<EditPostPage />} />
                <Route path="/posts/create" element={<Navigate to="/posts/new" replace />} />

                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}