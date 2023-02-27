package com.example.server.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginDTO {
    @Email(message = "Email should be valid")
    private String email;
    @Size(min = 6, message = "Password should be at least 6 characters")
    private String password;
}
