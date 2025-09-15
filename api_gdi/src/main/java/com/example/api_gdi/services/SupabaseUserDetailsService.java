package com.example.api_gdi.service.security;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Slf4j
@Service
public class SupabaseUserDetailsService implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        log.debug("Loading user details for email: {}", email);

        if (email == null || email.trim().isEmpty()) {
            log.error("Email is null or empty");
            throw new UsernameNotFoundException("Email cannot be null or empty");
        }

        // Aqui você pode:
        // 1. Buscar o usuário no seu banco de dados local usando o email
        // 2. Ou simplesmente criar um UserDetails com as authorities padrão
        // 3. Ou fazer uma consulta ao Supabase para obter mais informações do usuário

        try {
            // Para fins de teste, criamos um usuário simples
            // Em produção, você deve buscar do banco de dados
            UserDetails userDetails = User.builder()
                    .username(email)
                    .password("") // Não precisamos de senha para JWT
                    .authorities(Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")))
                    .accountExpired(false)
                    .accountLocked(false)
                    .credentialsExpired(false)
                    .disabled(false)
                    .build();

            log.debug("User details created successfully for: {}", email);
            return userDetails;

        } catch (Exception e) {
            log.error("Error creating user details for email: {}, Error: {}", email, e.getMessage());
            throw new UsernameNotFoundException("Could not create user details for: " + email, e);
        }
    }

    // Método alternativo se você quiser buscar do banco de dados
    /*
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        log.debug("Loading user details for email: {}", email);

        // Buscar usuário no banco
        Optional<Usuario> usuario = userRepository.findByEmail(email);

        if (usuario.isEmpty()) {
            log.error("User not found with email: {}", email);
            throw new UsernameNotFoundException("User not found: " + email);
        }

        Usuario user = usuario.get();

        return User.builder()
                .username(user.getEmail())
                .password("") // Não precisamos de senha para JWT
                .authorities(user.getRoles().stream()
                    .map(role -> new SimpleGrantedAuthority("ROLE_" + role.getName().toUpperCase()))
                    .collect(Collectors.toList()))
                .build();
    }
    */
}