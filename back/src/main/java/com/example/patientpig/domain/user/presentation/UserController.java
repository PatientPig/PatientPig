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
    public String createUserAndGetNickname() {
        return userService.createUserAndGetNickname();
    }

    @GetMapping
    public Integer getPig(@RequestParam String nickname) {
        return userService.getPig(nickname);
    }

    @PutMapping
    public String updateUser(@RequestParam String nickname, @RequestParam(name = "new") String newNickname){
        return userService.updateUser(nickname, newNickname);
    }

    @GetMapping("/ranking")
    public List<UserResponse> getPigRanking() {
        return userService.getPigRanking();
    }
}
