package com.example.server.sensor.model;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ButtonFeed {
    @NotNull(message = "Feed key is required")
    private String feedKey;
}
