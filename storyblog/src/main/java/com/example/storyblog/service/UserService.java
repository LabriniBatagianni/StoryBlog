package com.example.storyblog.service;

import com.example.storyblog.dto.UserRequest;
import com.example.storyblog.entity.User;

import java.util.List;

public interface UserService {
    List<User> findAllUsers();
    User findUserById(Long id);
    User createUser(UserRequest request);
    User updateUser(Long id, UserRequest request);
    void deleteUser(Long id);
}