package groupd.backend.Services;

import groupd.backend.Entities.Payment;
import groupd.backend.Exceptions.ResourceNotFoundException;
import groupd.backend.Repositories.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
}
