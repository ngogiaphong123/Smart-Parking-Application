package com.example.server.sensor.service;

import com.example.server.sensor.repository.TemperatureRecordRepository;
import com.example.server.timeParser.TimeParser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class TemperatureRecordService {
    private final TemperatureRecordRepository temperatureRecordRepository;
}
