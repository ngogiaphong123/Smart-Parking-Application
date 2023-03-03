package com.example.server.sensor.service;

import com.example.server.api.recordData.TemperatureApiRecord;
import com.example.server.sensor.model.TemperatureRecord;
import com.example.server.sensor.repository.TemperatureRecordRepository;
import com.example.server.timeParser.TimeParser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class TemperatureRecordService {
    private final TemperatureRecordRepository temperatureRecordRepository;

    public void saveTemperatureRecordToDatabase(TemperatureApiRecord temperatureApiRecord) {
        TimeParser timeParser = TimeParser.getInstance();
        LocalDateTime timestamp = timeParser.parse(temperatureApiRecord.getCreated_at());
        TemperatureRecord record = TemperatureRecord.builder()
                .recordID(temperatureApiRecord.getId())
                .unit("C")
                .timestamp(timestamp)
                .temperature(Double.parseDouble(temperatureApiRecord.getValue()))
                .build();
        temperatureRecordRepository.save(record);
    }
}
