package com.example.server.auth;

import com.example.server.api.AdafruitApiService;
import com.example.server.api.AdafruitRetrofitClientAPI;
import com.example.server.api.recordData.IsLightOn;
import com.example.server.api.recordData.TemperatureApiRecord;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import retrofit2.Call;
import retrofit2.Response;
import retrofit2.Retrofit;

import java.io.IOException;
import java.util.Set;

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
    @GetMapping("/test")
    public ResponseEntity<?> test() throws IOException {
        IsLightOn isLightOn = new IsLightOn();
        isLightOn.setValue("0eree");
        Call<Void> call = AdafruitRetrofitClientAPI.getAdafruitApi().postToFeed(isLightOn);
        Response<Void> response = call.execute();
        return ResponseEntity.ok(response.isSuccessful());
    }
}
