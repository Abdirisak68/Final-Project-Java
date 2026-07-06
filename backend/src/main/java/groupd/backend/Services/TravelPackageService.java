package groupd.backend.Services;

import groupd.backend.Dto.requests.TravelPackageRequestDTO;
import groupd.backend.Entities.Destination;
import groupd.backend.Entities.TravelPackage;
import groupd.backend.Exceptions.DuplicateResourceException;
import groupd.backend.Exceptions.ResourceNotFoundException;
import groupd.backend.Repositories.DestinationRepository;
import groupd.backend.Repositories.TravelPackageRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
        return travelRepo.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Travel Package not found with id: " + id));
    }

    public void createTravelPackage(@Valid TravelPackageRequestDTO dto) {

        if (travelRepo.existsByPackageName(dto.getPackageName())) {
            throw new DuplicateResourceException("Travel Package already exists.");
        }

        Destination destination = destRepo.findById(dto.getDestinationId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Destination not found with id: " + dto.getDestinationId()));

        TravelPackage newPackage = new TravelPackage();

        newPackage.setPackageName(dto.getPackageName());
        newPackage.setPackageDescription(dto.getPackageDescription());
        newPackage.setDestination(destination);

        newPackage.setPrice(dto.getPrice());
        newPackage.setDurationDays(dto.getDurationDays());

        // Flight Information
        newPackage.setAirline(dto.getAirline());
        newPackage.setDepartureLocation(dto.getDepartureLocation());
        newPackage.setArrivalLocation(dto.getArrivalLocation());
        newPackage.setDepartureDate(dto.getDepartureDate());
        newPackage.setDepartureTime(dto.getDepartureTime());

        // Hotel Information
        newPackage.setHotelName(dto.getHotelName());
        newPackage.setRoomType(dto.getRoomType());
        newPackage.setNumberOfNights(dto.getNumberOfNights());

        // Package Status
        newPackage.setAvailable(dto.isAvailable());

        newPackage.setCreatedDate(LocalDateTime.now());

        travelRepo.save(newPackage);
    }

    public void deleteTravelPackage(Long id) {

        if (!travelRepo.existsById(id)) {
            throw new ResourceNotFoundException("Cannot delete. Travel Package not found with id: " + id);
        }

        travelRepo.deleteById(id);
    }

    public TravelPackage updateTravelPackage(Long id, @Valid TravelPackageRequestDTO dto) {

        TravelPackage existingPackage = findPackageById(id);

        Destination destination = destRepo.findById(dto.getDestinationId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Destination not found with id: " + dto.getDestinationId()));

        existingPackage.setPackageName(dto.getPackageName());
        existingPackage.setPackageDescription(dto.getPackageDescription());
        existingPackage.setDestination(destination);

        existingPackage.setPrice(dto.getPrice());
        existingPackage.setDurationDays(dto.getDurationDays());

        // Flight Information
        existingPackage.setAirline(dto.getAirline());
        existingPackage.setDepartureLocation(dto.getDepartureLocation());
        existingPackage.setArrivalLocation(dto.getArrivalLocation());
        existingPackage.setDepartureDate(dto.getDepartureDate());
        existingPackage.setDepartureTime(dto.getDepartureTime());

        // Hotel Information
        existingPackage.setHotelName(dto.getHotelName());
        existingPackage.setRoomType(dto.getRoomType());
        existingPackage.setNumberOfNights(dto.getNumberOfNights());

        // Package Status
        existingPackage.setAvailable(dto.isAvailable());

        return travelRepo.save(existingPackage);
    }
}