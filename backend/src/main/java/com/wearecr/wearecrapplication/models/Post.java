package com.wearecr.wearecrapplication.models;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "posts")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Post {
    @Id
    @SequenceGenerator(name = "post_ids")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "post_ids")
    private long id;
    @Column(name = "file_path")
    private String filePath;
    private String text;
    private String title;
    private LocalDate date;
    @Column(name = "user_id")
    private Long userId;
    private List<Long> likes = new ArrayList<Long>();
}