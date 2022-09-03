package com.example.patientpig.coin.service;

import com.example.patientpig.coin.presentation.dto.CoinResponse;

import java.time.LocalDateTime;
import java.util.List;

public interface CoinService {

    void createCoin(LocalDateTime time); // create coin dto, time
    void updateCoinInformation(String content); // content, feed pig
    List<CoinResponse> getCoinHistory(String nickname); // Coin history response
}
