package com.example.patientpig.user.service;

import com.example.patientpig.user.domain.User;
import com.example.patientpig.user.domain.UserResponse;
import com.example.patientpig.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserResponse userResponse;

    @Override
    @Transactional
    public void createUser(String nickname){
        User user = new User(nickname);
        userRepository.save(user);
    };

    @Override
    @Transactional
    public Integer getPig(String nickname){ // 분기 컨트롤 여기서 (테스트하며 한계값 수정)
        User user = userRepository.findByNickname(nickname);
        double pig = user.getPig();

        Integer LEVEL_1 = 10000;
        Integer LEVEL_2 = 20000;
        Integer LEVEL_3 = 30000;
        if(pig<LEVEL_1) {
            return 1;
        } else if(pig>=LEVEL_1 && pig<LEVEL_2) {
            return 2;
        } else if(pig>=LEVEL_2 && pig<LEVEL_3) {
            return 3;
        }
        return 4;
    };

    public void updateUser(String nickname, String newNickname){
        User user = userRepository.findByNickname(nickname);
        user.updateNickname(newNickname);
    };

    public List<UserResponse> getPigRanking(){
        List<User> allUserList = userRepository.findAll();
        List<UserResponse> userResponseList = UserResponse.listOf(allUserList);
        List<UserResponse> sortedUserList = userResponseList.stream().sorted().collect(Collectors.toList());
        return sortedUserList;
    }; // User Pig response DTO
}
