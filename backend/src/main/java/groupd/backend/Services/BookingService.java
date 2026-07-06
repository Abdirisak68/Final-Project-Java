package groupd.backend.Services;

import groupd.backend.Dto.requests.BookingRequest;
import groupd.backend.Entities.Booking;
import groupd.backend.Entities.Payment;
import groupd.backend.Entities.TravelPackage;
import groupd.backend.Entities.User;
import groupd.backend.Enums.BookingStatus;
import groupd.backend.Enums.PaymentStatus;
import groupd.backend.Exceptions.ResourceNotFoundException;
import groupd.backend.Repositories.BookingRepository;
import groupd.backend.Repositories.PaymentRepository;
import groupd.backend.Repositories.TravelPackageRepository;
import groupd.backend.Repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.math.BigDecimal;
import java.nio.file.AccessDeniedException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BookingService {
    private final BookingRepository bookingRepo;
    private final UserRepository userRepo;
    private final PaymentRepository paymentRepo;
    private final TravelPackageRepository travelPackageRepo;

    public List<Booking> getAllBookings() {
        return bookingRepo.findAll();
    }

    public Booking getBookingById(Long id) {
        return bookingRepo.findById(id).get();
    }
    public List<Booking> getMyBookings(String email) {

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return bookingRepo.findByUser_Id(user.getId());
    }

    @Transactional
    public Booking createBooking(BookingRequest dto, String email) {

        User user = userRepo.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));
        TravelPackage travelPackage = travelPackageRepo.findById(dto.getPackageId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Travel Package not found"));
        BigDecimal totalAmount = travelPackage.getPrice()
                .multiply(BigDecimal.valueOf(dto.getNumberOfTravelers()));

        // Booking Creation
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setTravelPackage(travelPackage);
        booking.setNumberOfTravelers(dto.getNumberOfTravelers());
        booking.setTotalAmount(totalAmount);
        booking.setBookingStatus(BookingStatus.PENDING);
        booking.setBookingDate(LocalDateTime.now());
        bookingRepo.save(booking);

//        Create Payment
        Long random = System.currentTimeMillis();
        String reference = "REF"+random;
        Payment payment = new Payment();
        payment.setBooking(booking);
        payment.setAmount(totalAmount);
        payment.setPaymentMethod(dto.getPaymentMethod());
        payment.setTransactionReference(reference);
        payment.setPaymentStatus(PaymentStatus.PENDING);
        payment.setAccountNumber(dto.getAccountNumber());
        payment.setPaymentDate(LocalDateTime.now());

        paymentRepo.save(payment);
        return booking;
    }

    @Transactional
    public Booking cancelBooking(Long bookingId, String email) throws AccessDeniedException {

        // Logged-in user
        User user = userRepo.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        // Booking
        Booking booking = bookingRepo.findById(bookingId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Booking not found"));

        // Ensure booking belongs to the logged-in customer
        if (!booking.getUser().getId().equals(user.getId())) {
            throw new AccessDeniedException("You can only cancel your own booking.");
        }

        // Prevent cancelling twice
        if (booking.getBookingStatus() == BookingStatus.CANCELLED) {
            throw new IllegalStateException("Booking is already cancelled.");
        }

        // Prevent cancelling completed bookings (optional)
        if (booking.getBookingStatus() == BookingStatus.CONFIRMED) {
            throw new IllegalStateException("Confirmed bookings cannot be cancelled.");
        }

        booking.setBookingStatus(BookingStatus.CANCELLED);

        return bookingRepo.save(booking);
    }


}
