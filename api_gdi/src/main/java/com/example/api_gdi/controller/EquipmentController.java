package com.example.api_gdi.controller;

import com.example.api_gdi.model.Equipment;
import com.example.api_gdi.services.EquipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/equipments")

public class EquipmentController {
    @Autowired
    private EquipmentService equipmentService;

    //CREATE

    @PostMapping
    public Equipment createEquip(@)
}
