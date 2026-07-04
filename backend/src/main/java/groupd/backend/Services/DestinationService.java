package groupd.backend.Services;

import groupd.backend.Dto.requests.DestinationRequest;
import groupd.backend.Entities.Destination;
import groupd.backend.Exceptions.DuplicateResourceException;
import groupd.backend.Exceptions.ResourceNotFoundException;
import groupd.backend.Repositories.DestinationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DestinationService {
private final DestinationRepository destRepository;

public List<Destination> getAllDestinations(){
    return destRepository.findAll();
}

public Destination findById(long id){
    Optional<Destination> destination = destRepository.findById(id);
    if (destination.isEmpty()) {
        throw new ResourceNotFoundException("Destination not found");
    }
    return destination.get();
}



public DestinationRequest createDestination(DestinationRequest destRequest, MultipartFile file) {
    if (destRepository.existsByDestCountry(destRequest.getDestCountry())) {
        throw new DuplicateResourceException("Destination already exists");
    }

    if (file == null || file.isEmpty()) {
        throw new IllegalArgumentException("Destination image is required");
    }

    String uploadDirectory = "src/main/resources/static/uploads/";
    String browserUrl = null;

    if (file != null && !file.isEmpty()) {
        try {
            File folder = new File(uploadDirectory);
            if (!folder.exists()) {
                folder.mkdirs();
            }

            String uniqueFileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path targetPath = Paths.get(uploadDirectory + uniqueFileName);

            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);


            browserUrl = "/uploads/" + uniqueFileName;

        } catch (Exception e) {
            throw new RuntimeException("Error while uploading file: " + e.getMessage());
        }
    }

    Destination destination = new Destination();
    destination.setDestCountry(destRequest.getDestCountry());
    destination.setDestCities(new ArrayList<>(destRequest.getDestCities()));
    destination.setDestDescription(destRequest.getDestDescription());


    destination.setDestImageUrl(browserUrl);

    destination.setCreated_at(LocalDateTime.now());
    destRepository.save(destination);

    return destRequest;
}
public DestinationRequest updateDestination(Long id, DestinationRequest destRequest, MultipartFile file) {
        Destination existingDestination = destRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Destination not found"));

        if (destRepository.existsByDestCountryAndDestIdNot(destRequest.getDestCountry(), id)) {
            throw new DuplicateResourceException("Cannot update. Destination country already exists.");
        }

        existingDestination.setDestCountry(destRequest.getDestCountry());
        existingDestination.setDestDescription(destRequest.getDestDescription());

        if (file != null && !file.isEmpty()) {
            try {
                String uploadDirectory = "src/main/resources/static/uploads/";
                File folder = new File(uploadDirectory);
                if (!folder.exists()) {
                    folder.mkdirs();
                }

                String uniqueFileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                Path targetPath = Paths.get(uploadDirectory + uniqueFileName);

                Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

                existingDestination.setDestImageUrl("/uploads/" + uniqueFileName);

            } catch (Exception e) {
                throw new RuntimeException("Error while uploading new file: " + e.getMessage());
            }
        }

        for (String newCity : destRequest.getDestCities()) {
            if (!existingDestination.getDestCities().contains(newCity)) {
                existingDestination.getDestCities().add(newCity);
            }
        }

        destRepository.save(existingDestination);
        return destRequest;
    }
public void deleteDestination(Long id){
    if (!destRepository.findById(id).isPresent()) {
        throw new ResourceNotFoundException("Destination not found");
    }
    destRepository.deleteById(id);
}

}
