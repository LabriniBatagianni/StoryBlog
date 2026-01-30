package com.example.storyblog.controller;

import com.example.storyblog.dto.PostRequest;
import com.example.storyblog.entity.Post;
import com.example.storyblog.service.PostService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    // GET /api/posts
    @GetMapping
    public List<Post> getAllPosts() {
        return postService.findAllPosts();
    }

    // POST /api/posts
    @PostMapping
    public Post createPost(@Valid @RequestBody PostRequest request) {
        Post post = new Post();
        post.setTitle(request.getTitle());
        post.setContent(request.getContent());

        return postService.savePost(post);
    }
}