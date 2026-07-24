package groupd.backend.Controllers;

import groupd.backend.Dto.response.ApiResponse;
import groupd.backend.Entities.Payment;
import groupd.backend.Services.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<Payment>>> getAllPayments() {
        List<Payment> payments = paymentService.getAllPayments();
        ApiResponse<List<Payment>> response = new ApiResponse<>(true, "All payments retrieved successfully", payments);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/stats")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Map<String, BigDecimal>>> getPaymentStats() {
        BigDecimal totalRevenue = paymentService.getTotalRevenue();
        BigDecimal totalRefunded = paymentService.getTotalRefunded();
        Map<String, BigDecimal> stats = Map.of(
                "totalRevenue", totalRevenue,
                "totalRefunded", totalRefunded
        );
        ApiResponse<Map<String, BigDecimal>> response = new ApiResponse<>(true, "Payment stats retrieved successfully", stats);
        return ResponseEntity.ok(response);
    }
}
