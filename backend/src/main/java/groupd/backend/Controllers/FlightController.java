package groupd.backend.Controllers;

import groupd.backend.Dto.requests.FlightManagemenRequesttDTO;
import groupd.backend.Dto.response.ApiResponse;
import groupd.backend.Services.FlightServace;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/flights")
@RequiredArgsConstructor
public class FlightController {
    private final FlightServace flightService;

    @GetMapping
    @PreAuthorize("permitAll()")
    public ResponseEntity<ApiResponse<List<FlightManagemenRequesttDTO>>> findAllFlights() {
        List<FlightManagemenRequesttDTO> data = flightService.findAllFlights();
        ApiResponse<List<FlightManagemenRequesttDTO>> response = new ApiResponse<>(true, "All Flights", data);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> addFlight(@Valid @RequestBody FlightManagemenRequesttDTO dto) {
        flightService.createFlight(dto);
        ApiResponse<Void> response = new ApiResponse<>(true, "Flight created successfully", null);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    @PreAuthorize("permitAll()")
    public ResponseEntity<ApiResponse<FlightManagemenRequesttDTO>> findById(@PathVariable Long id) {
        FlightManagemenRequesttDTO data = flightService.findFlightById(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Flight details", data));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<FlightManagemenRequesttDTO>> updateFlight(
            @PathVariable Long id,
            @Valid @RequestBody FlightManagemenRequesttDTO dto) {
         FlightManagemenRequesttDTO updated = flightService.updateFlight(id, dto);
        return ResponseEntity.ok(new ApiResponse<>(true, "Flight updated successfully", updated));
    }

    // 5. Delete flight (Admin)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteFlight(@PathVariable Long id) {
        flightService.deleteFlight(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Flight deleted successfully", null));
    }
}
