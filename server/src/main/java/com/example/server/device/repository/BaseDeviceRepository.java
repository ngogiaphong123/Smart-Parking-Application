package com.example.server.device.repository;

import com.example.server.device.model.BaseDevice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BaseDeviceRepository<T extends BaseDevice> extends JpaRepository<T, String> {

}
