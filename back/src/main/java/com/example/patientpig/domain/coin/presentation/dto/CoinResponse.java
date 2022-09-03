package com.example.patientpig.domain.coin.presentation.dto;

import com.example.patientpig.domain.coin.domain.Coin;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CoinResponse {

    private String content;
    private Integer time;

    public static CoinResponse of(Coin coin) {
        return CoinResponse.builder()
                .content(coin.getContent())
                .time(coin.getTime())
                .build();
    }
}
