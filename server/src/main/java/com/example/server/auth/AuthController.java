package com.example.server.auth;

import com.example.server.exception.UnauthorizedException;
import com.example.server.user.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {
    private final AuthService authService;
    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@ModelAttribute @Valid RegisterDTO registerDTO) throws IOException {
        return ResponseEntity.ok(authService.register(registerDTO));
    }
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody @Valid LoginDTO loginDTO) {
        return ResponseEntity.ok(authService.login(loginDTO));
    }
    @GetMapping("/whoami")
    public ResponseEntity<RegisterResponse> whoami() {
        return ResponseEntity.ok(authService.getMe());
    }
    @GetMapping("/logout")
    public ResponseEntity<LoginResponse> logout() {
        return ResponseEntity.ok(authService.logout());
    }
}
