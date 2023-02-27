package com.example.server.auth;

import com.example.server.user.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {
    private final Logger logger = org.slf4j.LoggerFactory.getLogger(AuthController.class);
    private final AuthService authService;
    @PostMapping("/register")
    public ResponseEntity<?> register(@ModelAttribute RegisterForm registerForm) throws IOException {
        return ResponseEntity.ok(authService.register(registerForm));
    }
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginForm loginForm) {
        try {
            return ResponseEntity.ok(authService.login(loginForm));
        } catch (Exception e) {
            logger.error(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping("/whoami")
    public ResponseEntity<Object> whoami() {
        // TODO: get the current user by using SecurityContextHolder
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        //omit the password
        if (principal instanceof User) {
            ((User) principal).setPassword(null);
        }
        return ResponseEntity.ok(principal);
    }
}
