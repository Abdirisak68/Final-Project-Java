package groupd.backend.Config;

import groupd.backend.Security.JwtFilter;
import groupd.backend.Security.JwtUtils;
import groupd.backend.Security.customAuthEntry;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.context.RequestAttributeSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtUtils jwtUtils;
    private final customAuthEntry customAuthEntry;

    @Bean
    public SecurityContextRepository securityContextRepository() {
        return new RequestAttributeSecurityContextRepository();
    }

    @Bean
    public JwtFilter jwtFilter(SecurityContextRepository securityContextRepository) {
        return new JwtFilter(jwtUtils, securityContextRepository);
    }

    // Bean-ka CORS ee loo baahan yahay
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173")); // URL-ka React
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type", "Cache-Control"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtFilter jwtFilter, SecurityContextRepository securityContextRepository) throws Exception {
//        http.csrf(csrf -> csrf.disable()).sessionManagement(session -> session
//                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//                .securityContext(context -> context
//                        .securityContextRepository(securityContextRepository))
//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers("/uploads/**", "/api/auth/**").permitAll()
//                        .requestMatchers(HttpMethod.GET, "/api/destinations", "/api/destinations/**").permitAll()
//                        .requestMatchers(HttpMethod.GET, "/api/packages", "/api/packages/**").permitAll()
//                        .anyRequest().authenticated()
//
//                ).exceptionHandling(ex ->
//                        ex.authenticationEntryPoint(customAuthEntry)).addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
//
//        return http.build();
//    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtFilter jwtFilter, SecurityContextRepository securityContextRepository) throws Exception {
        http
                // Halkan ayaan ku daray .cors()
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .securityContext(context -> context
                        .securityContextRepository(securityContextRepository))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/uploads/**", "/api/auth/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/destinations", "/api/destinations/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/packages", "/api/packages/**").permitAll()
                        .anyRequest().authenticated()
                )
                .exceptionHandling(ex ->
                        ex.authenticationEntryPoint(customAuthEntry))
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
