package groupd.backend.Repositories;

import groupd.backend.Entities.Payment;
import groupd.backend.Enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    Optional<Payment> findByBooking_BookingId(Long bookingId);

    List<Payment> findByPaymentStatus(PaymentStatus status);
}