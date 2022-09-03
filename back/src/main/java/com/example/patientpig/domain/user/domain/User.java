package com.example.patientpig.domain.user.domain;

import com.example.patientpig.global.entity.BaseTimeEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class User extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id")
    private Long id;

    private String nickname;

    private Integer pig;

    @Builder
    public User(String nickname) {
        this.nickname = nickname;
        this.pig = 0;
    }

    public void updateNickname(String nickname) {
        this.nickname = nickname;
    }

    public void feedPig(Integer feed) {
        this.pig += feed;
    }
}
