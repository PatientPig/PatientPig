package com.example.patientpig.domain.coin.domain;

import com.example.patientpig.domain.user.domain.User;
import com.example.patientpig.global.entity.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "tbl_coin")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Coin extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "coin_id")
    private Long id;

    private String content;

    private Integer time;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @Builder
    public Coin(User user, Integer time, String content) {
        this.user = user;
        this.time = time;
        this.content = content;
    }
}