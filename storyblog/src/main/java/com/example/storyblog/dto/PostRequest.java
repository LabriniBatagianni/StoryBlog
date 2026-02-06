package com.example.storyblog.dto;

import jakarta.validation.constraints.NotBlank;

public class PostRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String content;

    private Long authorId;

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public Long getAuthorId() { return authorId; }
    public void setAuthorId(Long authorId) { this.authorId = authorId; }
}