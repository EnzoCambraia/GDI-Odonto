package com.example.api_gdi.repository;


import com.example.api_gdi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,java.util.UUID> {
    Optional<User> findByEmail(String email);

}
