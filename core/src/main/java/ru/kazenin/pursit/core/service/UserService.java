package ru.kazenin.pursit.core.service;

import ru.kazenin.pursit.core.domain.UserEntity;
import ru.kazenin.pursit.model.UserDto;

import java.util.Optional;

public interface UserService {

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    UserEntity register(UserEntity user);

    UserDto getSelf();

    Optional<UserDto> getByEmail(String email);

    void link(String rumId);

    void requireAdmin();

    UserDto toDto(UserEntity entity);
}
