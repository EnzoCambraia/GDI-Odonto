package com.example.api_gdi.model;

public enum Role {
    ADMIN,
    USER,
    MANAGER;


    public String getSpringRole() {
        return "ROLE_" + this.name();
    }
}

