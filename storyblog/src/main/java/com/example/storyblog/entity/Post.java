package com.example.storyblog.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "posts")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

        @ManyToOne(fetch = FetchType.EAGER)
        @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"posts", "hibernateLazyInitializer", "handler"})
    private User author;

    // getters/setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public User getAuthor() { return author; }
    public void setAuthor(User author) { this.author = author; }
}