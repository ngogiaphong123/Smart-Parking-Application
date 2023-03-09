package com.example.server.timeParser;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

public class TimeParser {

    private static final TimeParser instance = new TimeParser();
    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss'Z'");

    private TimeParser() {}

    public static TimeParser getInstance() {
        return instance;
    }

    public LocalDateTime parse(String timeString) {
        ZoneId utcZone = ZoneId.of("UTC");
        ZoneId vnZone = ZoneId.of("Asia/Ho_Chi_Minh");
        ZonedDateTime utcTime = ZonedDateTime.of(LocalDateTime.parse(timeString, formatter), utcZone);
        ZonedDateTime vnTime = utcTime.withZoneSameInstant(vnZone);
        return vnTime.toLocalDateTime();
    }
}
