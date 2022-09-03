package com.example.patientpig.user.service;

import com.example.patientpig.user.domain.UserResponse;

import java.util.List;

public interface UserService {
    void createUser(String nickname);
    Integer getPig(String nickname); // 분기 컨트롤 여기서
    void updateUser(String nickname, String newNickname);
    List<UserResponse> getPigRanking(); // User Pig response DTO
}
