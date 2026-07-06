package groupd.backend.Dto.requests;

import groupd.backend.Entities.Destination;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "flights")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FlightManagemenRequesttDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Flight number is required")
    @Column(name = "flight_number", nullable = false, unique = true)
    private String flightNumber;

    @NotBlank(message = "Airline name is required")
    @Column(name = "airline_name", nullable = false)
    private String airlineName;

    @NotBlank(message = "Departure airport is required")
    @Column(name = "departure_airport", nullable = false)
    private String departureAirport;

    @NotBlank(message = "Arrival airport is required")
    @Column(name = "arrival_airport", nullable = false)
    private String arrivalAirport;

    @NotNull(message = "Departure time is required")
    @Column(name = "departure_time", nullable = false)
    private LocalDateTime departureTime;

    @NotNull(message = "Arrival time is required")
    @Column(name = "arrival_time", nullable = false)
    private LocalDateTime arrivalTime;

    @NotNull(message = "Capacity is required")
    @Min(value = 1, message = "Capacity must be at least 1")
    @Column(name = "total_capacity", nullable = false)
    private Integer totalCapacity;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than zero")
    @Column(nullable = false)
    private BigDecimal price;

    @NotNull(message = "Destination is required")
    @ManyToOne
    @JoinColumn(name = "dest_id", nullable = false)
    private Destination destination;
}