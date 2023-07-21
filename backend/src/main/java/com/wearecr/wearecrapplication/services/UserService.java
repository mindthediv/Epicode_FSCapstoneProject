package com.wearecr.wearecrapplication.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wearecr.wearecrapplication.DTOs.UserDto;
import com.wearecr.wearecrapplication.security.security_models.User;
import com.wearecr.wearecrapplication.security.security_repositories.UserRepo;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;

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
        return udto;
    }

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
            dtoList.add(udto);
        });

        return dtoList;
    }

    public UserDto putUser(String id, UserDto inDto) {
        User u = userRepo.findById(Long.parseLong(id)).get();
        u.setUsername(inDto.getUsername());
        u.setEmail(inDto.getEmail());
        u.setProfileImg(inDto.getProfileImg());
        userRepo.saveAndFlush(u);
        UserDto outDto = new UserDto();
        outDto.setFirstName(u.getFirstName());
        outDto.setLastName(u.getLastName());
        outDto.setEmail(u.getEmail());
        outDto.setUsername(u.getUsername());
        outDto.setProfileImg(u.getProfileImg());
        outDto.setRoles(u.getRoles());
        return outDto;
    }

    public UserDto putProfilePic(String id, UserDto inDto) {
        User u = userRepo.findById(Long.parseLong(id)).get();
        u.setProfileImg(inDto.getProfileImg());
        userRepo.saveAndFlush(u);
        UserDto outDto = new UserDto();
        outDto.setFirstName(u.getFirstName());
        outDto.setLastName(u.getLastName());
        outDto.setEmail(u.getEmail());
        outDto.setUsername(u.getUsername());
        outDto.setProfileImg(u.getProfileImg());
        outDto.setRoles(u.getRoles());
        return outDto;
    }

    public UserDto putBackgroundPic(String id, UserDto inDto) {
        User u = userRepo.findById(Long.parseLong(id)).get();
        u.setBackgroundImg(inDto.getBackgroundImg());
        userRepo.saveAndFlush(u);
        UserDto outDto = new UserDto();
        outDto.setFirstName(u.getFirstName());
        outDto.setLastName(u.getLastName());
        outDto.setEmail(u.getEmail());
        outDto.setUsername(u.getUsername());
        outDto.setProfileImg(u.getProfileImg());
        outDto.setBackgroundImg(u.getBackgroundImg());
        outDto.setRoles(u.getRoles());
        return outDto;
    }
}
