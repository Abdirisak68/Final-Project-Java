package groupd.backend.Entities;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "Destinations")
@JsonPropertyOrder({ "destId", "destCountry", "destCities", "destDescription", "destImageUrl", "created_at" })
public class Destination {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long destId;
    @Column(nullable = false)
    private String destCountry;
    @ElementCollection
    @CollectionTable(name = "destination_cities",joinColumns = @JoinColumn(name = "destId", referencedColumnName = "destId"))
    @Column(name = "city_name")
    private List<String> destCities;
    @Column(nullable = false,columnDefinition = "TEXT")
    private  String destDescription;
    private  String destImageUrl;
    private LocalDateTime created_at;
}
