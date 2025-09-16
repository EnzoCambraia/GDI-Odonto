package com.example.api_gdi.dto;

import com.example.api_gdi.model.LoanEquipment;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LoanItemDTO {
    private Long equipmentId;
    private String equipmentName;
    private Integer quantity;

    //LoanEquipment to LoanItemDTO
    public LoanItemDTO(LoanEquipment loanEquipment){
        this.equipmentId = loanEquipment.getEquipment().getId();
        this.equipmentName = loanEquipment.getEquipment().getName();
        this.quantity = loanEquipment.getQuantity();
    }
}
