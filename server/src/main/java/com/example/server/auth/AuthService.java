package com.example.server.auth;


import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.server.jwtUtils.JwtService;
import com.example.server.user.Role;
import com.example.server.user.User;
import com.example.server.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final Cloudinary cloudinary;
    private final Logger logger = org.slf4j.LoggerFactory.getLogger(AuthService.class);
    public AuthResponse register(RegisterForm request) throws IOException {
        Map<String, Object> params = new HashMap<>();
        params.put("folder", "SmartParkingApp");
        params.put("resource_type", "auto");
        Map<?,?> uploadResult = cloudinary.uploader().upload(request.getAvatar().getBytes(), params);
        String avatarUrl = uploadResult.get("secure_url").toString();
        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .role(Role.USER)
                .build();
        userRepository.save(user);
        String jwtToken = jwtService.generateToken(user);
        return AuthResponse.builder()
                .accessToken(jwtToken)
                .build();
    }

    public AuthResponse login(LoginForm request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalStateException("User not found"));
        String jwtToken = jwtService.generateToken(user);
        return AuthResponse.builder()
                .accessToken(jwtToken)
                .build();
    }
}