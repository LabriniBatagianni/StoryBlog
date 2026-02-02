import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

import HomePage from "./pages/HomePage";
import UsersPage from "./pages/UsersPage";
import PostsPage from "./pages/PostsPage";
import CreatePostPage from "./pages/CreatePostPage";
import PostDetailsPage from "./pages/PostDetailsPage";
import EditPostPage from "./pages/EditPostPage";
import CreateUserPage from "./pages/CreateUserPage";
import EditUserPage from "./pages/EditUserPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
    return (
            <Routes>
                <Route element={<Layout />}>
                    {/* home */}
                    <Route path="/" element={<HomePage />} />

                    {/* users */}
                    <Route path="/users" element={<UsersPage />} />
                    <Route path="/users/new" element={<CreateUserPage />} />
                    <Route path="/users/:id/edit" element={<EditUserPage />} />


                    {/* posts */}
                    <Route path="/posts" element={<PostsPage />} />
                    <Route path="/posts/new" element={<CreatePostPage />} />
                    <Route path="/posts/:id" element={<PostDetailsPage />} />
                    <Route path="/posts/:id/edit" element={<EditPostPage />} />

                    {/* redirect */}
                    <Route path="/posts/create" element={<Navigate to="/posts/new" replace />} />

                    {/* 404 */}
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
    );
}