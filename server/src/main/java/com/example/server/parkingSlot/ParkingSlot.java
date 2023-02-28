package com.example.server.parkingSlot;

import com.example.server.log.Log;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "parking_slot")
public class ParkingSlot {
    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private String parkingSlotId;
    private String slotState;
    private Integer pricePerHour;
    @OneToMany(mappedBy = "parkingSlot", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Log> logs = new HashSet<>();
}
