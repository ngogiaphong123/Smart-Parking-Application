package com.example.server.api.recordData;

import lombok.*;

//    "id": "0F84BMD7CFMVEGHW4DR2YWYPQ7",
//    "value": "32.2",
//    "feed_id": 2449973,
//    "feed_key": "cambien1",
//    "created_at": "2023-02-24T07:29:39Z",
//    "created_epoch": 1677223779,
//    "expiration": "2023-03-26T06:29:39Z"
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TemperatureApiRecord {
    private String id;
    private String value;
    private String feed_id;
    private String feed_key;
    private String created_at;
    private String created_epoch;
    private String expiration;
}
