package com.example.api_gdi.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity
@Table(name ="users", schema ="public")
@Data
@ToString
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private Integer registration;
    @Column(name="created_at", insertable = false, updatable = false)
    private LocalDateTime created_at;
}
