package com.example.server.auth;


import com.cloudinary.Cloudinary;
import com.example.server.exception.BadRequestException;
import com.example.server.exception.NotFoundException;
import com.example.server.exception.UnauthorizedException;
import com.example.server.jwtUtils.JwtService;
import com.example.server.user.Role;
import com.example.server.user.User;
import com.example.server.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

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
    public RegisterResponse register(RegisterDTO request) throws IOException {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already exists");
        }
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
                .role(Role.CUSTOMER)
                .avatarUrl(avatarUrl)
                .build();
        userRepository.save(user);
        user.setPassword(null);
        return RegisterResponse.builder()
                .data(user)
                .status(HttpStatus.OK.value())
                .message("Register successfully")
                .build();
    }

    public LoginResponse login(LoginDTO request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new NotFoundException("User not found"));
        String jwtToken = jwtService.generateToken(user);
        return LoginResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Login successfully")
                .accessToken(jwtToken)
                .build();
    }

    public RegisterResponse getMe() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            User user = (User) authentication.getPrincipal();
            user.setPassword(null);
            return RegisterResponse.builder()
                    .data(user)
                    .status(HttpStatus.OK.value())
                    .message("Get me successfully")
                    .build();
        } else {
            throw new UnauthorizedException("Unauthorized");
        }
    }

    public LoginResponse logout() {
        SecurityContextHolder.clearContext();
        return LoginResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Logout successfully")
                .accessToken(null)
                .build();
    }
}