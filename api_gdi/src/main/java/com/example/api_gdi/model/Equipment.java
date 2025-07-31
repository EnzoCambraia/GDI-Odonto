package com.example.api_gdi.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity
@Table(name = "equipment")
@Data
@ToString
public class Equipment {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

private String name;
private String category;
private Integer qty_total;
private Integer qty_available;

@Column(name="created_at", insertable = false, updatable = false)
private LocalDateTime created_at;
//Criar Status do equipamento?

public Equipment(String name, String category, Integer qty_total, Integer qty_available){
    this.name = name;
    this.category = category;
    this.qty_total = qty_total;
    this.qty_available = qty_available;
}
}
