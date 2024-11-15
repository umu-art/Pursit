package ru.kazenin.pursit.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.kazenin.pursit.domain.UserLinkEntity;

import java.util.UUID;

@Repository
public interface UserLinkJpa extends JpaRepository<UserLinkEntity, UUID> {

    boolean existsByUserIdAndRumId(UUID userId, String rumId);
}
