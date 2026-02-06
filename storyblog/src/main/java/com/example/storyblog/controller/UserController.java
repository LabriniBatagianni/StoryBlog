package com.example.storyblog.controller;

import com.example.storyblog.entity.Post;
import com.example.storyblog.entity.User;
import com.example.storyblog.service.PostService;
import com.example.storyblog.service.UserService;
import org.springframework.web.bind.annotation.*;
import com.example.storyblog.dto.UserRequest;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final PostService postService;

    public UserController(UserService userService, PostService postService) {
        this.userService = userService;
        this.postService = postService;
    }

    @GetMapping
    public List<User> getAll() {
        return userService.findAllUsers();
    }

    @GetMapping("/{id}")
    public User getById(@PathVariable Long id) {
        return userService.findUserById(id);
    }

    @PostMapping
    public User create(@Valid @RequestBody UserRequest request) {
        return userService.createUser(request);
    }

    @GetMapping("/{id}/posts")
    public List<Post> getUserPosts(@PathVariable Long id) {
        userService.findUserById(id);
        return postService.findPostsByUserId(id);
    }
}