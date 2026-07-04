package groupd.backend.DTOs;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class TravelPackageRequestDTO {

    @NotBlank(message = "Package name is required")
    @Size(min = 3, max = 100, message = "Package name must be between 3 and 100 characters")
    private String packageName;

    @NotBlank(message = "Package description is required")
    @Size(max = 500, message = "Description cannot exceed 500 characters")
    private String packageDescription;

    @NotNull(message = "Destination ID is required")
    private Long destinationId;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than zero")
    private BigDecimal price;

    @NotNull(message = "Duration is required")
    @Min(value = 1, message = "Duration must be at least 1 day")
    private Integer durationDays;
}