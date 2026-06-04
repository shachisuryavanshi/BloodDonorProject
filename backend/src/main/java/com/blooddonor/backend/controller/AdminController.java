package com.blooddonor.backend.controller;

import com.blooddonor.backend.dto.StatsDto;
import com.blooddonor.backend.entity.RequestStatus;
import com.blooddonor.backend.entity.Role;
import com.blooddonor.backend.repository.BloodRequestRepository;
import com.blooddonor.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserRepository userRepository;
    private final BloodRequestRepository bloodRequestRepository;

    @GetMapping("/stats")
    public ResponseEntity<StatsDto> getDashboardStats() {
        long totalDonors = userRepository.countByRole(Role.DONOR);
        long totalRequests = bloodRequestRepository.count();
        long availableDonors = userRepository.findAll().stream()
                .filter(u -> u.getRole() == Role.DONOR && "AVAILABLE".equals(u.getAvailabilityStatus().name()))
                .count();
        long pendingRequests = bloodRequestRepository.countByStatus(RequestStatus.PENDING);

        StatsDto stats = StatsDto.builder()
                .totalDonors(totalDonors)
                .totalRequests(totalRequests)
                .availableDonors(availableDonors)
                .pendingRequests(pendingRequests)
                .build();

        return ResponseEntity.ok(stats);
    }
}
