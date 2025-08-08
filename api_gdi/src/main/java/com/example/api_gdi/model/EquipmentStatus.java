package com.example.api_gdi.model;

public enum EquipmentStatus {
    DISPONIVEL("Disponível"),
    EMPRESTADO("Emprestado"),
    INDISPONIVEL("Indisponível");

    private final String descricao;

    EquipmentStatus(String descricao){
        this.descricao = descricao;
    }

    public static EquipmentStatus getDefault(){
        return DISPONIVEL;
    }

    public String getDescricao() {
        return descricao;
    }
}
