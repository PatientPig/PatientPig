package com.example.patientpig.global.utils;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Random;

@Component
@RequiredArgsConstructor
public class NicknameGenerator {

    private final ArrayList<String> first = new ArrayList<String>(
            Arrays.asList("행복한", "뚠뚠한", "배고픈", "귀여운", "가난한",
                    "부유한", "배부른", "졸린", "잠오는", "달리는"));

    public String getNickName(Long id) {
        return getRandomFirst() + "돼지#" + id;
    }

    public String getRandomFirst() {
        return first.get(new Random().nextInt(first.size()));
    }
}
