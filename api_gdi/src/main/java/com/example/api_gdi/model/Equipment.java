package com.example.api_gdi.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

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

@Column(name="created_at", updatable = false)
@CreationTimestamp
private LocalDateTime created_at;

//Testar o Update pelo status
@Enumerated(EnumType.STRING)
private EquipmentStatus status = EquipmentStatus.getDefault();



public Equipment(String name, String category, Integer qty_total, Integer qty_available, EquipmentStatus status){
this.name = name;
this.category = category;
this.qty_total = qty_total;
this.qty_available = qty_available;
this.status = status;
}

public Equipment save(Equipment equipment){
    if (equipment.getCreated_at() == null){
        equipment.setCreated_at(LocalDateTime.now());
    }
    return equipment.save(equipment);
}

}
