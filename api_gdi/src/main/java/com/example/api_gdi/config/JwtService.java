package com.example.api_gdi.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;
import java.util.function.Function;

@Slf4j
@Service
public class JwtService {

    @Value("${supabase.jwt.secret}")
    private String jwtSecret;

    /**
     * Extrai o email do token JWT do Supabase
     */
    public String extractEmail(String token) {
        try {
            String email = extractClaim(token, claims -> claims.get("email", String.class));
            log.debug("Email extraído do token: {}", email);
            return email;
        } catch (Exception e) {
            log.error("Erro ao extrair email do token: {}", e.getMessage());
            return null;
        }
    }

    /**
     * Extrai qualquer claim do token
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Verifica se o token é válido
     */
    public boolean isTokenValid(String token, UserDetails userDetails) {
        try {
            final String email = extractEmail(token);
            boolean emailMatches = email != null && email.equals(userDetails.getUsername());
            boolean notExpired = !isTokenExpired(token);

            log.debug("Token validation - Email matches: {}, Not expired: {}", emailMatches, notExpired);

            return emailMatches && notExpired;
        } catch (Exception e) {
            log.error("Erro na validação do token: {}", e.getMessage());
            return false;
        }
    }

    /**
     * Extrai todos os claims do token
     */
    private Claims extractAllClaims(String token) {
        try {
            return Jwts
                    .parserBuilder()
                    .setSigningKey(getSignInKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            log.error("Erro ao extrair claims do token: {} - Token: {}...",
                    e.getMessage(),
                    token.length() > 20 ? token.substring(0, 20) : token);
            throw e;
        }
    }

    /**
     * Obtém a chave de assinatura
     */
    private SecretKey getSignInKey() {
        try {
            log.debug("Processando JWT Secret (primeiros 10 chars): {}...", jwtSecret.substring(0, Math.min(10, jwtSecret.length())));

            // PASSO CRÍTICO: Converte a string da chave secreta em bytes usando o padrão UTF-8.
            // Isto garante que não haja nenhuma decodificação.
            byte[] keyBytes = jwtSecret.getBytes(java.nio.charset.StandardCharsets.UTF_8);

            log.info("Tamanho da chave de assinatura a ser usada (em bytes): {}", keyBytes.length);

            // Cria a chave de assinatura HMAC-SHA para o algoritmo HS256.
            return Keys.hmacShaKeyFor(keyBytes);

        } catch (Exception e) {
            log.error("Erro fatal ao criar a chave de assinatura JWT: {}", e.getMessage());
            throw new RuntimeException("Erro ao configurar a chave de assinatura JWT", e);
        }
    }

    /**
     * Verifica se o token está expirado
     */
    private boolean isTokenExpired(String token) {
        try {
            Date expiration = extractExpiration(token);
            boolean expired = expiration.before(new Date());
            log.debug("Token expiration check - Expires at: {}, Is expired: {}", expiration, expired);
            return expired;
        } catch (Exception e) {
            log.error("Erro ao verificar expiração do token: {}", e.getMessage());
            return true;
        }
    }

    /**
     * Extrai a data de expiração do token
     */
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * Extrai o subject (user ID) do token
     */
    public String extractSubject(String token) {
        return extractClaim(token, Claims::getSubject);
    }
}