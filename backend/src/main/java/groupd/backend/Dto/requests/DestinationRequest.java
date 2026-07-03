package groupd.backend.Dto.requests;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DestinationRequest {
    @NotBlank(message = "Country name cannot be blank")
    @Size(min = 2, max = 100, message = "Country name must be between 2 and 100 characters")
    private String destCountry;

    @NotEmpty(message = "At least one city must be specified")
    private List<String> destCities;

    @NotBlank(message = "Description cannot be blank")
    @Size(min = 10, message = "Description must be at least 10 characters long")
    private String destDescription;

    private MultipartFile destImageUrl;
}
