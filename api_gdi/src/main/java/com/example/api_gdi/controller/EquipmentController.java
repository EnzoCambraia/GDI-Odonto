package com.example.api_gdi.controller;

import com.example.api_gdi.model.Equipment;
import com.example.api_gdi.services.EquipmentService;
import org.springframework.beans.factory.annotation.Autowired;
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
        return equipmentService.save(equipment);
    }

    //READ(By ID)
    @GetMapping("/{id}")
    public Equipment getEquipmentById(@PathVariable Long id) {
        return equipmentService.findById(id);
    }

    //READ(all)
    @GetMapping
    public List<Equipment> getallEquipments(){
        return equipmentService.findAll();
    }

}
