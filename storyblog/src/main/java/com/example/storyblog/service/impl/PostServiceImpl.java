package com.example.storyblog.service.impl;

import com.example.storyblog.dto.PostRequest;
import com.example.storyblog.entity.Post;
import com.example.storyblog.repository.PostRepository;
import com.example.storyblog.service.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;

    public PostServiceImpl(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Override
    public List<Post> findAllPosts() {
        return postRepository.findAll();
    }

    @Override
    public Post findPostById(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND, "Post not found with id " + id)
                );
    }

    @Override
    public Post savePost(Post post) {
        return postRepository.save(post);
    }

    @Override
    public Post updatePost(Long id, PostRequest request) {
        Post post = findPostById(id);

        post.setTitle(request.getTitle());
        post.setContent(request.getContent());

        return postRepository.save(post);
    }

    @Override
    public void deletePost(Long id) {
        Post post = findPostById(id);
        postRepository.delete(post);
    }
}