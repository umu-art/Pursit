package ru.kazenin.pursit.core.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.kazenin.pursit.core.domain.SitterEntity;

import java.util.List;
import java.util.UUID;

@Repository
public interface SitterJpa extends JpaRepository<SitterEntity, UUID> {

    List<SitterEntity> findAllByIdIn(List<UUID> uuids);

}
