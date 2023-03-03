package com.example.server.sensor.model;

import com.example.server.sensor.repository.TemperatureRecordRepository;
import jakarta.persistence.Entity;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "temperature_sensor")
@Data
@SuperBuilder
@Component
public class TemperatureRecord extends BaseSensorRecord {
    private double temperature;
    public TemperatureRecord(String recordID, String unit, LocalDateTime timestamp, double temperature) {
        super(recordID, unit,timestamp);
        this.temperature = temperature;
    }
}
