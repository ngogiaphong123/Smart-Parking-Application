package com.example.server.sensor.model;

import jakarta.persistence.Entity;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "temperature_sensor")
@Data
public class TemperatureRecord extends BaseSensorRecord {
    private double temperature;
}
