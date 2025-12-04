package com.example.api_gdi.controller;

import com.example.api_gdi.dto.LoanDTO;
import com.example.api_gdi.dto.LoanRequest;
import com.example.api_gdi.model.Loan;
import com.example.api_gdi.services.LoanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/loans")
@RequiredArgsConstructor
@PreAuthorize("isAuthenticated()")
public class LoanController {
    private final LoanService loanService;

    @PostMapping
    public ResponseEntity<LoanDTO> createLoan(@RequestBody LoanRequest request) {
        LoanDTO newLoan = loanService.createLoan(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(newLoan);
    }

    @PutMapping("/{id}/returnLoan")
    public ResponseEntity<LoanDTO> returnLoan(@PathVariable java.util.UUID id) {
        LoanDTO returnedLoan = loanService.returnLoan(id);
        return ResponseEntity.ok(returnedLoan);
    }

    @GetMapping("/ativos")
    public ResponseEntity<List<LoanDTO>> getActiveLoans() { // Retorna List<LoanDTO>
        return ResponseEntity.ok(loanService.getActiveLoans());
    }

    @GetMapping
    public ResponseEntity<List<LoanDTO>> getAllLoans(){
        List<LoanDTO> allLoans = loanService.getAllLoans();
        return ResponseEntity.ok(allLoans);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLoan(@PathVariable java.util.UUID id) {
        loanService.deleteLoan(id);
        return ResponseEntity.noContent().build();
    }
}
