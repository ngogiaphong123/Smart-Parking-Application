package com.example.server.iotConfig;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IotConfigRepository extends JpaRepository<IotConfig, String> {
}
