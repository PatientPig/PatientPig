package com.example.patientpig.domain.coin.presentation.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CreateCoinRequest {

    private String nickname;
    private Integer time;
    private String content;
}
