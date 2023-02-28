package com.example.server.iotConfig;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "iotConfig")
public class IotConfig {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private String configId;
    private String LightThreshold;
    private String TemperatureThreshold;
    private String welcomeMessage;
    private String goodbyeMessage;
    private Boolean isLightMusicOn;
    private Boolean isFanOn;
    private Boolean isWaterOn;
    private Integer intervalUpdateTime;
}
