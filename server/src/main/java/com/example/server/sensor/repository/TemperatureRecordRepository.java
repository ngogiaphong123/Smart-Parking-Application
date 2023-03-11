package com.example.server.sensor.repository;

import com.example.server.sensor.model.TemperatureRecord;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface TemperatureRecordRepository extends BaseSensorRepository<TemperatureRecord> {
    @NotNull
    Page<TemperatureRecord> findAllByOrderByTimestampDesc(Pageable pageable);
}
