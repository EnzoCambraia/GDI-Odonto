package com.example.api_gdi.services;


import com.example.api_gdi.repository.EquipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service

public class EquipmentService {
    @Autowired
    private EquipmentRepository equipmentRepository;
}
