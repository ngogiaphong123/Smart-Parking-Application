package com.example.server.sensor.controller;

import com.example.server.sensor.model.SensorResponse;
import com.example.server.sensor.service.LightRecordService;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sensors/light")
@RequiredArgsConstructor
@Slf4j
public class LightRecordController {
    private final LightRecordService lightRecordService;

    @GetMapping("")
    public ResponseEntity<SensorResponse> getLight(
            @NotNull @RequestParam("page") Integer page,
            @NotNull @RequestParam("limit") Integer limit
    ) {
        return ResponseEntity.ok(SensorResponse.builder()
                .status(200)
                .message("Get light data")
                .data(lightRecordService.getLightRecord(page, limit))
                .build());
    }
}
