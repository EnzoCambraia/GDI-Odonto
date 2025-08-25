package com.example.api_gdi.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@NoArgsConstructor
public class LoanItemRequest {
    @NotNull
    private Long equipmentId;

    @Min(1)
    private Integer quantity;
}
