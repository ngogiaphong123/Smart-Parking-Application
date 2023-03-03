package com.example.server.api;

import com.example.server.api.recordData.IsLightOn;
import com.example.server.api.recordData.TemperatureApiRecord;
import retrofit2.Call;
import retrofit2.http.*;

import java.util.Set;

public interface AdafruitApiService {
    @GET("phatnguyen1604/feeds/cambien1/data")
    Call<Set<TemperatureApiRecord>> getTemperature(
            @Query("limit") int limit
    );
    @Headers("X-AIO-Key:aio_cDJH50NvYZkFHMReXphWFSspUb6i")
    @POST("phatnguyen1604/feeds/nutnhan1/data")
    Call<Void> postToFeed(@Body IsLightOn data);
}
