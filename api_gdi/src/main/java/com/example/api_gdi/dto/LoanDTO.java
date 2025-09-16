package com.example.api_gdi.dto;

import com.example.api_gdi.model.Loan;
import com.example.api_gdi.model.LoanStatus;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class LoanDTO {
    private Long id;
    private String studentName;
    private String studentRegistry;
    private String studentCpf;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private LocalDateTime returnDate;
    private LoanStatus status;
    private LoanUserDTO user; // DTO aninhado para o usuário
    private List<LoanItemDTO> items; // Lista de itens do empréstimo

    //Entidade completa em DTO Limpo
    public LoanDTO(Loan loan) {
        this.id = loan.getId();
        this.studentName = loan.getStudentName();
        this.studentRegistry = loan.getStudentRegistry();
        this.studentCpf = loan.getStudentCpf();
        this.startDate = loan.getStartDate();
        this.endDate = loan.getEndDate();
        this.returnDate = loan.getReturnDate();
        this.status = loan.getStatus();
        this.user = new LoanUserDTO(loan.getUser()); // Converte o usuário
        this.items = loan.getLoanEquipments().stream()
                .map(LoanItemDTO::new) // Converte cada item da lista
                .collect(Collectors.toList());
    }
}
