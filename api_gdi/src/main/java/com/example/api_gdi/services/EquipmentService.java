package com.example.api_gdi.services;


import com.example.api_gdi.model.Equipment;
import com.example.api_gdi.model.User;
import com.example.api_gdi.repository.EquipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class EquipmentService {
    @Autowired
    private EquipmentRepository equipmentRepository;

    public Equipment save(Equipment equipment) {
        return equipmentRepository.save(equipment);
    }

    public Equipment findById(Long id){
        return equipmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Equipamento não pode ser encontrado por ID: " + id) );
    }

    public List<Equipment> findAll() {
        return equipmentRepository.findAll();
    }

    public Equipment update(Long id, Equipment equipmentDetails){
        Equipment equipment = findById(id);
        equipment.setName(equipmentDetails.getName());
        equipment.setCategory(equipmentDetails.getCategory());
        equipment.setQty_total(equipmentDetails.getQty_total());
        equipment.setQty_available(equipmentDetails.getQty_available());
        equipment.setStatus(equipmentDetails.getStatus());
        return equipmentRepository.save(equipment);
    }

    public void delete(Long id){
        equipmentRepository.deleteById(id);
    }

}
