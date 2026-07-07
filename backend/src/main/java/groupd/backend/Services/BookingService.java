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
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BookingService {
    private final EmailService emailService;
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
        String reference = "REF" + random;
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

        // Check the Logged-in user
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

        if (booking.getBookingStatus() == BookingStatus.CANCELLATION_REQUESTED) {
            throw new IllegalStateException("Cancellation request has already been submitted.");
        }

        // Prevent cancelling twice
        if (booking.getBookingStatus() == BookingStatus.CANCELLED) {
            throw new IllegalStateException("Booking is already cancelled.");
        }

        // Only can cancel Approved bookings
        if (booking.getBookingStatus() != BookingStatus.CONFIRMED)
            throw new IllegalArgumentException("Only confirmed bookings can be cancelled.");

        Payment payment = paymentRepo.findByBooking_BookingId(bookingId)
                .orElseThrow(()-> new ResourceNotFoundException("Payment not found for this bookin"));

        booking.setBookingStatus(BookingStatus.CANCELLATION_REQUESTED);
        payment.setPaymentStatus(PaymentStatus.REFUND_PENDING);
        paymentRepo.save(payment);

        emailService.sendCancellationRequestToCustomer(booking);

        return bookingRepo.save(booking);
    }

    // update booking status and at same time payment status update
    @Transactional
    public Booking updateBookingStatus(Long bookingId, BookingStatus bookingStatus) {

        Booking booking = bookingRepo.findByBookingId(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking is not found"));
        Payment payment = paymentRepo.findByBooking_BookingId(bookingId).orElseThrow(() -> new ResourceNotFoundException("Payment not found for this booking"));

        if (booking.getBookingStatus() == BookingStatus.CANCELLED) {
            throw new IllegalArgumentException("Cancelled booking cannot be updated.");
        }

        switch (bookingStatus) {
            case CONFIRMED:
                booking.setBookingStatus(BookingStatus.CONFIRMED);
                payment.setPaymentStatus(PaymentStatus.APPROVED);
                emailService.sendBookingConfirmation(booking);
                break;
            case REJECTED:
                booking.setBookingStatus(BookingStatus.REJECTED);
                payment.setPaymentStatus(PaymentStatus.REJECTED);
                emailService.sendBookingRejection(booking);
                break;
            default:
                throw new IllegalArgumentException("Unknown booking status " + bookingStatus + " USE THESE (CONFIRMED/REJECTED.)");
        }
        paymentRepo.save(payment);
        return bookingRepo.save(booking);
    }

    @Transactional
    public Booking approveCancellation(Long bookingId) {

        Booking booking = bookingRepo.findById(bookingId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Booking not found"));

        Payment payment = paymentRepo.findByBooking_BookingId(bookingId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Payment not found"));

        if (booking.getBookingStatus() != BookingStatus.CANCELLATION_REQUESTED) {
            throw new IllegalArgumentException("No cancellation request found for this booking.");
        }

        long daysBeforeDeparture = ChronoUnit.DAYS.between(LocalDate.now(), booking.getTravelPackage().getDepartureDate());

        BigDecimal refundPercentage;

        if (daysBeforeDeparture > 10) {
            refundPercentage = BigDecimal.valueOf(100);
        } else if (daysBeforeDeparture >= 5) {
            refundPercentage = BigDecimal.valueOf(50);
        } else {
            refundPercentage = BigDecimal.ZERO;
        }

        BigDecimal refundAmount = booking.getTotalAmount()
                .multiply(refundPercentage)
                .divide(BigDecimal.valueOf(100));

        booking.setBookingStatus(BookingStatus.CANCELLED);
        payment.setPaymentStatus(PaymentStatus.REFUNDED);
        payment.setRefundedAmount(refundAmount);

        bookingRepo.save(booking);
        paymentRepo.save(payment);

        emailService.sendRefundApproved(booking, refundPercentage, refundAmount);

        return booking;
    }

    @Transactional
    public Booking rejectCancellation(Long bookingId) {

        Booking booking = bookingRepo.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        Payment payment = paymentRepo.findByBooking_BookingId(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found"));

        if (booking.getBookingStatus() != BookingStatus.CANCELLATION_REQUESTED) {
            throw new IllegalArgumentException("No cancellation request found.");
        }

        booking.setBookingStatus(BookingStatus.CONFIRMED);
        payment.setPaymentStatus(PaymentStatus.APPROVED);

        bookingRepo.save(booking);
        paymentRepo.save(payment);

        emailService.sendRefundRejected(booking);

        return booking;
    }


}
