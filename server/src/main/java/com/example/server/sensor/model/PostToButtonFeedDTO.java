package com.example.server.sensor.model;

import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostToButtonFeedDTO {
    @Pattern(regexp = "^[0-1]$", message = "Value should be 0 or 1")
    private String value;
}
