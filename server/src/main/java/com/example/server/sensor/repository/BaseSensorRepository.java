package com.example.server.sensor.repository;

import com.example.server.sensor.model.BaseSensorRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BaseSensorRepository extends JpaRepository<BaseSensorRecord, String> {
}
