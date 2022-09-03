package com.example.patientpig.user.domain;

import io.swagger.annotations.ApiModel;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
@ApiModel
public class UserResponse {
    private String nickname;
    private double pig;

    public UserResponse(User entity){
        this.nickname = entity.getNickname();
        this.pig = entity.getPig();
    }

    public static List<UserResponse> listOf(List<User> allUserList) {
        List<UserResponse> userResponseList = new ArrayList<>();

        for (User user : allUserList) {
            userResponseList.add(new UserResponse(user));
        }

        return userResponseList;
    }
}
