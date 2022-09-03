package com.example.patientpig.domain.coin.domain.repository;

import com.example.patientpig.domain.coin.domain.Coin;
import com.example.patientpig.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CoinRepository extends JpaRepository<Coin, Long> {

    List<Coin> findAllByUserOrderByIdDesc(User user);
}