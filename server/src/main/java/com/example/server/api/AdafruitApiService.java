package com.example.server.api;

import com.example.server.api.recordData.ApiRecord;
import com.example.server.api.recordData.PostToButtonFeed;
import retrofit2.Call;
import retrofit2.http.*;

import java.util.Set;

public interface AdafruitApiService {
    @GET("hibecung123/feeds/{feedKey}/data")
    Call<Set<ApiRecord>> getRecordFromAdafruit(
            @Path("feedKey") String feedKey,
            @Query("limit") int limit
    );
    @Headers("X-AIO-Key:aio_tpcq72RxcF1b29pHwhDCbg1q2p9Z")
    @POST("hibecung123/feeds/{feedKey}/data")
    Call<ApiRecord> postToAdafruitFeed(
            @Path("feedKey") String feedKey,
            @Body PostToButtonFeed data
    );

}
