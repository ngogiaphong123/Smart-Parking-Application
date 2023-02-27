package com.example.server.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterForm {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String phone;
    private MultipartFile avatar;
}