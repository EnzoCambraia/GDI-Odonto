package com.example.api_gdi.services;

import com.example.api_gdi.dto.LoanItemRequest;
import com.example.api_gdi.dto.LoanRequest;
import com.example.api_gdi.model.Equipment;
import com.example.api_gdi.model.Loan;
import com.example.api_gdi.repository.LoanRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import com.example.api_gdi.model.LoanEquipment;
import com.example.api_gdi.model.LoanStatus;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class LoanService {
    private final LoanRepository loanRepository;
    private final EquipmentService equipmentService;

    public LoanService(LoanRepository loanRepository, EquipmentService equipmentService) {
        this.loanRepository = loanRepository;
        this.equipmentService = equipmentService;
    }


    public Loan createLoan(LoanRequest request){
        if (request.getItems() == null || request.getItems().isEmpty()){
            throw new IllegalArgumentException("O empréstimo deve conter itens");
        }

        //Criação do empréstimo
            Loan loan = new Loan();
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

    public List<Loan> getActiveLoans(){
        return loanRepository.findByStatus(LoanStatus.ATIVO);
    }
}
