package com.example.api_gdi.controller;

import com.example.api_gdi.dto.LoanDTO;
import com.example.api_gdi.dto.LoanRequest;
import com.example.api_gdi.model.Loan;
import com.example.api_gdi.services.LoanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/loans")
@RequiredArgsConstructor
public class LoanController {
    private final LoanService loanService;

    @PostMapping
    public ResponseEntity<Loan> createLoan(@RequestBody LoanRequest request) {
        Loan loan = loanService.createLoan(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(loan);
    }

    @PutMapping("/{id}/devolver")
    public ResponseEntity<Loan> returnLoan(@PathVariable Long id) {
        Loan loan = loanService.returnLoan(id);
        return ResponseEntity.ok(loan);
    }

    @GetMapping("/ativos")
    public ResponseEntity<List<LoanDTO>> getActiveLoans() { // Retorna List<LoanDTO>
        return ResponseEntity.ok(loanService.getActiveLoans());
    }
}
