package com.example.server.sensor.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetSensorDataDTO {
    @NotNull(message = "Page cannot be null")
    public Integer page;
    @NotNull(message = "Limit cannot be null")
    public Integer limit;
}
