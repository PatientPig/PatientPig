package com.example.patientpig.domain.user.domain.repository;
import com.example.patientpig.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByNickname(String nickname);

    List<User> findAllByOrderByPigDesc();
}
