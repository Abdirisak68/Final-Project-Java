package groupd.backend.Dto.requests;

import groupd.backend.Enums.PaymentMethod;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequest {
    @NotNull(message = "Can Not Be Null")
    private Long packageId;

    @Min(value = 1,message = "At least 1 person")
    private Integer numberOfTravelers;
    @NotNull(message = "Payment method is required")
    private PaymentMethod paymentMethod;

    @NotNull(message = "Can Not Be Null")
    private Long accountNumber;

}
