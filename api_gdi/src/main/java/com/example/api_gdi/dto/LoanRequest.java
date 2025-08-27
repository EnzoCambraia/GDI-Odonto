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

    @NotNull(message = "ID do usuário é obrigatório")
    private Long userId;

    @NotBlank(message = "O preenchimento do campo de nome do aluno é obrigatório")
    private String studentName;

    @NotBlank(message = "O preenchimento do campo de Matrícula do aluno é obrigatório ")
    private String studentRegistry;

    @NotBlank(message = "O preenchimento do campo de CPF do Aluno é obrigatório")
    private String studentCpf;

    private String studentPhone;

    @NotBlank(message = "O preenchimento do campo de Email do Aluno é obrigatório. Na falta de um e-mail, utilize o e-mail institucional da UnB")
    private String studentEmail;

    @NotNull
    @Future
    private LocalDateTime endDate;

    @NotEmpty
    private List<LoanItemRequest> items;
}