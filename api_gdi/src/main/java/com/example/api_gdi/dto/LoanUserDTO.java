package com.example.api_gdi.dto;

import com.example.api_gdi.model.User;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LoanUserDTO {
    private Long id;
    private String name;

    // User to DTO
    public LoanUserDTO(User user){
        this.id = user.getId();
        this.name = user.getName();
    }
}
