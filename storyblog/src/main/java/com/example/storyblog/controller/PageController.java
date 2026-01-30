package com.example.storyblog.controller;

import com.example.storyblog.entity.Post;
import com.example.storyblog.service.PostService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class PageController {

    private final PostService postService;

    public PageController(PostService postService) {
        this.postService = postService;
    }

    // GET /posts → λίστα ιστοριών
    @GetMapping("/posts")
    public String viewPosts(Model model) {
        model.addAttribute("posts", postService.findAllPosts());
        return "posts";
    }

    // GET /posts/new → φόρμα
    @GetMapping("/posts/new")
    public String newPostForm(Model model) {
        model.addAttribute("post", new Post());
        return "new-post";
    }

    // POST /posts → αποθήκευση
    @PostMapping("/posts")
    public String createPost(@ModelAttribute Post post) {
        postService.savePost(post);
        return "redirect:/posts";
    }
}