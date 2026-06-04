package com.blooddonor.backend.service;

import com.blooddonor.backend.dto.BloodRequestDto;
import com.blooddonor.backend.entity.BloodRequest;
import com.blooddonor.backend.entity.RequestStatus;
import com.blooddonor.backend.entity.User;
import com.blooddonor.backend.repository.BloodRequestRepository;
import com.blooddonor.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RequestService {

    private final BloodRequestRepository bloodRequestRepository;
    private final UserRepository userRepository;

    public BloodRequest createRequest(BloodRequestDto dto) {
        User requester = userRepository.findById(dto.getRequesterId())
                .orElseThrow(() -> new RuntimeException("Requester not found"));

        BloodRequest request = BloodRequest.builder()
                .patientName(dto.getPatientName())
                .bloodGroup(dto.getBloodGroup())
                .unitsRequired(dto.getUnitsRequired())
                .hospitalName(dto.getHospitalName())
                .city(dto.getCity())
                .contactNumber(dto.getContactNumber())
                .urgency(dto.getUrgency())
                .requiredDate(dto.getRequiredDate())
                .status(RequestStatus.PENDING)
                .requester(requester)
                .build();

        return bloodRequestRepository.save(request);
    }

    public List<BloodRequest> getAllRequests() {
        return bloodRequestRepository.findAll();
    }

    public List<BloodRequest> getRequestsByRequester(Long requesterId) {
        return bloodRequestRepository.findByRequesterId(requesterId);
    }

    public BloodRequest getRequestById(Long id) {
        return bloodRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));
    }

    public BloodRequest updateRequestStatus(Long id, RequestStatus status) {
        BloodRequest request = getRequestById(id);
        request.setStatus(status);
        return bloodRequestRepository.save(request);
    }

    public void deleteRequest(Long id) {
        bloodRequestRepository.deleteById(id);
    }
}
