package groupd.backend.Controllers;

import groupd.backend.Dto.UserDTO;
import groupd.backend.Dto.response.ApiResponse;
import groupd.backend.Services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserDTO>> getMe() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        UserDTO user = userService.getProfile(email);
        ApiResponse<UserDTO> response = new ApiResponse<>(true, "User profile retrieved successfully", user);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/all-users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<UserDTO>>> getAll() {
        List<UserDTO> users = userService.findAllUsers();
        ApiResponse<List<UserDTO>> response = new ApiResponse<>(true, "All users retrieved successfully", users);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable Long id) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        userService.deleteUser(id,email);
        ApiResponse<Void> response = new ApiResponse<>(true, "User deleted successfully", null);
        return ResponseEntity.ok(response);
    }
}
