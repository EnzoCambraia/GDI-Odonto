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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "student_name",nullable = false)
    private String studentName;

    @Column(name = "student_registry",nullable = false)
    private String studentRegistry;

    @Column(name = "student_cpf",nullable = false)
    private String studentCpf;

    @Column(name = "student_phone",nullable = false)
    private String studentPhone;

    @Column(name = "student_email",nullable = false)
    private String studentEmail;

    @Column(name = "start_date",nullable = false)
    private LocalDateTime startDate;

    @Column(name = "end_date")
    private LocalDateTime endDate;

    @Column(name = "return_date")
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
