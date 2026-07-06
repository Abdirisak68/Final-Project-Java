package groupd.backend.Controllers;

import groupd.backend.Dto.response.ApiResponse;
import groupd.backend.Entities.TravelPackage;
import groupd.backend.Dto.requests.TravelPackageRequestDTO;
import groupd.backend.Services.TravelPackageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/packages")
@RequiredArgsConstructor
public class TravelPackageController {
    private final TravelPackageService service;

//    findAll endpoints
    @GetMapping
    @PreAuthorize("permitAll()")
    public ResponseEntity<ApiResponse<List<TravelPackage>>> findAllPackage() {
        List<TravelPackage> data = service.findAllPackage();
        ApiResponse<List<TravelPackage>> response = new ApiResponse<>(true, "All Travel Packages", data);
        return ResponseEntity.ok(response);
    }

//    Admin Endpoint create
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> addPackage(@Valid @RequestBody groupd.backend.Dto.requests.TravelPackageRequestDTO newPackage) {
        service.createTravelPackage(newPackage);
        ApiResponse<Void> response = new ApiResponse<>(
                true,
                "Package created successfully",
                null
        );
        return ResponseEntity.ok(response);
    }

    // Find By ID
    @GetMapping("/{id}")
    @PreAuthorize("permitAll()")
    public ResponseEntity<ApiResponse<TravelPackage>> findById(@PathVariable Long id) {
        TravelPackage data = service.findPackageById(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Package details", data));
    }

    //  Delete
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deletePackage(@PathVariable Long id) {
        service.deleteTravelPackage(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Package deleted successfully", null));
    }

    //  Update
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<TravelPackage>> updatePackage(
            @PathVariable Long id,
            @Valid @RequestBody TravelPackageRequestDTO dto) {
        TravelPackage updated = service.updateTravelPackage(id, dto);
        return ResponseEntity.ok(new ApiResponse<>(true, "Package updated successfully", updated));
    }
}
