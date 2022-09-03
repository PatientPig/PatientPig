package com.example.patientpig.domain.user.service;

import com.example.patientpig.domain.user.domain.User;
import com.example.patientpig.domain.user.domain.repository.UserRepository;
import com.example.patientpig.domain.user.presentation.dto.UserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Value("${pig.LEVEL_1}")
    private Integer LEVEL_1;

    @Value("${pig.LEVEL_2}")
    private Integer LEVEL_2;

    @Value("${pig.LEVEL_3}")
    private Integer LEVEL_3;


    @Override
    @Transactional
    public void createUser(String nickname) {
        userRepository.save(
                User.builder()
                        .nickname(nickname)
                        .build()
        );
    }

    ;

    @Override
    @Transactional(readOnly = true)
    public Integer getPig(String nickname) { // 분기 컨트롤 여기서 (테스트하며 한계값 수정)
        double pig = userRepository.findByNickname(nickname).getPig();

        return pig;
    }

    @Transactional
    public void updateUser(String nickname, String newNickname) {
        User user = userRepository.findByNickname(nickname);
        user.updateNickname(newNickname);
    }

    @Transactional(readOnly = true)
    public List<UserResponse> getPigRanking() {
        return userRepository.findAllByOrderByPig().stream()
                .map(UserResponse::of)
                .collect(Collectors.toList());
    }
}
