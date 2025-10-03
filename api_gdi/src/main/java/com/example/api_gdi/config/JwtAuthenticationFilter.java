package com.example.api_gdi.config;

import com.example.api_gdi.service.security.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j; // ✨ Importe o Slf4j
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
@Slf4j // ✨ Adicione esta anotação para usar o 'log'
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        log.info(">>> INICIANDO JWT AUTH FILTER PARA A ROTA: {} {}", request.getMethod(), request.getRequestURI());

        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            log.warn("!!! Cabeçalho Authorization não encontrado ou inválido. Prosseguindo sem autenticação.");
            filterChain.doFilter(request, response);
            return;
        }

        jwt = authHeader.substring(7);
        log.info(">>> Token JWT encontrado no cabeçalho.");

        try {
            userEmail = jwtService.extractUsername(jwt);
            log.info(">>> E-mail extraído do token: {}", userEmail);

            if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                log.info("--- Usuário não autenticado no contexto. Iniciando validação... ---");

                UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
                log.info("--- Usuário encontrado no banco de dados: {} ---", userDetails.getUsername());

                if (jwtService.isTokenValid(jwt, userDetails)) {
                    log.info("--- TOKEN É VÁLIDO. Criando autenticação... ---");
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );
                    authToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    log.info(">>> USUÁRIO '{}' AUTENTICADO COM SUCESSO E CONTEXTO ATUALIZADO.", userEmail);
                } else {
                    log.warn("!!! VALIDAÇÃO DO TOKEN FALHOU. (isTokenValid retornou false)");
                }
            } else {
                log.info("--- Usuário já estava autenticado no contexto. Ignorando validação. ---");
            }
        } catch (Exception e) {
            log.error("!!! OCORREU UMA EXCEÇÃO DURANTE O PROCESSAMENTO DO TOKEN: {}", e.getMessage());
        }

        filterChain.doFilter(request, response);
        log.info("<<< FINALIZANDO JWT AUTH FILTER PARA A ROTA: {} {}", request.getMethod(), request.getRequestURI());
    }
}