package groupd.backend.Services;

import groupd.backend.Entities.Booking;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendBookingConfirmation(Booking booking) {

        SimpleMailMessage message = new SimpleMailMessage();

        // Customer Information
        String to = booking.getUser().getEmail();
        String customerFirstName = booking.getUser().getFirstName();
        String customerLastName = booking.getUser().getLastName();

        // Travel Package Information
        String packageName = booking.getTravelPackage().getPackageName();
        String destination = booking.getTravelPackage().getDestination().getDestCountry();
        LocalDate departureDate = booking.getTravelPackage().getDepartureDate();
        LocalTime departureTime = booking.getTravelPackage().getDepartureTime();
        BigDecimal amount = booking.getPayment().getAmount();

        message.setTo(to);
        message.setSubject("Your Booking Has Been Confirmed");

        message.setText(
                "Dear " + customerFirstName + " " + customerLastName + ",\n\n" +

                        "We are pleased to inform you that your booking has been successfully confirmed. " +
                        "Thank you for choosing Warfaa Travel Agency for your upcoming journey.\n\n" +

                        "Booking Details\n" +
                        "----------------------------------------\n" +
                        "Package: " + packageName + "\n" +
                        "Destination: " + destination + "\n" +
                        "Departure Date: " + departureDate + "\n" +
                        "Departure Time: " + departureTime + "\n" +
                        "Total Amount: " + amount + "\n\n" +

                        "Please ensure that you arrive at the departure location at least 2 hours before the scheduled departure time and carry all required travel documents.\n\n" +

                        "If you have any questions or need further assistance, please do not hesitate to contact our support team. We are always happy to assist you.\n\n" +

                        "We wish you a safe, enjoyable, and memorable trip.\n\n" +

                        "Kind regards,\n\n" +

                        "Warfaa Travel Agency\n" +
                        "Customer Support Team"
        );

        mailSender.send(message);
    }
    public void sendBookingRejection(Booking booking) {

        SimpleMailMessage message = new SimpleMailMessage();

        String to = booking.getUser().getEmail();
        String customerFirstName = booking.getUser().getFirstName();
        String customerLastName = booking.getUser().getLastName();
        String packageName = booking.getTravelPackage().getPackageName();
        String destination = booking.getTravelPackage().getDestination().getDestCountry();
        LocalDate departureDate = booking.getTravelPackage().getDepartureDate();
        LocalTime departureTime = booking.getTravelPackage().getDepartureTime();

        message.setTo(to);
        message.setSubject("Booking Request Review");

        message.setText(
                "Dear " + customerFirstName + " " + customerLastName + ",\n\n" +

                        "Thank you for choosing our Travel Agency.\n\n" +

                        "After carefully reviewing your booking request, we regret to inform you that your booking for the following travel package could not be approved at this time.\n\n" +

                        "Booking Details:\n" +
                        "--------------------------------------\n" +
                        "Package: " + packageName + "\n" +
                        "Destination: " + destination + "\n" +
                        "Departure Date: " + departureDate + "\n" +
                        "Departure Time: " + departureTime + "\n\n" +

                        "Possible reasons include:\n" +
                        "- Package is no longer available.\n" +
                        "- Payment verification was unsuccessful.\n" +
                        "- Booking requirements were not met.\n\n" +

                        "If you believe this decision was made in error or you would like further clarification, please contact our support team. We will be happy to assist you and help you find another suitable travel package.\n\n" +

                        "Thank you for your understanding, and we look forward to serving you in the future.\n\n" +

                        "Kind regards,\n\n" +
                        "Warfaa Travel Agency Team"+
                        "Customer Support Team"
        );

        mailSender.send(message);
    }

    public void sendCancellationRequestToCustomer(Booking booking) {
        SimpleMailMessage message = new SimpleMailMessage();
        String to = booking.getUser().getEmail();
        String customerFirstName = booking.getUser().getFirstName();
        String customerLastName = booking.getUser().getLastName();
        String packageName = booking.getTravelPackage().getPackageName();
        String destination = booking.getTravelPackage().getDestination().getDestCountry();
        LocalDate departureDate = booking.getTravelPackage().getDepartureDate();
        LocalTime departureTime = booking.getTravelPackage().getDepartureTime();

        message.setTo(to);
        message.setSubject("Cancellation Request Received");

        message.setText(
                "Dear " + customerFirstName + " " + customerLastName + ",\n\n" +

                        "We have successfully received your cancellation request for the following booking:\n\n" +

                        "Booking Details\n" +
                        "----------------------------------------\n" +
                        "Package: " + packageName + "\n" +
                        "Destination: " + destination + "\n" +
                        "Departure Date: " + departureDate + "\n" +
                        "Departure Time: " + departureTime + "\n\n" +

                        "Your cancellation request is currently under review by our team.\n" +
                        "Any applicable refund will be processed in accordance with our cancellation and refund policy.\n\n" +

                        "You will receive another email once your request has been reviewed and a final decision has been made.\n\n" +

                        "If you have any questions or require further assistance, please feel free to contact our support team.\n\n" +

                        "Thank you for choosing Warfaa Travel Agency.\n\n" +

                        "Kind regards,\n\n" +
                        "Warfaa Travel Agency\n" +
                        "Customer Support Team"
        );

        mailSender.send(message);

    }
    public void sendRefundApproved(Booking booking, BigDecimal refundPercentage, BigDecimal refundAmount) {
        SimpleMailMessage message = new SimpleMailMessage();
        String to = booking.getUser().getEmail();
        String customerFirstName = booking.getUser().getFirstName();
        String customerLastName = booking.getUser().getLastName();
        String packageName = booking.getTravelPackage().getPackageName();
        String destination = booking.getTravelPackage().getDestination().getDestCountry();
        LocalDate departureDate = booking.getTravelPackage().getDepartureDate();
        LocalTime departureTime = booking.getTravelPackage().getDepartureTime();

        message.setTo(to);
        message.setSubject("Cancellation Approved & Refund Processed");

        message.setText(
                "Dear " + booking.getUser().getFirstName() + " " +
                        booking.getUser().getLastName() + ",\n\n" +

                        "Your cancellation request has been approved.\n\n" +

                        "Refund Summary\n" +
                        "----------------------------------------\n" +
                        "Package: " + booking.getTravelPackage().getPackageName() + "\n" +
                        "Destination: " + booking.getTravelPackage().getDestination().getDestCountry() + "\n\n" +

                        "Refund Percentage: " + refundPercentage + "%\n" +
                        "Refund Amount: $" + refundAmount + "\n\n" +

                        "Your refund will be processed shortly.\n\n" +

                        "Thank you for choosing Warfaa Travel Agency.\n\n" +

                        "Kind regards,\n" +
                        "Warfaa Travel Agency"
        );

        mailSender.send(message);
    }

    public void sendRefundRejected(Booking booking) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(booking.getUser().getEmail());

        message.setSubject("Cancellation Request Update");

        message.setText(
                "Dear " + booking.getUser().getFirstName() + " " +
                        booking.getUser().getLastName() + ",\n\n" +

                        "After reviewing your cancellation request, we regret to inform you that your refund request could not be approved according to our cancellation policy.\n\n" +

                        "Your booking remains confirmed.\n\n" +

                        "If you have any questions, please contact our support team.\n\n" +

                        "Kind regards,\n" +
                        "Warfaa Travel Agency"
        );

        mailSender.send(message);
    }
}