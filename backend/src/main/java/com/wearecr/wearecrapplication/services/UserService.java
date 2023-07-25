package com.wearecr.wearecrapplication.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wearecr.wearecrapplication.DTOs.UserDto;
import com.wearecr.wearecrapplication.models.Post;
import com.wearecr.wearecrapplication.repositories.PostRepo;
import com.wearecr.wearecrapplication.security.security_models.User;
import com.wearecr.wearecrapplication.security.security_repositories.UserRepo;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private PostRepo postRepo;

    // GET USER
    public UserDto getUser(String id) {
        User u = userRepo.findById(Long.parseLong(id)).get();
        UserDto udto = new UserDto();
        udto.setFirstName(u.getFirstName());
        udto.setLastName(u.getLastName());
        udto.setEmail(u.getEmail());
        udto.setUsername(u.getUsername());
        udto.setRoles(u.getRoles());
        udto.setUserId(String.valueOf(u.getId()));
        udto.setProfileImg(u.getProfileImg());
        udto.setFollowed(u.getFollowed());
        udto.setFollower(u.getFollower());
        udto.setBio(u.getBio());

        return udto;
    }

    // DELETE USER
    public void deleteUser(long id) throws IOException {
        User u = userRepo.findById(id).get();
        List<Post> p = postRepo.findByUserId(id);
        p.forEach(el -> postRepo.delete(el));
        userRepo.delete(u);
    }

    // GET USER STARTS WITH
    public List<UserDto> getStartWith(String username) {
        List<User> userList = userRepo.findByUsernameStartingWith(username);
        List<UserDto> dtoList = new ArrayList<UserDto>();

        userList.forEach(u -> {
            UserDto udto = new UserDto();
            udto.setFirstName(u.getFirstName());
            udto.setLastName(u.getLastName());
            udto.setEmail(u.getEmail());
            udto.setUsername(u.getUsername());
            udto.setRoles(u.getRoles());
            udto.setUserId(String.valueOf(u.getId()));
            udto.setProfileImg(u.getProfileImg());
            udto.setFollowed(u.getFollowed());
            udto.setFollower(u.getFollower());
            udto.setBio(u.getBio());
            dtoList.add(udto);
        });

        return dtoList;
    }

    // UPDATE USER
    public UserDto putUser(String id, UserDto inDto) {
        String firstName = inDto.getFirstName();
        String lastName = inDto.getLastName();
        String email = inDto.getEmail();
        String username = inDto.getUsername();
        String profileImg = inDto.getProfileImg();
        List<Long> followed = inDto.getFollowed();
        List<Long> follower = inDto.getFollower();
        String bio = inDto.getBio();
        User u = userRepo.findById(Long.parseLong(id)).get();
        if (username != null) {
            u.setUsername(username);
        }
        if (bio != null) {
            u.setBio(bio);
        }
        if (firstName != null) {
            u.setFirstName(firstName);
        }
        if (lastName != null) {
            u.setLastName(lastName);
        }
        if (email != null) {
            u.setEmail(email);
        }
        if (followed != null) {
            u.setFollowed(followed);
        }
        if (follower != null) {
            u.setFollower(follower);
        }
        if (profileImg != "client-placeholder" & profileImg != null) {
            u.setProfileImg(profileImg);
        }

        userRepo.saveAndFlush(u);
        UserDto outDto = new UserDto();
        outDto.setFirstName(u.getFirstName());
        outDto.setLastName(u.getLastName());
        outDto.setEmail(u.getEmail());
        outDto.setUsername(u.getUsername());
        outDto.setProfileImg(u.getProfileImg());

        outDto.setFollowed(u.getFollowed());
        outDto.setFollower(u.getFollower());
        outDto.setBio(u.getBio());
        return outDto;
    }

    // UPDATE PROFILE PIC
    public UserDto putProfilePic(String id, UserDto inDto) {
        User u = userRepo.findById(Long.parseLong(id)).get();
        u.setProfileImg(inDto.getProfileImg());
        userRepo.saveAndFlush(u);
        UserDto outDto = new UserDto();
        outDto.setProfileImg(u.getProfileImg());
        return outDto;
    }

    // GET USER FOLLOWER
    public List<Long> getUserFollower(Long id) {
        User u = userRepo.findById(id).get();
        return u.getFollower();
    }

    // PUT FOLLOW
    public User putFollow(Long id, UserDto inDto) {
        User u = userRepo.findById(id).get();
        User l = userRepo.findById(inDto.getPayFollow()).get();
        List<Long> uFollowers = u.getFollower();
        if (uFollowers.contains(inDto.getPayFollow())) {
            uFollowers.remove(inDto.getPayFollow());
            l.getFollowed().remove(id);
            userRepo.saveAndFlush(l);
        } else {
            uFollowers.add(inDto.getPayFollow());
            l.getFollowed().add(id);
            userRepo.saveAndFlush(l);
        }

        userRepo.saveAndFlush(u);
        return u;
    }
}
