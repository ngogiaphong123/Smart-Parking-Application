package com.example.server.sensor;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "sensor")
public class SensorRecord {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    String RecordID;
    String sensorType;
    String timestamp;
}