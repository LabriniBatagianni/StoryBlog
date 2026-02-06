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

    @GetMapping
    public List<Post> getAllPosts() {
        return postService.findAllPosts();
    }

    @GetMapping("/{id}")
    public Post getPostById(@PathVariable Long id) {
        return postService.findPostById(id);
    }

    @PostMapping
    public Post createPost(@Valid @RequestBody PostRequest request) {
        return postService.createPost(request);
    }

    @PutMapping("/{id}")
    public Post updatePost(@PathVariable Long id, @Valid @RequestBody PostRequest request) {
        return postService.updatePost(id, request);
    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id) {
        postService.deletePost(id);
    }
}