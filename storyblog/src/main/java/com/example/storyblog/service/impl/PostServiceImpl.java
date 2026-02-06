package com.example.storyblog.service.impl;

import com.example.storyblog.dto.PostRequest;
import com.example.storyblog.entity.Post;
import com.example.storyblog.entity.User;
import com.example.storyblog.repository.PostRepository;
import com.example.storyblog.repository.UserRepository;
import com.example.storyblog.service.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public PostServiceImpl(PostRepository postRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Post> findAllPosts() {
        return postRepository.findAll();
    }

    @Override
    public List<Post> findPostsByUserId(Long userId) {
        return postRepository.findByAuthorId(userId);
    }

    @Override
    public Post findPostById(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Post not found"));
    }

    @Override
    public Post createPost(PostRequest request) {
        Post p = new Post();
        p.setTitle(request.getTitle());
        p.setContent(request.getContent());
        p.setAuthor(resolveAuthor(request.getAuthorId()));
        return postRepository.save(p);
    }

    @Override
    public Post updatePost(Long id, PostRequest request) {
        Post p = findPostById(id);
        p.setTitle(request.getTitle());
        p.setContent(request.getContent());
        p.setAuthor(resolveAuthor(request.getAuthorId()));
        return postRepository.save(p);
    }

    @Override
    public void deletePost(Long id) {
        Post p = findPostById(id);
        postRepository.delete(p);
    }

    private User resolveAuthor(Long authorId) {
        if (authorId == null) return null;
        return userRepository.findById(authorId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Author not found"));
    }
}