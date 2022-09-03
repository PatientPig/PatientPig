package com.example.patientpig.coin.service;

import com.example.patientpig.coin.presentation.dto.CoinResponse;

import java.time.LocalDateTime;
import java.util.List;

public interface CoinService {

    void createCoin(CreateCoinRequest request); // create coin dto, time
    List<CoinResponse> getCoinHistory(String nickname); // Coin history response
}
