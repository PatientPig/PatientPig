package com.example.patientpig.domain.user.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class UserResponse {
    private String nickname;
    private Integer pig;

    public UserResponse(User entity){
        this.nickname = entity.getNickname();
        this.pig = entity.getPig();
    }

    public static UserResponse of(User user) {
        return UserResponse.builder()
                .nickname(user.getNickname())
                .pig(user.getPig())
                .build();
    }
}
