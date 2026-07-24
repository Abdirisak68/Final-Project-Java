package groupd.backend.Services;

import groupd.backend.Dto.UserDTO;
import groupd.backend.Entities.User;
import groupd.backend.Repositories.UserRepository;
import groupd.backend.Exceptions.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserDTO getProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return UserDTO.fromEntity(user);
    }

   public List<UserDTO> findAllUsers() {
        List<User> users = userRepository.findAll();
        List<UserDTO> userDTOs = new ArrayList<>();
        for (User user : users) {
            userDTOs.add(UserDTO.fromEntity(user));
        }
        return userDTOs;
   }

    public long countActiveUsers() {
        return userRepository.countByActive(true);
    }

    public void deleteUser(Long id, String loggedInEmail) {
        User userToDelete = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        if (userToDelete.getEmail().equals(loggedInEmail)) {
            throw new IllegalArgumentException("You cannot delete your own logged-in account.");
        }
        userRepository.deleteById(id);
    }

    public UserDTO changeUserActive(Long id, String loggedInEmail) {
        User userToToggle = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        if (userToToggle.getEmail().equals(loggedInEmail)) {
            throw new IllegalArgumentException("You cannot deactivate your own account status.");
        }
        userToToggle.setActive(!userToToggle.isActive());
        userRepository.save(userToToggle);
        return UserDTO.fromEntity(userToToggle);
    }
}
