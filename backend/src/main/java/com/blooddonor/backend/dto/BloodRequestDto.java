package com.blooddonor.backend.dto;

import com.blooddonor.backend.entity.Urgency;
import lombok.Data;

import java.time.LocalDate;

@Data
public class BloodRequestDto {
    private String patientName;
    private String bloodGroup;
    private Integer unitsRequired;
    private String hospitalName;
    private String city;
    private String contactNumber;
    private Urgency urgency;
    private LocalDate requiredDate;
    private Long requesterId;
}
