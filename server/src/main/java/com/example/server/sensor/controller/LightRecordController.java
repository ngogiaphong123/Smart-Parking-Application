package com.example.server.sensor.controller;

import com.example.server.sensor.model.GetSensorDataDTO;
import com.example.server.sensor.model.PostToButtonFeedDTO;
import com.example.server.sensor.model.SensorResponse;
import com.example.server.sensor.service.LightRecordService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/sensors/light")
@RequiredArgsConstructor
@Slf4j
public class LightRecordController {
    private final LightRecordService lightRecordService;
    @GetMapping("")
    public ResponseEntity<SensorResponse> getLight(@RequestBody @Valid GetSensorDataDTO dataDTO) {
        Integer page = dataDTO.getPage();
        Integer limit = dataDTO.getLimit();
        return ResponseEntity.ok(SensorResponse.builder()
                .status(200)
                .message("Get light data")
                .data(lightRecordService.getLightRecord(page, limit))
                .build());
    }
}
