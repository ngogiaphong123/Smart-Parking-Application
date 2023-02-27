package com.example.server.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterDTO {
    @Email(message = "Email should be valid")
    private String email;
    @Size(min = 6, message = "Password should be at least 6 characters")
    private String password;
    @NotBlank(message = "First name is required")
    private String firstName;
    @NotBlank(message = "Last name is required")
    private String lastName;
    @Pattern(regexp = "\\d{10}$", message = "Phone number should be valid")
    private String phone;
    private MultipartFile avatar;
}