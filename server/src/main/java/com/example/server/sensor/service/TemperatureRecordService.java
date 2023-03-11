package com.example.server.sensor.service;

import com.example.server.api.AdafruitRetrofitClientAPI;
import com.example.server.api.recordData.ApiRecord;
import com.example.server.exception.BadRequestException;
import com.example.server.sensor.model.LightRecord;
import com.example.server.sensor.model.TemperatureRecord;
import com.example.server.sensor.repository.TemperatureRecordRepository;
import com.example.server.timeParser.TimeParser;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import retrofit2.Call;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@RequiredArgsConstructor
@Service
public class TemperatureRecordService {
    private final TemperatureRecordRepository temperatureRecordRepository;

    public void saveTemperatureRecord(ApiRecord temperatureRecord) {
        try {
            TimeParser timeParser = TimeParser.getInstance();
            LocalDateTime timestamp = timeParser.parse(temperatureRecord.getCreated_at());
            TemperatureRecord record = TemperatureRecord.builder()
                    .recordID(temperatureRecord.getId())
                    .unit("C")
                    .timestamp(timestamp)
                    .temperature(Double.parseDouble(temperatureRecord.getValue()))
                    .build();
            temperatureRecordRepository.save(record);
        } catch (Exception e) {
            throw new BadRequestException("Error: " + e.getMessage());
        }
    }
    @Scheduled(fixedRate = 2000)
    public void getTemperatureFromAdafruit() {
        try {
            Call<Set<ApiRecord>> call = AdafruitRetrofitClientAPI.getAdafruitApi().getRecordFromAdafruit("cambien2",10);
            Set<ApiRecord> temperatureApiRecordData = call.execute().body();
            if(temperatureApiRecordData != null) {
                temperatureApiRecordData.forEach(this::saveTemperatureRecord);
            }
        } catch (Exception e) {
            throw new BadRequestException("Error: " + e.getMessage());
        }
    }

    public List<TemperatureRecord> getTemperatureRecord(Integer page, Integer limit) {
        try {
            Page<TemperatureRecord> records = temperatureRecordRepository.findAllByOrderByTimestampDesc(PageRequest.of(page, limit));
            return records.getContent();
        } catch (Exception e) {
            throw new BadRequestException("Error: " + e.getMessage());
        }
    }
}
