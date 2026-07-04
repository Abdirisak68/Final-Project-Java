package groupd.backend.Controllers;

import groupd.backend.Dto.response.ApiResponse;
import groupd.backend.Entities.TravelPackage;
import groupd.backend.DTOs.TravelPackageRequestDTO;
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

//    Public endpoints
    @GetMapping
    @PreAuthorize("permitAll()")
    public ResponseEntity<ApiResponse<List<TravelPackage>>> findAllPackage() {
        List<TravelPackage> data = service.findAllPackage();
        ApiResponse<List<TravelPackage>> response = new ApiResponse<>(true, "All Travel Packages", data);
        return ResponseEntity.ok(response);
    }

//    Admin Endpoint
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> addPackage(@Valid @RequestBody groupd.backend.DTOs.TravelPackageRequestDTO newPackage) {
        service.createTravelPackage(newPackage);
        ApiResponse<Void> response = new ApiResponse<>(
                true,
                "Package created successfully",
                null
        );
        return ResponseEntity.ok(response);
    }
}
