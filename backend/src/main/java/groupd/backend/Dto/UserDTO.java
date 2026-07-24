package groupd.backend.Dto;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import groupd.backend.Entities.User;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@JsonPropertyOrder({ "id", "firstName", "lastName", "email", "role", "active", "createdDate" })
public class UserDTO {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String role;
    private boolean active;
    private LocalDateTime createdDate;

    public static UserDTO fromEntity(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        dto.setActive(user.isActive());
        dto.setCreatedDate(user.getCreatedDate());
        return dto;
    }
}
