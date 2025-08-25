package com.example.api_gdi.dto;

import com.example.api_gdi.dto.LoanItemRequest;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;


@Data
@NoArgsConstructor
public class LoanRequest {
    @NotBlank
    private String studentName;

    @NotBlank
    private String studentRegistry;

    @NotBlank
    private String studentCpf;

    private String studentPhone;
    private String studentEmail;

    @NotNull
    @Future
    private LocalDateTime endDate;

    @NotEmpty
    private List<LoanItemRequest> items;
}