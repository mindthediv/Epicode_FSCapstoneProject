package com.wearecr.wearecrapplication.uploads;

import java.io.IOException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/uploads")
public class UploadsController {

    @Autowired
    private UploadsService uploadsService;

    private final ResourceLoader resourceLoader;

    public UploadsController(ResourceLoader rl) {
        this.resourceLoader = rl;
    }

    @GetMapping("/{fileName}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<Resource> sendFile(@PathVariable String fileName) {
        Resource resource = new ClassPathResource("static/files/" + fileName);
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(resource);
    }

    @GetMapping("/profile/{fileName}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<Resource> sendProfilePic(@PathVariable String fileName) {
        Resource resource = new ClassPathResource("static/profileImgs/" + fileName);
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(resource);
    }

    @GetMapping("/background/{fileName}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<Resource> sendBackground(@PathVariable String fileName) {
        Resource resource = new ClassPathResource("static/backgrounds/" + fileName);
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(resource);
    }

    @PostMapping()
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<String> downloadFile(@RequestBody MultipartFile file) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        String filePath = uploadsService.downloadFile(file);
        try {
            String message;
            message = objectMapper.writeValueAsString(filePath);
            return ResponseEntity.ok(message);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;

    }

    @PostMapping("/profile")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<String> downloadProfilePic(@RequestBody MultipartFile file) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        String filePath = uploadsService.downloadProfilePic(file);
        try {
            String message;
            message = objectMapper.writeValueAsString(filePath);
            return ResponseEntity.ok(message);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;

    }

    @PostMapping("/background")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<String> downloadBackground(@RequestBody MultipartFile file) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        String filePath = uploadsService.downloadBackground(file);
        try {
            String message;
            message = objectMapper.writeValueAsString(filePath);
            return ResponseEntity.ok(message);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;

    }

}
