package com.example.api_gdi.model;

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
public class Equipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String name;

    private String category;
    private Integer qty_total;
    private Integer qty_available;

    @Column(name = "created_at", updatable = false)
    @CreationTimestamp
    private LocalDateTime created_at;

    //Testar o Update pelo status
    @Enumerated(EnumType.STRING)
    private EquipmentStatus status = EquipmentStatus.getDefault();

    @OneToMany(mappedBy = "equipment")
    private List<LoanEquipment> loanEquipments = new ArrayList<>();

    public boolean isAvailableForLoan(int requestedQty){
        return qty_available >= requestedQty;
    }

}
