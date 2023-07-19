package com.wearecr.wearecrapplication.DTOs;

import java.nio.file.Path;

import lombok.Getter;

@Getter
public class PostDto {
    private String filePath;
    private String text;
    private Long userId;
    private long postId;
}
