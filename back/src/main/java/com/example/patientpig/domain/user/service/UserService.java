package com.example.patientpig.domain.user.service;

import com.example.patientpig.domain.user.presentation.dto.UserResponse;

import java.util.List;

public interface UserService {
    String createUserAndGetNickname();
    Integer getPig(String nickname);
    String updateUser(String nickname, String newNickname);
    List<UserResponse> getPigRanking();
}
