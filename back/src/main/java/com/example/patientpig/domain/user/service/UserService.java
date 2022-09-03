package com.example.patientpig.domain.user.service;

import com.example.patientpig.domain.user.presentation.dto.UserResponse;

import java.util.List;

public interface UserService {

    void createUser(String nickname);
    Integer getPig(String nickname); // 분기 컨트롤 여기서
    void updateUser(String nickname);
    List<UserResponse> getPigRanking(); // User Pig response DTO
}