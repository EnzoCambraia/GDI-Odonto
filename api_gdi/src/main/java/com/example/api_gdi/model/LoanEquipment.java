package com.example.api_gdi.model;

import com.fasterxml.jackson.annotation.JsonBackReference; // Importação correta
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="loan_equipment")
public class LoanEquipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Adicionado @JsonBackReference para o lado "filho" da relação
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="loan_id", nullable = false)
    @JsonBackReference("loan-loanEquip")
    private Loan loan;

    // Adicionado @JsonBackReference para o lado "filho" da relação
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="equipment_id", nullable = false)
    @JsonBackReference("equipment-loanEquip")
    private Equipment equipment;

    @Column(nullable = false)
    private Integer quantity;
}