package groupd.backend.Services;

import groupd.backend.Entities.Payment;
import groupd.backend.Enums.PaymentStatus;
import groupd.backend.Exceptions.ResourceNotFoundException;
import groupd.backend.Repositories.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private final PaymentRepository paymentRepo;

    public void addPayment(Payment payment){
        paymentRepo.save(payment);
    }

    public Payment getPaymentByBookingId(Long id){
        Payment payment = paymentRepo.findByBooking_BookingId(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Payment not found for this booking"));
        return payment;
    }
    public void updatePayment(Payment payment){
        paymentRepo.save(payment);
    }

    public List<Payment> getAllPayments() {
        return paymentRepo.findAll();
    }

    public BigDecimal getTotalRevenue() {
        List<Payment> approvedPayments = paymentRepo.findByPaymentStatus(PaymentStatus.APPROVED);
        BigDecimal acc = BigDecimal.ZERO;
        for (Payment approvedPayment : approvedPayments) {
            BigDecimal amount = approvedPayment.getAmount();
            acc = acc.add(amount);
        }
        return acc;
    }

    public BigDecimal getTotalRefunded() {
        List<Payment> refundedPayments = paymentRepo.findByPaymentStatus(PaymentStatus.REFUNDED);
        BigDecimal acc = BigDecimal.ZERO;
        for (Payment refundedPayment : refundedPayments) {
            BigDecimal refundedAmount = refundedPayment.getRefundedAmount();
            acc = acc.add(refundedAmount);
        }
        return acc;
    }
}
