package com.blooddonor.backend.service;

import com.blooddonor.backend.entity.Role;
import com.blooddonor.backend.entity.User;
import com.blooddonor.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<User> searchDonors(String bloodGroup, String city) {
        return userRepository.searchDonors(bloodGroup, city);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id " + id));
    }

    public User updateUser(Long id, User userDetails) {
        User user = getUserById(id);
        
        if (userDetails.getName() != null) user.setName(userDetails.getName());
        if (userDetails.getPhone() != null) user.setPhone(userDetails.getPhone());
        if (userDetails.getBloodGroup() != null) user.setBloodGroup(userDetails.getBloodGroup());
        if (userDetails.getCity() != null) user.setCity(userDetails.getCity());
        if (userDetails.getAge() != null) user.setAge(userDetails.getAge());
        if (userDetails.getGender() != null) user.setGender(userDetails.getGender());
        if (userDetails.getAvailabilityStatus() != null) user.setAvailabilityStatus(userDetails.getAvailabilityStatus());
        if (userDetails.getProfileImageUrl() != null) user.setProfileImageUrl(userDetails.getProfileImageUrl());

        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        User user = getUserById(id);
        userRepository.delete(user);
    }

    public List<User> getAllDonors() {
        return userRepository.findByRole(Role.DONOR);
    }
}
