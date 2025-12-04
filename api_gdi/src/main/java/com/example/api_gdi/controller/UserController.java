package com.example.api_gdi.controller;


import com.example.api_gdi.model.User;
import com.example.api_gdi.repository.UserRepository;
import com.example.api_gdi.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@PreAuthorize("isAuthenticated()")

public class UserController {

    private final UserRepository repository;
    private final UserService userService;


    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User userData){
        System.out.println(userData);
        User savedUser = repository.save(userData);
        System.out.println("Usuário salvo! " + savedUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    @GetMapping
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable java.util.UUID id, @RequestBody User userDetails){
        return userService.update(id, userDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable java.util.UUID id){
        userService.delete(id);
    }

}
