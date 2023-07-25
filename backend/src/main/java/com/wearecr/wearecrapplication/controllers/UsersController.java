package com.wearecr.wearecrapplication.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wearecr.wearecrapplication.DTOs.UserDto;
import com.wearecr.wearecrapplication.security.exceptions.MyAPIException;
import com.wearecr.wearecrapplication.security.security_models.User;
import com.wearecr.wearecrapplication.services.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/users")
public class UsersController {

    @Autowired
    private UserService userService;

    // GET USER
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<UserDto> getUser(@PathVariable String id) throws JsonProcessingException {
        UserDto u = userService.getUser(id);
        return ResponseEntity.ok(u);
    }

    // DELETE USER
    @DeleteMapping("/{userId}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<String> deleteUser(@PathVariable long userId) throws JsonProcessingException {
        try {
            userService.deleteUser(userId);
        } catch (IOException e) {
            e.printStackTrace();
        }
        ObjectMapper om = new ObjectMapper();
        return ResponseEntity.ok(om.writeValueAsString("Utente eliminato"));
    }

    // GET USER STARTS WITH
    @GetMapping()
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<List<UserDto>> getStartWith(@RequestParam String value) throws JsonProcessingException {
        List<UserDto> u = userService.getStartWith(value);
        return ResponseEntity.ok(u);
    }

    // UPDATE USER
    @PutMapping()
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<UserDto> putUser(@RequestBody UserDto inDto) throws MyAPIException {
        UserDto outDto = userService.putUser(inDto.getUserId(), inDto);
        return ResponseEntity.ok(outDto);
    }

    // UPDATE PROFILE PIC
    @PutMapping("/profilePic")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<UserDto> putProfilePic(@RequestBody UserDto inDto) throws MyAPIException {
        UserDto outDto = userService.putProfilePic(inDto.getUserId(), inDto);
        return ResponseEntity.ok(outDto);
    }

    // GET USER FOLLOWER
    @GetMapping("/follow/{userId}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<List<Long>> getUserFollower(@PathVariable String userId) throws JsonProcessingException {
        List<Long> userFollower;
        userFollower = userService.getUserFollower(Long.parseLong(userId));
        return ResponseEntity.ok(userFollower);

    }

    // PUT FOLLOW
    @PutMapping("/follow/{userId}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<User> putFollow(@RequestBody UserDto dto, @PathVariable String userId) throws IOException {
        User u = userService.putFollow(Long.parseLong(userId), dto);
        return ResponseEntity.ok(u);
    }

}
