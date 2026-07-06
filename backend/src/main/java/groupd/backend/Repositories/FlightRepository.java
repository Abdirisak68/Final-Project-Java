package groupd.backend.Repositories;

import groupd.backend.Dto.requests.FlightManagemenRequesttDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FlightRepository extends JpaRepository<FlightManagemenRequesttDTO, Long> {
    List<FlightManagemenRequesttDTO> findByDestination_DestId(Long destId);
    boolean existsByFlightNumber(String flightNumber);
}