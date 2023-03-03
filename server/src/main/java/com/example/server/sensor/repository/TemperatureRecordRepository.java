package com.example.server.sensor.repository;

import com.example.server.sensor.model.TemperatureRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TemperatureRecordRepository extends JpaRepository<TemperatureRecord, String> {
}
