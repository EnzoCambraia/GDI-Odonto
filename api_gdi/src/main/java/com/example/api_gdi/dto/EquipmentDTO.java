package com.example.api_gdi.dto;

import com.example.api_gdi.model.Equipment;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Normalized;

@Data
@NoArgsConstructor
public class EquipmentDTO {
    private String name;
    private String category;
    private int qty_total;
    private int qty_available;
    private String status;


    public EquipmentDTO(Equipment equipment) {
        this.name = equipment.getName();
        this.category = equipment.getCategory();
        this.qty_total = equipment.getQty_total();
        this.qty_available = equipment.getQty_available();
        this.status = String.valueOf(equipment.getStatus());
    }
}
