package com.example.server.api;

import com.example.server.api.recordData.ApiRecord;
import com.example.server.api.recordData.PostToButtonFeed;
import retrofit2.Call;
import retrofit2.http.*;

import java.util.Set;

public interface AdafruitApiService {
    @GET("phatnguyen1604/feeds/cambien1/data")
    Call<Set<ApiRecord>> getLightRecord(
            @Query("limit") int limit
    );
    @GET("phatnguyen1604/feeds/nutnhan1/data")
    Call<Set<ApiRecord>> getLightButtonRecord(
            @Query("limit") int limit
    );
    @Headers("X-AIO-Key:aio_bSSt82h4fqXHx2pw1u6dUYaRoibl")
    @POST("phatnguyen1604/feeds/nutnhan1/data")
    Call<Void> turnOnOffLight(@Body PostToButtonFeed data);

    @GET("phatnguyen1604/feeds/cambien2/data")
    Call<Set<ApiRecord>> getTempRecord(
            @Query("limit") int limit
    );
}
