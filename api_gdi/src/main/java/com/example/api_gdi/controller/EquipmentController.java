package com.example.api_gdi.controller;

import com.example.api_gdi.model.Equipment;
import com.example.api_gdi.model.EquipmentStatus;
import com.example.api_gdi.services.EquipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/equipments")

public class EquipmentController {
    @Autowired
    private EquipmentService equipmentService;

    //CREATE
    @PostMapping
    public Equipment createEquipment(@RequestBody Equipment equipment){
        if (equipment.getStatus() == null){
            equipment.setStatus(EquipmentStatus.DISPONIVEL);
        }
        Equipment savedEquipment = equipmentService.save(equipment);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEquipment).getBody();
    }

    //READ(By ID)
    @GetMapping("/{id}")
    public Equipment getEquipmentById(@PathVariable Long id) {
        return equipmentService.findById(id);
    }

    //READ(all)
    @GetMapping
    public List<Equipment> getAllEquipments(){
        return equipmentService.findAll();
    }

    // UPDATE
    @PutMapping("/{id}")
    public Equipment updateEquipment(@PathVariable Long id, @RequestBody Equipment equipmentDetails){
     return equipmentService.update(id, equipmentDetails);
    }

    //DELETE
    @DeleteMapping("/{id}")
    public void deleteEquipment(@PathVariable Long id){
        equipmentService.delete(id);
    }
}
