package com.wearecr.wearecrapplication.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class testController {
    
    @GetMapping("/test")
    public ResponseEntity<String> getTest() throws JsonProcessingException{
        ObjectMapper objectMapper = new ObjectMapper();
        String message = objectMapper.writeValueAsString("I servizi comunicano");
        return ResponseEntity.ok(message);
    }
}

