package com.example.api_gdi.model;

import com.fasterxml.jackson.annotation.JsonManagedReference; // Importação correta
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
@ToString(exclude = "loanEquipments") // Manter isto é uma boa prática para evitar loops no log
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

    // 1. FetchType removido (padrão é LAZY, que é o correto)
    // 2. Adicionado @JsonManagedReference para indicar o lado "pai" da serialização
    @OneToMany(mappedBy = "equipment")
    @JsonManagedReference("equipment-loanEquip")
    private List<LoanEquipment> loanEquipments = new ArrayList<>();

    public boolean isAvailableForLoan(int requestedQty){
        return qty_available >= requestedQty;
    }

    @PrePersist // Rodar antes de um equip ser salvo pela primeira vez
    @PreUpdate // Rodar antes de um equip ser atualizado
    public void updateStatusBasedOnQuantity(){
        if (this.qty_available <= 0){
            this.qty_available = 0;
            this.status = EquipmentStatus.INDISPONIVEL;
        } else {
            this.status = EquipmentStatus.DISPONIVEL;
        }
    }
}