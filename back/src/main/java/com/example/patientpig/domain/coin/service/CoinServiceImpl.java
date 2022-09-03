package com.example.patientpig.domain.coin.service;

import com.example.patientpig.domain.coin.domain.Coin;
import com.example.patientpig.domain.coin.domain.repository.CoinRepository;
import com.example.patientpig.domain.coin.presentation.dto.CoinResponse;
import com.example.patientpig.domain.coin.presentation.dto.CreateCoinRequest;
import com.example.patientpig.domain.user.domain.User;
import com.example.patientpig.domain.user.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CoinServiceImpl implements CoinService {

    private final CoinRepository coinRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public void createCoin(CreateCoinRequest request) {
        User user = userRepository.findByNickname(request.getNickname());
        coinRepository.save(
                Coin.builder()
                        .user(user)
                        .time(request.getTime())
                        .content(request.getContent())
                        .build()
        );

        user.feedPig(request.getTime());
    }

    @Override
    @Transactional(readOnly = true)
    public List<CoinResponse> getCoinHistory(String nickname) {
        User user = userRepository.findByNickname(nickname);

        return coinRepository.findAllByUserOrderById(user)
                .stream().map(CoinResponse::of)
                .collect(Collectors.toList());
    }
}
