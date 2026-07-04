package groupd.backend.Entities;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "Travel_package")
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
    private LocalDateTime createdDate;


}
