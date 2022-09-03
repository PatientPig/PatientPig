package com.example.patientpig.domain.user.presentation;

import com.example.patientpig.domain.user.presentation.dto.UserResponse;
import com.example.patientpig.domain.user.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserServiceImpl userService;

    @PostMapping
    public void createUser(@RequestParam String nickname) {
        userService.createUser(nickname);
    }

    @GetMapping
    public Integer getPig(@RequestParam String nickname) {
        return userService.getPig(nickname);
    }

    @PutMapping
    public void updateUser(@RequestParam String nickname, @RequestParam(name = "new") String newNickname){
        userService.updateUser(nickname, newNickname);
    }

    @GetMapping("/ranking")
    public List<UserResponse> getPigRanking() {
        return userService.getPigRanking();
    }
}