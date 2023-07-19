package com.wearecr.wearecrapplication.services;

import java.io.IOException;
import java.nio.file.Files;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.wearecr.wearecrapplication.DTOs.PostDto;
import com.wearecr.wearecrapplication.models.Post;
import com.wearecr.wearecrapplication.repositories.PostRepo;
import com.wearecr.wearecrapplication.security.security_configurations.SecretCodeConvert;

@Service
public class PostService {
    @Autowired
    private PostRepo postRepo;

    public PostService(PostRepo postRepo) {
        this.postRepo = postRepo;
    }

    public Post savePost(PostDto dto) throws IOException {
        Post p = new Post();
        p.setText(dto.getText());
        p.setDate(LocalDate.now());
        p.setFilePath(dto.getFilePath());
        p.setUserId(dto.getUserId());
        p.setId(dto.getPostId());
        postRepo.save(p);
        // Post savedP = postRepo.findById((long) 202).get();
        return p;
    }

    public List<Post> getAllPosts() throws IOException {
        List<Post> set = postRepo.findAll();
        return set;
    }

    public List<Post> getAllPostsByUserId(Long id) throws IOException {
        List<Post> set = postRepo.findByUserId(id);
        return set;
    }
}