package ru.kazenin.pursit.service;

import ru.kazenin.model.UserDto;
import ru.kazenin.pursit.domain.UserEntity;

import java.util.Optional;

public interface UserService {

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    void register(UserEntity user);

    UserDto getSelf();

    Optional<UserDto> getByEmail(String email);

    void link(String rumId);

}
