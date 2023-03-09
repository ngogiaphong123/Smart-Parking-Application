package com.example.server.auth;

import com.example.server.sensor.model.LightRecord;
import com.example.server.sensor.service.LightRecordService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

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
