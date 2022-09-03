package com.example.patientpig.domain.coin.presentation;

import com.example.patientpig.domain.coin.presentation.dto.CoinResponse;
import com.example.patientpig.domain.coin.presentation.dto.CreateCoinRequest;
import com.example.patientpig.domain.coin.service.CoinServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/coin")
@RequiredArgsConstructor
public class CoinController {

    private final CoinServiceImpl coinService;

    @PostMapping
    public void createCoin(@RequestBody CreateCoinRequest request) {
        coinService.createCoin(request);
    }

    @GetMapping
    public List<CoinResponse> getCoinHistory(String nickname) {
        return coinService.getCoinHistory(nickname);
    }
}
