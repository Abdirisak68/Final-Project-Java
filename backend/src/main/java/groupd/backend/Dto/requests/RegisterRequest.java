package groupd.backend.Dto.requests;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {

    @NotBlank(message = "Can not be blank")
    private String firstName;
    @NotBlank(message = "Can not be blank")
    private String lastName;

    @NotBlank(message = "Can not be blank")
    @Email(message = "Enter Valid Email")
    private String email;

    @NotBlank(message = "Can not be blank")
    @Size(min = 6 , message = "At least 6 character")
    private String password;
}
