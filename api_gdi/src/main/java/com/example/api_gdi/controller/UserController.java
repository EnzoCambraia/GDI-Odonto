package com.example.api_gdi.controller;


import com.example.api_gdi.model.User;
import com.example.api_gdi.repository.UserRepository;
import com.example.api_gdi.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository repository;
    private final UserService userService;


    @GetMapping
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User userData){
        System.out.println(userData);
        User savedUser = repository.save(userData);
        System.out.println("Salvou" + savedUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

}
