package com.example.server.sensor.controller;

import com.example.server.sensor.model.ButtonFeed;
import com.example.server.sensor.model.PostToButtonFeedDTO;
import com.example.server.sensor.model.SensorResponse;
import com.example.server.sensor.service.ButtonFeedService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/buttons")
@RequiredArgsConstructor
@Slf4j
public class ButtonFeedController {
    private final ButtonFeedService buttonFeedService;
    @PostMapping("/manage")
    public ResponseEntity<SensorResponse> manageDevice(@RequestBody @Valid PostToButtonFeedDTO dataDTO) {
        String feedKey = dataDTO.getFeedKey();
        String value = dataDTO.getValue();
        return ResponseEntity.ok(SensorResponse.builder()
                .status(200)
                .message("Manage button")
                .data(buttonFeedService.turnOnOffDevice(value, feedKey))
                .build());
    }
    @GetMapping("/status")
    public ResponseEntity<SensorResponse> getButtonStatus(@RequestBody @Valid ButtonFeed buttonFeed) {
        String feedKey = buttonFeed.getFeedKey();
        String message = String.format("Get button status of %s", feedKey);
        return ResponseEntity.ok(SensorResponse.builder()
                .status(200)
                .message(message)
                .data(buttonFeedService.getButtonStatus(feedKey))
                .build());
    }
}
