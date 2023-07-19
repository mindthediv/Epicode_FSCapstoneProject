package com.wearecr.wearecrapplication.security.security_controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wearecr.wearecrapplication.DTOs.UserDto;
import com.wearecr.wearecrapplication.security.exceptions.MyAPIException;
import com.wearecr.wearecrapplication.security.security_DTOs.JWTAuthResponse;
import com.wearecr.wearecrapplication.security.security_DTOs.LoginDto;
import com.wearecr.wearecrapplication.security.security_DTOs.RegisterDto;
import com.wearecr.wearecrapplication.security.security_models.User;
import com.wearecr.wearecrapplication.security.security_repositories.UserRepo;
import com.wearecr.wearecrapplication.security.security_services.AuthServiceInterface;
import com.wearecr.wearecrapplication.services.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/auth")
public class AuthController {

    private AuthServiceInterface authService;
    private UserService userService;

    private @Autowired UserRepo utenteDAO;

    public AuthController(AuthServiceInterface authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    // Login REST API
    @PostMapping(value = { "/login", "/signin" })
    public ResponseEntity<User> login(@RequestBody LoginDto loginDto) {

        User loggedUser = authService.login(loginDto);

        JWTAuthResponse jwtAuthResponse = new JWTAuthResponse();
        jwtAuthResponse.setUsername(loginDto.getUsername());
        jwtAuthResponse.setAccessToken(loggedUser.getAuth());

        return ResponseEntity.ok(loggedUser);
    }

    // Register REST API
    @PostMapping(value = { "/register", "/signup" })
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) throws MyAPIException {
        String response = authService.register(registerDto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

  

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return utenteDAO.findAll();
    }
}
