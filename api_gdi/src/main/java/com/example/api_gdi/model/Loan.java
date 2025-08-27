package com.example.api_gdi.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "loans")
@Data
@NoArgsConstructor
public class Loan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String studentName;

    @Column(nullable = false)
    private String studentRegistry;

    @Column(nullable = false)
    private String studentCpf;

    @Column(nullable = false)
    private String studentPhone;

    @Column(nullable = false)
    private String studentEmail;

    @Column(nullable = false)
    private LocalDateTime startDate;

    @Column
    private LocalDateTime endDate;

    private LocalDateTime returnDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LoanStatus status = LoanStatus.ATIVO;


    @OneToMany(mappedBy = "loan", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LoanEquipment> loanEquipments = new ArrayList<>();

    public void addLoanEquipment(LoanEquipment loanEquipment){
        loanEquipments.add(loanEquipment);
        loanEquipment.setLoan(this);
    }

}
