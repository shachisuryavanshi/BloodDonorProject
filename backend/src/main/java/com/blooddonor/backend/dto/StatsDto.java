package com.blooddonor.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StatsDto {
    private long totalDonors;
    private long totalRequests;
    private long availableDonors;
    private long pendingRequests;
}
