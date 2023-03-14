package com.example.server.device.controller;

import com.example.server.device.model.ManageDeviceDTO;
import com.example.server.device.service.LightBulkService;
import com.example.server.sensor.model.SensorResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/devices/light")
@RequiredArgsConstructor
public class LightBulkController {
    private final LightBulkService lightBulkService;

    @PostMapping("/manage")
    public ResponseEntity<SensorResponse> manageLightBulk(@RequestBody @Valid ManageDeviceDTO dataDTO) throws IOException {
        String value = dataDTO.getValue();
        return ResponseEntity.ok(SensorResponse.builder()
                .status(200)
                .message("Manage button")
                .data(lightBulkService.turnOnOffLightBulk(value))
                .build());
    }

    @GetMapping("/status")
    public ResponseEntity<SensorResponse> getDeviceStatus() {
        return ResponseEntity.ok(SensorResponse.builder()
                .status(200)
                .message("Get Light status")
                .data(lightBulkService.getDeviceStatus())
                .build());
    }
}
