package com.example.patientpig.domain.user.domain.repository;
import com.example.patientpig.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByNickname(String nickname);
    List<User> findAllByOrderByPig();
}
