package com.example.api_gdi.model;

// 1. ADICIONE ESTAS DUAS IMPORTAÇÕES
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "equipment")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "loanEquipments")
// 2. ADICIONE ESTA ANOTAÇÃO NO TOPO DA CLASSE
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class Equipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;
    @Column
    private String category;
    @Column
    private Integer qty_total;
    @Column
    private Integer qty_available;

    @Column(name = "created_at", updatable = false)
    @CreationTimestamp
    private LocalDateTime created_at;

    @Enumerated(EnumType.STRING)
    private EquipmentStatus status = EquipmentStatus.getDefault();

    @OneToMany(mappedBy = "equipment")
    private List<LoanEquipment> loanEquipments = new ArrayList<>();

    public boolean isAvailableForLoan(int requestedQty){
        return qty_available >= requestedQty;
    }
}