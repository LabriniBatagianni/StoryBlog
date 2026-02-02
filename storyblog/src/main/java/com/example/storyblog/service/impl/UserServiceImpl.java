package com.example.storyblog.service.impl;

import com.example.storyblog.dto.UserRequest;
import com.example.storyblog.entity.User;
import com.example.storyblog.repository.UserRepository;
import com.example.storyblog.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User findUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    @Override
    public User createUser(UserRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
        }

        User u = new User();
        u.setName(request.getName());
        u.setEmail(request.getEmail());
        return userRepository.save(u);
    }

    @Override
    public User updateUser(Long id, UserRequest request) {
        User u = findUserById(id);

        if (!u.getEmail().equals(request.getEmail())
                && userRepository.existsByEmail(request.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
        }

        u.setName(request.getName());
        u.setEmail(request.getEmail());
        return userRepository.save(u);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.delete(findUserById(id));
    }
}