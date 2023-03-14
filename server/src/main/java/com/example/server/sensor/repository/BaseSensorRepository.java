package com.example.server.sensor.repository;

import com.example.server.sensor.model.BaseSensorRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.stereotype.Repository;
@NoRepositoryBean
public interface BaseSensorRepository<T extends BaseSensorRecord> extends JpaRepository<T, String> {}