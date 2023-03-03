package com.example.server.sensor;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/sensors")
@RequiredArgsConstructor
public class SensorController {
    private final RestTemplate restTemplate;
    @GetMapping("/temperature")
    public String getTemperature() {
        final String temperatureFeedUrl = "https://io.adafruit.com/api/v2/hibecung123/feeds/cambiennhiet/data";
        return restTemplate.getForObject(temperatureFeedUrl, String.class);
    }
}
