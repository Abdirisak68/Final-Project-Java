package groupd.backend.Controllers;

import groupd.backend.Dto.UserDTO;
import groupd.backend.Dto.requests.DestinationRequest;
import groupd.backend.Dto.response.ApiResponse;
import groupd.backend.Entities.Destination;
import groupd.backend.Services.DestinationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/destinations")
@RequiredArgsConstructor
public class DestinationController {
    private final DestinationService destService;

    // PUblic endpoints
    @GetMapping
    @PreAuthorize("permitAll()")
    public ResponseEntity<ApiResponse<List<Destination>>> getAllDestinations() {
        List<Destination> data = destService.getAllDestinations();
        ApiResponse<List<Destination>> response = new ApiResponse<>(true, "All destinations", data);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    @PreAuthorize("permitAll()")
    public ResponseEntity<ApiResponse<Destination>> getDestinationById(@PathVariable Long id) {
        Destination data = destService.findById(id);
        ApiResponse<Destination> response = new ApiResponse<>(true, "All destinations", data);
        return ResponseEntity.ok(response);
    }

    //    Only Admin Endpoints

    @PostMapping(consumes = {"multipart/form-data"})
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<DestinationRequest>> createDestination(@Valid @ModelAttribute DestinationRequest destination) {
        DestinationRequest dest = destService.createDestination(destination,destination.getDestImageUrl());
        ApiResponse<DestinationRequest> response = new ApiResponse<>(true, "Destination created successfully!",dest);
        return ResponseEntity.ok(response);
    }

    @PutMapping(value = "/{id}",consumes = {"multipart/form-data"})
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<DestinationRequest>> updateDest(@PathVariable Long id, @Valid @ModelAttribute DestinationRequest destination) {
        DestinationRequest data = destService.updateDestination(id, destination,destination.getDestImageUrl());
        ApiResponse<DestinationRequest> response = new ApiResponse<>(true, "Destination updated successfully!", data);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteDest(@PathVariable Long id) {
        destService.deleteDestination(id);
        ApiResponse<Void> response = new ApiResponse<>(true, "Destination deleted successfully!", null);
        return ResponseEntity.ok(response);
    }
}
