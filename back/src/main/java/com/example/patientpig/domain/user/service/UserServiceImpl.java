package com.example.patientpig.domain.user.service;

import com.example.patientpig.domain.user.domain.User;
import com.example.patientpig.domain.user.domain.repository.UserRepository;
import com.example.patientpig.domain.user.facade.UserFacade;
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
    private final UserFacade userFacade;
    private final NicknameGenerator nicknameGenerator;

    @Override
    @Transactional
    public String createUserAndGetNickname() {
        User user = userRepository.save(new User());
        user.updateNickname(nicknameGenerator.getNickName(user.getId()));

        return user.getNickname();
    }

    @Override
    @Transactional(readOnly = true)
    public Integer getPig(String nickname) {
        return userFacade.findByNickname(nickname).getPig();
    }

    @Transactional
    public String updateUser(String nickname, String newNickname) {
        User user = userFacade.findByNickname(nickname);
        user.updateNickname(newNickname);

        return user.getNickname();
    }

    @Transactional(readOnly = true)
    public List<UserResponse> getPigRanking() {
        return userRepository.findAllByOrderByPigDesc().stream()
                .map(UserResponse::of)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void feedPig(String nickname, Integer feed) {
        User user = userFacade.findByNickname(nickname);
        user.feedPig(feed);
    }
}
