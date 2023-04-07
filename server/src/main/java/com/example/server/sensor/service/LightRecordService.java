package com.example.server.sensor.service;

import com.example.server.api.AdafruitRetrofitClientAPI;
import com.example.server.api.recordData.ApiRecord;
import com.example.server.exception.NotFoundException;
import com.example.server.sensor.model.LightRecord;
import com.example.server.sensor.repository.LightRecordRepository;
import com.example.server.timeParser.TimeParser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
public class LightRecordService {
    private final LightRecordRepository lightRecordRepository;
    static String feedKey = "cambienanhsang";

    public void saveLightRecord(ApiRecord lightRecord) {
        TimeParser timeParser = TimeParser.getInstance();
        LocalDateTime timestamp = timeParser.parse(lightRecord.getCreated_at());
        LightRecord record = LightRecord.builder()
                .recordID(lightRecord.getId())
                .unit("lux")
                .timestamp(timestamp)
                .light(Double.parseDouble(lightRecord.getValue()))
                .build();
        lightRecordRepository.save(record);
    }

    public List<LightRecord> getLightRecord(Integer page, Integer limit) {
        Page<LightRecord> lightRecords = lightRecordRepository.findAllByOrderByTimestampDesc(PageRequest.of(page, limit));
        return lightRecords.getContent();
    }

    @Scheduled(fixedRate = 2000)
    public void getLightRecordFromAdafruit() {
        try {
            Call<Set<ApiRecord>> call = AdafruitRetrofitClientAPI.getAdafruitApi().getRecordFromAdafruit(feedKey, 10);
            Set<ApiRecord> lightApiRecordData = call.execute().body();
            if (lightApiRecordData != null) {
                lightApiRecordData.forEach(this::saveLightRecord);
            }
        } catch (Exception e) {
            throw new NotFoundException("Error: " + e.getMessage());
        }
    }
}
