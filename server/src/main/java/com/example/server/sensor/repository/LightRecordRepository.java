package com.example.server.sensor.repository;

import com.example.server.sensor.model.BaseSensorRecord;
import com.example.server.sensor.model.LightRecord;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


@Repository
public interface LightRecordRepository extends BaseSensorRepository<LightRecord> {
    // pagination the newest
    @NotNull
    Page<LightRecord> findAllByOrderByTimestampDesc(Pageable pageable);
}
