package com.wearecr.wearecrapplication.controllers;

import java.io.IOException;
import java.util.Set;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
@RequestMapping("api/feed")
public class FeedController {

  @Autowired
  private PostService postService;

  @GetMapping("/posts")
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

  @PostMapping("/posts/me")
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

  @PostMapping("/posts")
  @PreAuthorize("hasRole('ROLE_USER')")
  public ResponseEntity<Post> postAPost(@RequestBody PostDto dto) throws IOException {
    // ObjectMapper objectMapper = new ObjectMapper();

    Post p = postService.savePost(dto);

    // String message = objectMapper.writeValueAsString(p);
    return ResponseEntity.ok(p);
  }

  // RIPRENDI COL POST MAKER E LO SCAMBIO JSON DEL FILE IMG !!!!!!!

  // @PostMapping("/posts")
  // @PreAuthorize("hasRole('ROLE_USER')")
  // public ResponseEntity<Post> postAPost(@RequestBody PostDto p) throws
  // JsonProcessingException{
  // ObjectMapper objectMapper = new ObjectMapper();
  // String message = objectMapper.writeValueAsString("I servizi comunicano");
  // postService.savePost(p, p.getImg());
  // return ResponseEntity.ok(message);
  // }
}
