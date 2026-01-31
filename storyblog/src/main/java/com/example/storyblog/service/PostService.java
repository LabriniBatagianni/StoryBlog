package com.example.storyblog.service;

import com.example.storyblog.dto.PostRequest;
import com.example.storyblog.entity.Post;

import java.util.List;

public interface PostService {

    List<Post> findAllPosts();

    Post findPostById(Long id);

    Post savePost(Post post);

    Post updatePost(Long id, PostRequest request);

    void deletePost(Long id);
}