package com.blooddonor.backend.controller;

import com.blooddonor.backend.dto.BloodRequestDto;
import com.blooddonor.backend.entity.BloodRequest;
import com.blooddonor.backend.entity.RequestStatus;
import com.blooddonor.backend.service.RequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
@RequiredArgsConstructor
public class RequestController {

    private final RequestService requestService;

    @PostMapping
    public ResponseEntity<BloodRequest> createRequest(@RequestBody BloodRequestDto requestDto) {
        return ResponseEntity.ok(requestService.createRequest(requestDto));
    }

    @GetMapping
    public ResponseEntity<List<BloodRequest>> getAllRequests() {
        return ResponseEntity.ok(requestService.getAllRequests());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BloodRequest>> getRequestsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(requestService.getRequestsByRequester(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BloodRequest> getRequestById(@PathVariable Long id) {
        return ResponseEntity.ok(requestService.getRequestById(id));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<BloodRequest> updateRequestStatus(
            @PathVariable Long id,
            @RequestParam RequestStatus status) {
        return ResponseEntity.ok(requestService.updateRequestStatus(id, status));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRequest(@PathVariable Long id) {
        requestService.deleteRequest(id);
        return ResponseEntity.ok().build();
    }
}
