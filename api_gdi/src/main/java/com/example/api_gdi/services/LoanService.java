package com.example.api_gdi.services;

import com.example.api_gdi.dto.LoanDTO;
import com.example.api_gdi.dto.LoanItemRequest;
import com.example.api_gdi.dto.LoanRequest;
import com.example.api_gdi.model.*;
import com.example.api_gdi.repository.LoanRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.List;
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


    public Loan createLoan(LoanRequest request){
        User user = userService.findById(request.getUserId());

        //Validação dos itens
        if (request.getItems() == null || request.getItems().isEmpty()){
            throw new IllegalArgumentException("O empréstimo deve conter itens");
        }

        //Criação do empréstimo
            Loan loan = new Loan();
            loan.setUser(user);
            loan.setStudentName(request.getStudentName());
            loan.setStudentRegistry(request.getStudentRegistry());
            loan.setStudentCpf(request.getStudentCpf());
            loan.setStudentPhone(request.getStudentPhone());
            loan.setStudentEmail(request.getStudentEmail());
            loan.setStartDate(LocalDateTime.now());
            loan.setEndDate(request.getEndDate());


            //Processar cada item do empréstimo
            for (LoanItemRequest itemRequest : request.getItems()) {
                Equipment equipment = equipmentService.findById(itemRequest.getEquipmentId());

                //Validação do estoque
                if (equipment.getQty_available() < itemRequest.getQuantity()){
                    throw new IllegalArgumentException("Quantidade indisponível para: " + equipment.getName());
                }

                //Atualizar estoque
                equipment.setQty_available(equipment.getQty_available() - itemRequest.getQuantity());
                equipmentService.save(equipment);

                LoanEquipment loanEquipment = new LoanEquipment();
                loanEquipment.setEquipment(equipment);
                loanEquipment.setQuantity(itemRequest.getQuantity());
                loan.addLoanEquipment(loanEquipment);
            }
        return loanRepository.save(loan);
    }
    public Loan returnLoan(Long loanId) {
        // 1. Busca o empréstimo com itens
        Loan loan = loanRepository.findByIdWithItems(loanId)
                .orElseThrow(() -> new RuntimeException("Empréstimo não encontrado"));

        // 2. Valida se pode ser devolvido
        if (loan.getStatus() != LoanStatus.ATIVO) {
            throw new IllegalStateException("Só é possível devolver empréstimos ativos");
        }

        // 3. Devolve itens ao estoque
        for (LoanEquipment item : loan.getLoanEquipments()) {
            Equipment equipment = item.getEquipment();
            equipment.setQty_available(equipment.getQty_available() + item.getQuantity());
            equipmentService.save(equipment);
        }

        // 4. Atualiza status
        loan.setReturnDate(LocalDateTime.now());
        loan.setStatus(LoanStatus.DEVOLVIDO);

        return loanRepository.save(loan);
    }

    public List<LoanDTO> getActiveLoans() {
        List<Loan> loans = loanRepository.findByStatus(LoanStatus.ATIVO);
        return loans.stream()
                .map(LoanDTO::new)
                .collect(Collectors.toList());
    }

    public List<LoanDTO> getAllLoans(){
        List<Loan> loans = loanRepository.findAll();
        return loans.stream()
                .map(LoanDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public LoanDTO returnLoan(java.util.UUID loanId){
        Loan loan = loanRepository.findByIdWithItems(loanId)
                .orElseThrow(() -> new RuntimeException("Empréstimo com ID " + loanId + "não encontrado."));

        if (loan.getStatus() != LoanStatus.ATIVO){
            throw new IllegalStateException("Este empréstimo não pode ser devolvido pois seu status é:" + loan.getStatus());
            }
        for (LoanEquipment item : loan.getLoanEquipments()){
            Equipment equipment = item.getEquipment();
            int returnedQuantity = item.getQuantity();

            equipment.setQty_available(equipment.getQty_available() + returnedQuantity);
        }

        loan.setStatus(LoanStatus.DEVOLVIDO);
        loan.setReturnDate(LocalDateTime.now());

        Loan savedLoan = loanRepository.save(loan);

        return new LoanDTO(savedLoan);
    }

    // ... dentro da sua classe LoanService ...

    @Transactional
    public void deleteLoan(java.util.UUID loanId) {
        Loan loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new RuntimeException("Empréstimo com ID " + loanId + " não encontrado."));

        if (loan.getStatus() == LoanStatus.ATIVO) {
            throw new IllegalStateException("Não é possível excluir um empréstimo que ainda está ativo. Faça a devolução primeiro.");
        }
        
        loanRepository.delete(loan);
    }
}
