package groupd.backend.Services;

import groupd.backend.Dto.requests.FlightManagemenRequesttDTO;
import groupd.backend.Entities.Destination;
import groupd.backend.Exceptions.ResourceNotFoundException;
import groupd.backend.Repositories.DestinationRepository;
import groupd.backend.Repositories.FlightRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FlightServace {
    private final FlightRepository flightRepository;
    private final DestinationRepository destRepo;


    public List<FlightManagemenRequesttDTO> findAllFlights() {
        return flightRepository.findAll();
    }


    public FlightManagemenRequesttDTO findFlightById(Long id) {
        return flightRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Flight not found with id: " + id));
    }


    public void createFlight(@Valid FlightManagemenRequesttDTO dto) {
        if (flightRepository.existsByFlightNumber(dto.getFlightNumber())) {
            throw new RuntimeException("Flight number already exists");
        }

        Destination destination = destRepo.findById(dto.getDestination().getDestId())
                .orElseThrow(() -> new ResourceNotFoundException("Destination not found"));

        FlightManagemenRequesttDTO newFlight = new FlightManagemenRequesttDTO();
        newFlight.setFlightNumber(dto.getFlightNumber());
        newFlight.setAirlineName(dto.getAirlineName());
        newFlight.setDepartureAirport(dto.getDepartureAirport());
        newFlight.setArrivalAirport(dto.getArrivalAirport());
        newFlight.setDepartureTime(dto.getDepartureTime());
        newFlight.setArrivalTime(dto.getArrivalTime());
        newFlight.setTotalCapacity(dto.getTotalCapacity());
        newFlight.setPrice(dto.getPrice());
        newFlight.setDestination(destination);

        flightRepository.save(newFlight);
    }

    public void deleteFlight(Long id) {
        if (!flightRepository.existsById(id)) {
            throw new ResourceNotFoundException("Cannot delete, Flight not found with id: " + id);
        }
        flightRepository.deleteById(id);
    }

    public FlightManagemenRequesttDTO updateFlight(Long id, FlightManagemenRequesttDTO dto) {
        FlightManagemenRequesttDTO existingFlight = findFlightById(id);

        Destination destination = destRepo.findById(dto.getDestination().getDestId())
                .orElseThrow(() -> new ResourceNotFoundException("Destination not found"));

        existingFlight.setFlightNumber(dto.getFlightNumber());
        existingFlight.setAirlineName(dto.getAirlineName());
        existingFlight.setDepartureAirport(dto.getDepartureAirport());
        existingFlight.setArrivalAirport(dto.getArrivalAirport());
        existingFlight.setDepartureTime(dto.getDepartureTime());
        existingFlight.setArrivalTime(dto.getArrivalTime());
        existingFlight.setTotalCapacity(dto.getTotalCapacity());
        existingFlight.setPrice(dto.getPrice());
        existingFlight.setDestination(destination);

        return flightRepository.save(existingFlight);
    }
}
