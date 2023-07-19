package com.wearecr.wearecrapplication.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wearecr.wearecrapplication.models.Post;

public interface PostRepo extends JpaRepository<Post, Long> {
    public List<Post> findByUserId(Long userId);
}
