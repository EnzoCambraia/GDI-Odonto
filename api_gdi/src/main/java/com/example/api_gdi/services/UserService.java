package com.example.api_gdi.services;

import com.example.api_gdi.model.User;
import com.example.api_gdi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class UserService {
    private final UserRepository repository;

    public List<User> getAllUsers(){
        List<User> users = repository.findAll();
        System.out.println("Teste" + users);
        return users;
    }

}
