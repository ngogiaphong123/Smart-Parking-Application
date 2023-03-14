package com.example.server.device.service;

import com.example.server.api.AdafruitRetrofitClientAPI;
import com.example.server.api.recordData.ApiRecord;
import com.example.server.api.recordData.PostToButtonFeed;
import com.example.server.device.model.FanDevice;
import com.example.server.device.repository.FanDeviceRepository;
import com.example.server.exception.BadRequestException;
import com.example.server.timeParser.TimeParser;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import retrofit2.Call;
import retrofit2.Response;

import java.time.LocalDateTime;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class FanService {
    private final FanDeviceRepository fanDeviceRepository;
    static String feedKey = "nutnhan1";

    public String turnOnOffFan(String value) {
        PostToButtonFeed postToButton = new PostToButtonFeed(value);
        try {
            Call<ApiRecord> call = AdafruitRetrofitClientAPI.getAdafruitApi().postToAdafruitFeed(feedKey, postToButton);
            Response<ApiRecord> response = call.execute();
            if (response.isSuccessful()) {
                ApiRecord apiRecord = response.body();
                if (apiRecord != null) {
                    saveFanRecord(apiRecord);
                    return apiRecord.getValue();
                }
            }
            return "Cannot connect to Adafruit's feed";
        }
        catch (Exception e) {
            throw new BadRequestException("Error: " + e.getMessage());
        }
    }

    public String getDeviceStatus() {
        try {
            FanDevice fanDevice = fanDeviceRepository.findTopByOrderByTimestampDesc();
            if (fanDevice != null) {
                return fanDevice.getStatus();
            }
            return "Null";
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public void saveFanRecord(ApiRecord apiRecord) {
        try {
            TimeParser timeParser = TimeParser.getInstance();
            LocalDateTime timestamp = timeParser.parse(apiRecord.getCreated_at());
            FanDevice record = FanDevice.builder()
                    .deviceID(apiRecord.getId())
                    .status(apiRecord.getValue())
                    .timestamp(timestamp)
                    .build();
            fanDeviceRepository.save(record);
        } catch (Exception e) {
            throw new BadRequestException("Error: " + e.getMessage());
        }
    }
    @Scheduled(fixedRate = 2000)
    public void getDeviceStatusFromAdafruit() {
        try {
            Call<Set<ApiRecord>> call = AdafruitRetrofitClientAPI.getAdafruitApi().getRecordFromAdafruit(feedKey, 10);
            Set<ApiRecord> deviceStatus = call.execute().body();
            if (deviceStatus != null) {
                deviceStatus.forEach(this::saveFanRecord);
            }
        }
        catch (Exception e) {
            throw new BadRequestException("Error: " + e.getMessage());
        }
    }
}
