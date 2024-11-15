package ru.kazenin.pursit.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.kazenin.pursit.domain.UserEntity;


import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserJpa extends JpaRepository<UserEntity, UUID> {

    Optional<UserEntity> findByUsername(String username);

    Optional<UserEntity> findByEmail(String email);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    List<UserEntity> searchByUsernameContainingIgnoreCase(String username);
}
