package groupd.backend.Services;

import groupd.backend.Entities.Destination;
import groupd.backend.Entities.TravelPackage;
import groupd.backend.DTOs.TravelPackageRequestDTO;
import groupd.backend.Exceptions.ResourceNotFoundException;
import groupd.backend.Repositories.DestinationRepository;
import groupd.backend.Repositories.TravelPackageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TravelPackageService {
    private final TravelPackageRepository travelRepo;
    private final DestinationRepository destRepo;

    public List<TravelPackage> findAllPackage() {
        return travelRepo.findAll();
    }

    public TravelPackage findPackageById(Long id) {
        return travelRepo.findById(id).get();
    }

    public void createTravelPackage(TravelPackageRequestDTO dto) {
        if (travelRepo.existsByPackageName(dto.getPackageName())) {
            throw new RuntimeException("Travel Package already exists");
        }

        Destination destination = destRepo.findById(dto.getDestinationId())
                .orElseThrow(() -> new RuntimeException("Destination not found with id: " + dto.getDestinationId()));

        TravelPackage newPackage = new TravelPackage();
        newPackage.setPackageName(dto.getPackageName());
        newPackage.setPackageDescription(dto.getPackageDescription());
        newPackage.setPrice(dto.getPrice());
        newPackage.setDurationDays(dto.getDurationDays());
        newPackage.setCreatedDate(LocalDateTime.now());

        newPackage.setDestination(destination);
        travelRepo.save(newPackage);
    }
    public void deleteTravelPackage(Long id) {
        if (!travelRepo.existsById(id)) {
            throw new ResourceNotFoundException("Cannot delete, Package not found with id: " + id);
        }
        travelRepo.deleteById(id);
    }

    public TravelPackage updateTravelPackage(Long id, TravelPackageRequestDTO dto) {

        TravelPackage existingPackage = findPackageById(id);


        Destination destination = destRepo.findById(dto.getDestinationId())
                .orElseThrow(() -> new ResourceNotFoundException("Destination not found"));


        existingPackage.setPackageName(dto.getPackageName());
        existingPackage.setPackageDescription(dto.getPackageDescription());
        existingPackage.setPrice(dto.getPrice());
        existingPackage.setDurationDays(dto.getDurationDays());
        existingPackage.setDestination(destination);


        return travelRepo.save(existingPackage);
    }

}
