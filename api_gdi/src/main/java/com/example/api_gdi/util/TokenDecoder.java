package com.example.api_gdi.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Map;

@Slf4j
@Component
public class TokenDecoder {

    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * Decodifica o header do JWT para ver informações de assinatura
     */
    public void decodeTokenHeader(String token) {
        try {
            String[] chunks = token.split("\\.");

            if (chunks.length >= 2) {
                // Decodificar header
                String headerJson = new String(Base64.getUrlDecoder().decode(chunks[0]));
                Map header = objectMapper.readValue(headerJson, Map.class);
                log.info("JWT Header: {}", header);

                // Decodificar payload
                String payloadJson = new String(Base64.getUrlDecoder().decode(chunks[1]));
                Map payload = objectMapper.readValue(payloadJson, Map.class);
                log.info("JWT Payload: {}", payload);

                // Informações úteis
                log.info("Algoritmo: {}", header.get("alg"));
                log.info("Tipo: {}", header.get("typ"));
                log.info("Issuer: {}", payload.get("iss"));
                log.info("Email: {}", payload.get("email"));
                log.info("Expira em: {}", new java.util.Date(((Number)payload.get("exp")).longValue() * 1000));
            }
        } catch (Exception e) {
            log.error("Erro ao decodificar token: {}", e.getMessage());
        }
    }
}