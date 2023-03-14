
package com.example.server.sensor.controller;

import com.example.server.sensor.model.SensorResponse;
import com.example.server.sensor.service.TemperatureRecordService;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sensors/temperature")
@RequiredArgsConstructor
public class TemperatureRecordController {
    private final TemperatureRecordService temperatureRecordService;

    @GetMapping("")
    public ResponseEntity<SensorResponse> getTemperature(
            @NotNull @RequestParam("page") Integer page,
            @NotNull @RequestParam("limit") Integer limit
    ) {
        return ResponseEntity.ok(SensorResponse.builder()
                .status(200)
                .message("Get temperature data")
                .data(temperatureRecordService.getTemperatureRecord(page, limit))
                .build());
    }
}