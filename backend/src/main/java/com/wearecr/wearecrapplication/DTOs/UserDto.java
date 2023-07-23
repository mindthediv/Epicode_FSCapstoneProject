package com.wearecr.wearecrapplication.DTOs;

import java.util.List;
import java.util.Set;

import com.wearecr.wearecrapplication.security.EnumeratedRoles;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String profileImg = "client-placeholder";
    private Set<EnumeratedRoles> roles;
    private String userId;
    private String backgroundImg = "client-placeholder";
    private List<Long> follower;
    private List<Long> followed;
    private List<Long> savedPosts;
    private Long payFollow;
}
