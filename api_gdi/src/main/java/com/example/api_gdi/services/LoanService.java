package com.example.api_gdi.services;

import com.example.api_gdi.dto.LoanDTO;
import com.example.api_gdi.dto.LoanItemRequest;
import com.example.api_gdi.dto.LoanRequest;
import com.example.api_gdi.model.*;
import com.example.api_gdi.repository.LoanRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class LoanService {
    private final LoanRepository loanRepository;
    private final EquipmentService equipmentService;
    private final UserService userService;


    public LoanService(LoanRepository loanRepository, EquipmentService equipmentService, UserService userService) {
        this.loanRepository = loanRepository;
        this.equipmentService = equipmentService;
        this.userService = userService;
    }

    public LoanDTO createLoan(LoanRequest request) {
        User user = userService.findById(request.getUserId());

        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new IllegalArgumentException("O empréstimo deve conter itens");
        }

        Loan loan = new Loan();
        loan.setUser(user);
        loan.setStudentName(request.getStudentName());
        loan.setStudentRegistry(request.getStudentRegistry());
        loan.setStudentCpf(request.getStudentCpf());
        loan.setStudentPhone(request.getStudentPhone());
        loan.setStudentEmail(request.getStudentEmail());
        loan.setStartDate(LocalDateTime.now());
        loan.setEndDate(request.getEndDate());
        loan.setStatus(LoanStatus.ATIVO);

        for (LoanItemRequest itemRequest : request.getItems()) {
            Equipment equipment = equipmentService.findById(itemRequest.getEquipmentId());

            if (equipment.getQty_available() < itemRequest.getQuantity()) {
                throw new IllegalArgumentException("Quantidade indisponível para: " + equipment.getName());
            }

            equipment.setQty_available(equipment.getQty_available() - itemRequest.getQuantity());


            LoanEquipment loanEquipment = new LoanEquipment();
            loanEquipment.setEquipment(equipment);
            loanEquipment.setQuantity(itemRequest.getQuantity());
            loan.addLoanEquipment(loanEquipment);
        }

        Loan savedLoan = loanRepository.save(loan);
        return new LoanDTO(savedLoan);
    }

    public LoanDTO returnLoan(UUID loanId) {
        Loan loan = loanRepository.findByIdWithItems(loanId)
                .orElseThrow(() -> new RuntimeException("Empréstimo com ID " + loanId + " não encontrado."));

        if (loan.getStatus() != LoanStatus.ATIVO) {
            throw new IllegalStateException("Este empréstimo não pode ser devolvido pois seu status é: " + loan.getStatus());
        }

        for (LoanEquipment item : loan.getLoanEquipments()) {
            Equipment equipment = item.getEquipment();
            int returnedQuantity = item.getQuantity();

            equipment.setQty_available(equipment.getQty_available() + returnedQuantity);

            equipmentService.save(equipment);
        }

        loan.setStatus(LoanStatus.DEVOLVIDO);
        loan.setReturnDate(LocalDateTime.now());

        Loan savedLoan = loanRepository.save(loan);
        return new LoanDTO(savedLoan);
    }

    public List<LoanDTO> getActiveLoans() {
        List<Loan> loans = loanRepository.findByStatus(LoanStatus.ATIVO);
        return loans.stream()
                .map(LoanDTO::new)
                .collect(Collectors.toList());
    }


    public List<LoanDTO> getAllLoans() {
        List<Loan> loans = loanRepository.findAll();
        return loans.stream()
                .map(LoanDTO::new)
                .collect(Collectors.toList());
    }


    public void deleteLoan(UUID loanId) {
        Loan loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new RuntimeException("Empréstimo com ID " + loanId + " não encontrado."));

        if (loan.getStatus() == LoanStatus.ATIVO) {
            throw new IllegalStateException("Não é possível excluir um empréstimo que ainda está ativo. Faça a devolução primeiro.");
        }

        loanRepository.delete(loan);
    }
}