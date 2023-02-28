package com.example.server.sensor.model;

import jakarta.persistence.Entity;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "light_sensor")
public class LightRecord extends BaseSensorRecord {
    private double light;
}
