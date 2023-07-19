package com.wearecr.wearecrapplication.security.security_services;

import java.util.HashSet;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wearecr.wearecrapplication.security.EnumeratedRoles;
import com.wearecr.wearecrapplication.security.exceptions.MyAPIException;
import com.wearecr.wearecrapplication.security.jwt.JwtTokenProvider;
import com.wearecr.wearecrapplication.security.security_DTOs.LoginDto;
import com.wearecr.wearecrapplication.security.security_DTOs.RegisterDto;
import com.wearecr.wearecrapplication.security.security_models.User;
import com.wearecr.wearecrapplication.security.security_repositories.UserRepo;

@Service
public class AuthService implements AuthServiceInterface {

    private AuthenticationManager authenticationManager;
    private UserRepo userRepository;
    // private RoleDAO roleRepository;
    private PasswordEncoder passwordEncoder;
    private JwtTokenProvider jwtTokenProvider;

    public AuthService(AuthenticationManager authenticationManager,
            UserRepo userRepository,
            PasswordEncoder passwordEncoder,
            JwtTokenProvider jwtTokenProvider) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public User login(LoginDto loginDto) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getUsername(), loginDto.getPassword()));
        System.out.println(authentication);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtTokenProvider.generateToken(authentication);
        User loggedUser = userRepository.findByUsername(loginDto.getUsername()).get();
        loggedUser.setAuth(token);
        return loggedUser;
    }

    @Override
    public String register(RegisterDto registerDto) throws MyAPIException {
      
        // add check for username exists in database
        if (userRepository.existsByUsername(registerDto.getUsername())) {
            throw new MyAPIException(HttpStatus.BAD_REQUEST, "This username already exists!");
        }
        // add check for email exists in database
        if (userRepository.existsByEmail(registerDto.getEmail())) {
            throw new MyAPIException(HttpStatus.BAD_REQUEST, "This email already exists!");
        }

        User user = new User();
        user.setFirstName(registerDto.getFirstName());
        user.setLastName(registerDto.getLastName());
        user.setUsername(registerDto.getUsername());
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));

        Set<EnumeratedRoles> roles = new HashSet<>();

        if (registerDto.getRoles() != null) {
            registerDto.getRoles().forEach(role -> {
                roles.add(EnumeratedRoles.valueOf(role));
            });
        } else {
            roles.add(EnumeratedRoles.ROLE_USER);
        }

        user.setRoles(roles);
        userRepository.save(user);
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.writeValueAsString(user);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;
    }

    public EnumeratedRoles getRole(String role) {
        if (role.equals("ROLE_ADMIN")) {
            return EnumeratedRoles.ROLE_ADMIN;
        }
        else
            return EnumeratedRoles.ROLE_USER;
    }

}
