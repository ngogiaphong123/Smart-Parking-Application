package com.example.server.sensor.model;

import com.example.server.sensor.model.BaseSensorRecord;
import jakarta.persistence.Entity;
import lombok.*;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Entity(name = "water_tank_sensor")
public class WaterTankRecord extends BaseSensorRecord {
    private double waterTankCapacity;
}
