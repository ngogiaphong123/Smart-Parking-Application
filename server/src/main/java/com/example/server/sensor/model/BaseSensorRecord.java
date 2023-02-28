package com.example.server.sensor.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Entity(name = "sensor")
public class BaseSensorRecord {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    String RecordID;
    String unit;
    LocalDateTime timestamp;
}