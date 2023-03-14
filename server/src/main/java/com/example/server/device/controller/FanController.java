package com.example.server.device.controller;

import com.example.server.device.model.ManageDeviceDTO;
import com.example.server.device.service.FanService;
import com.example.server.sensor.model.SensorResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RequiredArgsConstructor
@RequestMapping("/devices/fan")
@RestController
public class FanController {
    private final FanService fanDeviceService;

    @PostMapping("/manage")
    public ResponseEntity<SensorResponse> manageFan(@RequestBody @Valid ManageDeviceDTO dataDTO) throws IOException {
        String value = dataDTO.getValue();
        return ResponseEntity.ok(SensorResponse.builder()
                .status(200)
                .message("Manage button")
                .data(fanDeviceService.turnOnOffFan(value))
                .build());
    }

    @GetMapping("/status")
    public ResponseEntity<SensorResponse> getDeviceStatus() {
        return ResponseEntity.ok(SensorResponse.builder()
                .status(200)
                .message("Get Fan status")
                .data(fanDeviceService.getDeviceStatus())
                .build());
    }
}
