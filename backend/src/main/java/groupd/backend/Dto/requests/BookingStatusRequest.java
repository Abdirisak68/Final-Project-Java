package groupd.backend.Dto.requests;

import groupd.backend.Enums.BookingStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class BookingStatusRequest {

    @NotNull
    private BookingStatus status;
}