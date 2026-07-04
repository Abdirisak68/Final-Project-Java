package groupd.backend.Repositories;

import groupd.backend.Entities.TravelPackage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TravelPackageRepository extends JpaRepository<TravelPackage, Long> {
    List<TravelPackage> findByDestination_DestId(Long destId);
    boolean existsByPackageName(String packageName);
}

