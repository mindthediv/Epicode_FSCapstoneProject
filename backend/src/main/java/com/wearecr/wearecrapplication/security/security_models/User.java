package com.wearecr.wearecrapplication.security.security_models;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import com.wearecr.wearecrapplication.security.EnumeratedRoles;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
  @Id
  @SequenceGenerator(name = "user_ids")
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_ids")
  private long id;
  @Column(name = "first_name")
  private String firstName;
  @Column(name = "last_name")
  private String lastName;
  @Column(unique = true)
  private String username;
  @Column(unique = true)
  private String email;
  private String password;
  @Enumerated(EnumType.STRING)
  private Set<EnumeratedRoles> roles;
  @Transient
  private String auth = null;
  @Column(name = "profile_img")
  private String profileImg = "client-placeholder";
  private List<Long> follower = new ArrayList<Long>();
  private List<Long> followed = new ArrayList<Long>();
  @Column(name = "saved_posts")
  private List<Long> savedPosts = new ArrayList<Long>();
  private String bio;

  @Override
  public String toString() {
    return "User [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", username=" + username
        + ", email=" + email + "]";
  }
}
