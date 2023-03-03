package com.example.server.api;

import com.example.server.api.recordData.TemperatureApiRecord;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Query;

import java.util.Set;

public interface AdafruitApiService {
    @GET("phatnguyen1604/feeds/cambien1/data")
    Call<Set<TemperatureApiRecord>> getTemperature(
            @Query("limit") int limit
    );
}
