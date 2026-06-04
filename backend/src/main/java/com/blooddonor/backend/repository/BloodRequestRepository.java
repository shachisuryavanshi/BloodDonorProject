package com.blooddonor.backend.repository;

import com.blooddonor.backend.entity.BloodRequest;
import com.blooddonor.backend.entity.RequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BloodRequestRepository extends JpaRepository<BloodRequest, Long> {
    List<BloodRequest> findByRequesterId(Long requesterId);
    
    List<BloodRequest> findByStatus(RequestStatus status);
    
    long countByStatus(RequestStatus status);
}
