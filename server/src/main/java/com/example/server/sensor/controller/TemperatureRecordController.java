package com.example.server.sensor.controller;

import com.example.server.sensor.model.GetSensorDataDTO;
import com.example.server.sensor.model.SensorResponse;
import com.example.server.sensor.service.TemperatureRecordService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sensors/temperature")
@RequiredArgsConstructor
public class TemperatureRecordController {
    TemperatureRecordService temperatureRecordService;
    @GetMapping("")
    public ResponseEntity<SensorResponse> getTemperature(@RequestBody @Valid GetSensorDataDTO dataDTO) {
        Integer page = dataDTO.getPage();
        Integer limit = dataDTO.getLimit();
        return ResponseEntity.ok(SensorResponse.builder()
                .status(200)
                .message("Success")
                .data(temperatureRecordService.getTemperatureRecord(page, limit))
                .build());
    }
}
