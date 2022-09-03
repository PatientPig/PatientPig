package com.example.patientpig.domain.coin.service;

import com.example.patientpig.domain.coin.presentation.dto.CoinResponse;
import com.example.patientpig.domain.coin.presentation.dto.CreateCoinRequest;

import java.util.List;

public interface CoinService {

    void createCoin(CreateCoinRequest request); // create coin dto, time
    List<CoinResponse> getCoinHistory(String nickname); // Coin history response
}
