package com.blooddonor.backend.repository;

import com.blooddonor.backend.entity.Role;
import com.blooddonor.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    List<User> findByRole(Role role);

    @Query("SELECT u FROM User u WHERE u.role = 'DONOR' AND (:bloodGroup IS NULL OR u.bloodGroup = :bloodGroup) AND (:city IS NULL OR u.city LIKE %:city%)")
    List<User> searchDonors(String bloodGroup, String city);

    long countByRole(Role role);
}
