package com.wearecr.wearecrapplication.security.security_services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.wearecr.wearecrapplication.security.exceptions.MyAPIException;
import com.wearecr.wearecrapplication.security.security_DTOs.LoginDto;
import com.wearecr.wearecrapplication.security.security_DTOs.RegisterDto;
import com.wearecr.wearecrapplication.security.security_models.User;

public interface AuthServiceInterface {
    User login(LoginDto loginDto);
    String register(RegisterDto registerDto) throws MyAPIException;
}
