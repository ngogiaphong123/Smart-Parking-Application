package com.example.server.device.repository;

import com.example.server.device.model.LightBulkDevice;

public interface LightBulkDeviceRepository extends BaseDeviceRepository<LightBulkDevice> {
    LightBulkDevice findTopByOrderByTimestampDesc();
}
