package com.example.server.api;
import com.example.server.api.recordData.ApiRecord;
import com.example.server.sensor.service.LightRecordService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import retrofit2.Call;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

import java.util.Set;
@Component
@Slf4j
@RequiredArgsConstructor
public class AdafruitRetrofitClientAPI {
    private final LightRecordService lightRecordService;
    private static final String BASE_URL = "https://io.adafruit.com/api/v2/";

    private static Retrofit retrofit = null;
    private final Logger logger = org.slf4j.LoggerFactory.getLogger(AdafruitRetrofitClientAPI.class);
    private static Retrofit getRetrofitInstance() {
        if (retrofit == null) {
            retrofit = new Retrofit.Builder()
                    .baseUrl(BASE_URL)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();
        }
        return retrofit;
    }

    public static AdafruitApiService getAdafruitApi() {
        return getRetrofitInstance().create(AdafruitApiService.class);
    }

}
