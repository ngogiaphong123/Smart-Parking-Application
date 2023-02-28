package com.example.server.log;

import com.example.server.parkingSlot.ParkingSlot;
import com.example.server.vehicles.Vehicle;
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
@Entity(name = "log")
public class Log {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private String logId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parking_slot_id")
    private ParkingSlot parkingSlot;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    private LocalDateTime parkingTime;
    private LocalDateTime leavingTime;
    private String status;
    private Integer totalPrice;

}
