package com.example.server.sensor.service;

import com.example.server.api.AdafruitRetrofitClientAPI;
import com.example.server.api.recordData.ApiRecord;
import com.example.server.api.recordData.PostToButtonFeed;
import com.example.server.exception.BadRequestException;
import org.springframework.stereotype.Service;
import retrofit2.Call;
import retrofit2.Response;

import java.util.Set;

@Service
public class ButtonFeedService {
    public String turnOnOffDevice(String value, String feedKey) {
        PostToButtonFeed postToButton = new PostToButtonFeed(value);
        try {
            Call<Void> call = AdafruitRetrofitClientAPI.getAdafruitApi().postToAdafruitFeed(feedKey, postToButton);
            Response<Void> response = call.execute();
            if (response.isSuccessful()) {
                // string template
                return String.format("Turn on/off %s successfully", feedKey);
            } else {
                return String.format("Turn on/off %s failed (cannot connect to Adafruit's feed)", feedKey);
            }
        } catch (Exception e) {
            throw new BadRequestException("Error: " + e.getMessage());
        }
    }

    public String getButtonStatus(String feedKey) {
        try {
            Call<Set<ApiRecord>> call = AdafruitRetrofitClientAPI.getAdafruitApi().getRecordFromAdafruit(feedKey, 1);
            Set<ApiRecord> buttonApiRecordData = call.execute().body();
            if (buttonApiRecordData != null) {
                ApiRecord buttonRecord = buttonApiRecordData.iterator().next();
                return buttonRecord.getValue();
            }
            return "Cannot connect to Adafruit's feed";
        } catch (Exception e) {
            throw new BadRequestException("Error: " + e.getMessage());
        }
    }
}
