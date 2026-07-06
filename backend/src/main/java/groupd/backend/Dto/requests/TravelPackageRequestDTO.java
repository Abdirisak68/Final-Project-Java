package groupd.backend.Dto.requests;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

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

    // Flight Information
    @NotBlank(message = "Airline is required")
    private String airline;

    @NotBlank(message = "Departure location is required")
    private String departureLocation;

    @NotBlank(message = "Arrival location is required")
    private String arrivalLocation;

    @NotNull(message = "Departure date is required")
    private LocalDate departureDate;

    @NotNull(message = "Departure time is required")
    private LocalTime departureTime;

    // Hotel Information
    @NotBlank(message = "Hotel name is required")
    private String hotelName;

    @NotBlank(message = "Room type is required")
    private String roomType;

    @NotNull(message = "Number of nights is required")
    @Min(value = 1, message = "Number of nights must be at least 1")
    private Long numberOfNights;
    private boolean available = true;
}