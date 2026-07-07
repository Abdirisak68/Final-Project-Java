package groupd.backend.Entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@Entity
@Table(name = "travel_package")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@JsonPropertyOrder({"travelPackageId", "packageName", "packageDescription", "destination", "price", "durationDays", "airline", "departureLocation", "arrivalLocation", "departureDate", "departureTime", "hotelName", "roomType", "numberOfNights", "available", "createdDate"})
public class TravelPackage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long travelPackageId;
    private String packageName;
    private String packageDescription;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "destId", referencedColumnName = "destId")
    private Destination destination;

    private BigDecimal price;
    private Integer durationDays;

    // Flight Information
    private String airline;
    private String departureLocation;
    private String arrivalLocation;
    private LocalDate departureDate;
    private LocalTime departureTime;
    // Hotel Information
    private String hotelName;
    private String roomType;
    private Long numberOfNights;

    private boolean available;

    private LocalDateTime createdDate;
}