package groupd.backend.Services;

import groupd.backend.Dto.response.AuthResponse;
import groupd.backend.Dto.requests.LoginRequest;
import groupd.backend.Dto.requests.PasswordUpdateRequest;
import groupd.backend.Dto.requests.RegisterRequest;
import groupd.backend.Entities.User;
import groupd.backend.Repositories.UserRepository;
import groupd.backend.Security.JwtUtils;
import groupd.backend.Exceptions.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already in use");
        }

        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setHashedPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("CUSTOMER");
        user.setCreatedDate(LocalDateTime.now());

        userRepository.save(user);
        return buildAuthResponse(user);
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getHashedPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }

        return buildAuthResponse(user);
    }



    public void updatePassword(String email, PasswordUpdateRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getHashedPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Current password is incorrect");
        }

        user.setHashedPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

//    private AuthResponse buildAuthResponse(User user) {
//        return new AuthResponse(jwtUtils.generateAccessToken(user), "Bearer");
//    }
    // ... gudaha AuthService.java ...

    private AuthResponse buildAuthResponse(User user) {
        // Waxaan ku darnay user.getFirstName()
        return new AuthResponse(
                jwtUtils.generateAccessToken(user),
                "Bearer",
                user.getFirstName()
        );
    }


}
