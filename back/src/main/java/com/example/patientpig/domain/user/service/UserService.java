package com.example.patientpig.domain.user.service;

import com.example.patientpig.domain.user.presentation.dto.UserResponse;

import java.util.List;

public interface UserService {
    String createUserAndGetNickname();

    String createRealUserNickname(String nickname);

    Integer getPig(String nickname);

    String updateUser(String nickname, String newNickname);

    List<UserResponse> getPigRanking();

    void feedPig(String nickname, Integer feed);
}
