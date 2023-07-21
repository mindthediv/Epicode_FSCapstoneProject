package com.wearecr.wearecrapplication.uploads;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UploadsService {
    private String uploadsPath = "backend\\src\\main\\resources\\static\\files";
    private String profileImgsPath = "backend\\src\\main\\resources\\static\\profileImgs";
    private String backgroundsPath = "backend\\src\\main\\resources\\static\\backgrounds";

    public String downloadFile(MultipartFile file) {
        try {
            byte[] fileData = file.getBytes();
            // assegna nome univoco
            String fileName = UUID.randomUUID().toString() + file.getOriginalFilename();
            // crea percorso di download + nome univoco del file
            Path filePath = Paths.get(uploadsPath, fileName);
            Files.createDirectories(filePath.getParent());
            // scrive su disco
            Files.write(filePath, file.getBytes());
            // ritorna il percorso + file
            return fileName;
        } catch (IOException e) {
            e.getMessage();
        }
        return null;

    }

    public String downloadProfilePic(MultipartFile file) {
        try {
            byte[] fileData = file.getBytes();
            // assegna nome univoco
            String fileName = UUID.randomUUID().toString() + file.getOriginalFilename();
            // crea percorso di download + nome univoco del file
            Path filePath = Paths.get(profileImgsPath, fileName);
            Files.createDirectories(filePath.getParent());
            // scrive su disco
            Files.write(filePath, file.getBytes());
            // ritorna il percorso + file
            return fileName;
        } catch (IOException e) {
            e.getMessage();
        }
        return null;

    }

    public String downloadBackground(MultipartFile file) {
        try {
            byte[] fileData = file.getBytes();
            // assegna nome univoco
            String fileName = UUID.randomUUID().toString() + file.getOriginalFilename();
            // crea percorso di download + nome univoco del file
            Path filePath = Paths.get(backgroundsPath, fileName);
            Files.createDirectories(filePath.getParent());
            // scrive su disco
            Files.write(filePath, file.getBytes());
            // ritorna il percorso + file
            return fileName;
        } catch (IOException e) {
            e.getMessage();
        }
        return null;

    }

}
