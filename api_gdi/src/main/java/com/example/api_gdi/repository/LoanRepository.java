package com.example.api_gdi.repository;

import com.example.api_gdi.model.Loan;
import com.example.api_gdi.model.LoanStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.rmi.registry.Registry;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface LoanRepository extends JpaRepository<Loan, Long> {
    //Busca de empréstimos ativos com itens

    @Query("SELECT DISTINCT l FROM Loan l LEFT JOIN FETCH l.loanEquipments WHERE l.id = :id")
    Optional<Loan> findByIdWithItems(@Param("id") Long id);

     //Listar empréstimos ativos
    List<Loan> findByIdWIthItems(@Param("id") Long id);

    //Verifica se um aluno específico tem empréstimos ativos
    boolean existsByStudentCpfAndStatus(String cpf, LoanStatus status);

    List<Loan> findByStatus(LoanStatus status);

}
