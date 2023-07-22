package com.wearecr.wearecrapplication.DTOs;

import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

import lombok.Getter;

@Getter
public class PostDto {
    private String filePath;
    private String text;
    private String title = "-";
    private Long userId;
    private long postId;
    private List<Long> likes;
    private Long lk;

}
