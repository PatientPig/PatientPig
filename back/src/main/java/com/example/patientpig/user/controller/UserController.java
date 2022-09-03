package com.example.patientpig.user.controller;

import com.example.patientpig.user.domain.UserResponse;
import com.example.patientpig.user.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserServiceImpl userService;

    @PostMapping
    public void createUser(@RequestBody String nickname) {
        userService.createUser(nickname);
    }

    @GetMapping
    public Integer getPig(@RequestBody String nickname) {
        return userService.getPig(nickname);
    }

    @PutMapping
    public void updateUser(@RequestBody String nickname, String newNickname){
        userService.updateUser(nickname, newNickname);
    }

    @GetMapping
    public List<UserResponse> getPigRanking() {
        return userService.getPigRanking();
    }
}
