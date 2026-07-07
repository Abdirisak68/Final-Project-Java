package groupd.backend.Controllers;

import groupd.backend.Dto.requests.BookingRequest;
import groupd.backend.Dto.requests.BookingStatusRequest;
import groupd.backend.Dto.response.ApiResponse;
import groupd.backend.Entities.Booking;
import groupd.backend.Enums.BookingStatus;
import groupd.backend.Services.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/bookings")
public class BookingController {
    private final BookingService service;

    // Returns the current logged user email
    private String getLoggedInUserEmail() {
        return SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();
    }

    // get all bookings
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<Booking>>> getAllBookings() {
        List<Booking> data = service.getAllBookings();
        ApiResponse<List<Booking>> response = new ApiResponse<>(true, "success", data);
        return ResponseEntity.ok(response);
    }

    // get booking by id
    @GetMapping("{id}")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<ApiResponse<Booking>> getBookingById(@PathVariable() Long id) {
        Booking booking = service.getBookingById(id);
        ApiResponse<Booking> response = new ApiResponse<>(true, "success", booking);
        return ResponseEntity.ok(response);
    }

    // get my booking by customer
    @GetMapping("/my")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<ApiResponse<List<Booking>>> getMyBookings() {
        List<Booking> data = service.getMyBookings(getLoggedInUserEmail());
        return ResponseEntity.ok(new ApiResponse<>(true, "My bookings", data));
    }

// creating booking
    @PostMapping
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<ApiResponse<Booking>>  createBooking(@Valid @RequestBody BookingRequest bookingRequest) {
        Booking data = service.createBooking(bookingRequest,getLoggedInUserEmail());
        ApiResponse<Booking> response = new ApiResponse<>(true, "Booking Created", data);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


// canceling booking
    @PutMapping("/cancel/{id}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<ApiResponse<Booking>> cancelBooking(@PathVariable Long id) throws AccessDeniedException {
        Booking booking = service.cancelBooking(id, getLoggedInUserEmail());
        return ResponseEntity.ok(new ApiResponse<>(true, "Booking cancelled successfully.", booking));
    }
// booking approve status endpoint
    @PutMapping("/status/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Booking>> updateBookingStatus(@PathVariable Long id, @Valid @RequestBody BookingStatusRequest status) {
        Booking booking = service.updateBookingStatus(id, status.getStatus());
        return ResponseEntity.ok(new ApiResponse<>(true, "Booking status updated successfully.", booking));
    }
// aprove endpoint
    @PutMapping("/cancel/{id}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Booking>> approveCancellation(
            @PathVariable Long id) {
        Booking booking = service.approveCancellation(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Cancellation request approved successfully. Refund processed.", booking));
    }
    //reject endpoint
    @PutMapping("/cancel/{id}/reject")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Booking>> rejectCancellation(@PathVariable Long id) {
        Booking booking = service.rejectCancellation(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Cancellation request rejected successfully.", booking));
    }
}
