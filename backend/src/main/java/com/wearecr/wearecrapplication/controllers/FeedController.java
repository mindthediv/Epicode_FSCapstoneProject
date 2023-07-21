package com.wearecr.wearecrapplication.controllers;

import java.io.IOException;
import java.util.Set;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wearecr.wearecrapplication.DTOs.PostDto;
import com.wearecr.wearecrapplication.models.Post;
import com.wearecr.wearecrapplication.repositories.PostRepo;
import com.wearecr.wearecrapplication.services.PostService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/feed/posts")
public class FeedController {

  @Autowired
  private PostService postService;

  @GetMapping()
  @PreAuthorize("hasRole('ROLE_USER')")
  public ResponseEntity<List<Post>> getAllPosts() throws JsonProcessingException {
    List<Post> set;
    try {
      set = postService.getAllPosts();
      return ResponseEntity.ok(set);
    } catch (IOException e) {
      e.printStackTrace();
    }
    return null;

  }

  @PostMapping("/me")
  @PreAuthorize("hasRole('ROLE_USER')")
  public ResponseEntity<List<Post>> getLoggedPosts(@RequestBody long id) throws JsonProcessingException {
    List<Post> set;
    try {
      set = postService.getAllPostsByUserId(id);
      return ResponseEntity.ok(set);
    } catch (IOException e) {
      e.printStackTrace();
    }
    return null;

  }

  @GetMapping("/{userId}")
  @PreAuthorize("hasRole('ROLE_USER')")
  public ResponseEntity<List<Post>> getPostById(@PathVariable long userId) throws JsonProcessingException {
    List<Post> set;
    try {
      set = postService.getAllPostsByUserId(userId);
      return ResponseEntity.ok(set);
    } catch (IOException e) {
      e.printStackTrace();
    }
    return null;

  }

  @PostMapping()
  @PreAuthorize("hasRole('ROLE_USER')")
  public ResponseEntity<Post> postAPost(@RequestBody PostDto dto) throws IOException {
    Post p = postService.savePost(dto);
    return ResponseEntity.ok(p);
  }
}
