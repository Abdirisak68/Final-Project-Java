package groupd.backend.Repositories;

import groupd.backend.Entities.Booking;
import groupd.backend.Enums.BookingStatus;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    @EntityGraph(attributePaths = {"payment"})
    List<Booking> findAll();

    @EntityGraph(attributePaths = {"payment"})
    Optional<Booking> findByBookingId(Long bookingId);

    @EntityGraph(attributePaths = {
            "user",
            "travelPackage",
            "payment"
    })
    List<Booking> findByUser_Id(Long userId);

    List<Booking> findByBookingStatus(BookingStatus status);

    List<Booking> findByUser_IdAndBookingStatus(Long userId, BookingStatus status);

}