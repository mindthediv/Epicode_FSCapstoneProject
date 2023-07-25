package com.wearecr.wearecrapplication.services;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.wearecr.wearecrapplication.DTOs.PostDto;
import com.wearecr.wearecrapplication.models.Post;
import com.wearecr.wearecrapplication.repositories.PostRepo;

@Service
public class PostService {
    @Autowired
    private PostRepo postRepo;

    public PostService(PostRepo postRepo) {
        this.postRepo = postRepo;
    }

    // SAVE POST
    public Post savePost(PostDto dto) throws IOException {
        Post p = new Post();
        p.setText(dto.getText());
        p.setDate(LocalDate.now());
        p.setFilePath(dto.getFilePath());
        p.setUserId(dto.getUserId());
        p.setId(dto.getPostId());
        p.setTitle(dto.getTitle());
        postRepo.save(p);
        return p;
    }

    // UPDATE POST
    public Post putPost(Long id, PostDto inDto) {
        Post p = postRepo.findById(id).get();
        p.setDate(LocalDate.now());
        p.setFilePath(inDto.getFilePath());
        p.setText(inDto.getText());
        p.setTitle(inDto.getTitle());
        postRepo.saveAndFlush(p);

        return p;
    }

    // DELETE POST
    public void deletePost(long id) throws IOException {
        Post p = postRepo.findById(id).get();
        postRepo.delete(p);
    }

    // GET ALL
    public List<Post> getAllPosts() throws IOException {
        List<Post> set = postRepo.findAll();
        return set;
    }

    // GET ALL BY USERID
    public List<Post> getAllPostsByUserId(Long id) throws IOException {
        List<Post> set = postRepo.findByUserId(id);
        return set;
    }

    // PUT LIKE
    public Post putLike(Long id, PostDto inDto) {
        Post p = postRepo.findById(id).get();
        List<Long> pLikes = p.getLikes();
        if (pLikes.contains(inDto.getLk())) {
            pLikes.remove(inDto.getLk());
        } else {
            pLikes.add(inDto.getLk());
        }

        postRepo.saveAndFlush(p);
        return p;
    }

    // GET POST LIKES
    public List<Long> getLikes(long id) {
        Post p = postRepo.findById(id).get();

        return p.getLikes();
    }
}
