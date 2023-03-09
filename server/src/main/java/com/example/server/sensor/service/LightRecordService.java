package com.example.server.sensor.service;

import com.example.server.api.AdafruitRetrofitClientAPI;
import com.example.server.api.recordData.ApiRecord;
import com.example.server.api.recordData.PostToButtonFeed;
import com.example.server.exception.BadRequestException;
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
import retrofit2.Response;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@RequiredArgsConstructor
@Service
@Slf4j
public class LightRecordService {
    private final LightRecordRepository lightRecordRepository;

    public void saveLightRecord(ApiRecord lightRecord) {
        try {
            TimeParser timeParser = TimeParser.getInstance();
            LocalDateTime timestamp = timeParser.parse(lightRecord.getCreated_at());
            LightRecord record = LightRecord.builder()
                    .recordID(lightRecord.getId())
                    .unit("lux")
                    .timestamp(timestamp)
                    .light(Double.parseDouble(lightRecord.getValue()))
                    .build();
            lightRecordRepository.save(record);
        } catch (Exception e) {
            throw new BadRequestException("Error: " + e.getMessage());
        }
    }
    public List<LightRecord> getLightRecord(Integer page, Integer limit) {
        try {
            Page<LightRecord> lightRecords = lightRecordRepository.findAllByOrderByTimestampDesc(PageRequest.of(page, limit));
            return lightRecords.getContent();
        } catch (Exception e) {
            throw new BadRequestException("Error: " + e.getMessage());
        }
    }
    public boolean isLightOn() {
        try {
            Call<Set<ApiRecord>> call = AdafruitRetrofitClientAPI.getAdafruitApi().getLightButtonRecord(1);
            Set<ApiRecord> buttonApiRecordData = call.execute().body();
            if(buttonApiRecordData != null) {
                ApiRecord buttonRecord = buttonApiRecordData.iterator().next();
                return buttonRecord.getValue().equals("1");
            }
            return false;
        } catch (Exception e) {
            throw new BadRequestException("Error: " + e.getMessage());
        }
    }
    @Scheduled(fixedRate = 2000)
    public void getLightRecordFromAdafruit() {
        try {
            Call<Set<ApiRecord>> call = AdafruitRetrofitClientAPI.getAdafruitApi().getLightRecord(10);
            Set<ApiRecord> temperatureApiRecordData = call.execute().body();
            if(temperatureApiRecordData != null) {
                temperatureApiRecordData.forEach(this::saveLightRecord);
            }
        } catch (Exception e) {
            throw new NotFoundException("Error: " + e.getMessage());
        }
    }
    public Boolean turnOnOffLight(String value) {
        PostToButtonFeed postToLightButton = new PostToButtonFeed(value);
        try {
            Call<Void> call = AdafruitRetrofitClientAPI.getAdafruitApi().turnOnOffLight(postToLightButton);
            Response<Void> response = call.execute();
            return response.isSuccessful();
        } catch (Exception e) {
            throw new BadRequestException("Error: " + e.getMessage());
        }
    }
}
