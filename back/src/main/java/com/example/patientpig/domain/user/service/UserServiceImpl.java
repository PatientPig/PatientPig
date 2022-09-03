package com.example.patientpig.domain.user.service;

import com.example.patientpig.domain.user.domain.User;
import com.example.patientpig.domain.user.domain.repository.UserRepository;
import com.example.patientpig.domain.user.presentation.dto.UserResponse;
import com.example.patientpig.global.utils.NicknameGenerator;
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
    private final NicknameGenerator nicknameGenerator;

    @Value("${pig.LEVEL_1}")
    private Integer LEVEL_1;

    @Value("${pig.LEVEL_2}")
    private Integer LEVEL_2;

    @Value("${pig.LEVEL_3}")
    private Integer LEVEL_3;


    @Override
    @Transactional
    public String createUserAndGetNickname() {
        User user = userRepository.save(new User());
        user.updateNickname(nicknameGenerator.getNickName(user.getId()));

        return user.getNickname();
    }

    @Override
    @Transactional(readOnly = true)
    public Integer getPig(String nickname) { // 분기 컨트롤 여기서 (테스트하며 한계값 수정)
        double pig = userRepository.findByNickname(nickname).getPig();

        if (pig < LEVEL_1) {
            return 1;
        } else if (LEVEL_1 <= pig && pig < LEVEL_2) {
            return 2;
        } else if (LEVEL_2 <= pig && pig < LEVEL_3) {
            return 3;
        }

        return 4;
    }

    @Transactional
    public String updateUser(String nickname, String newNickname) {
        User user = userRepository.findByNickname(nickname);
        user.updateNickname(newNickname);

        return user.getNickname();
    }

    @Transactional(readOnly = true)
    public List<UserResponse> getPigRanking() {
        return userRepository.findAllByOrderByPig().stream()
                .map(UserResponse::of)
                .collect(Collectors.toList());
    }
}
