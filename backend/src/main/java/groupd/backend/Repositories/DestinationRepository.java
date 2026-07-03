package groupd.backend.Repositories;


import groupd.backend.Entities.Destination;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DestinationRepository extends JpaRepository<Destination, Long> {
    Optional<Destination> findByDestCountry(String destCountry);
    boolean existsByDestCountry(String destCountry);
    Optional<Destination> findByDestCountryContainingIgnoreCase(String destCountry);
    boolean existsByDestCountryAndDestIdNot(String destCountry, Long destId);

}
