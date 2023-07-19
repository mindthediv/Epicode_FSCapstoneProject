package com.wearecr.wearecrapplication.security.security_DTOs;

import java.util.Set;

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
public class RegisterDto {
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String password;
    // Passaggio di ruoli dal client (Facoltativo)
    private Set<String> roles;
}
