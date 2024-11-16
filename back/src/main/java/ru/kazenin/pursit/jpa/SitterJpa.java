package ru.kazenin.pursit.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.kazenin.pursit.domain.SitterEntity;

import java.util.UUID;

@Repository
public interface SitterJpa extends JpaRepository<SitterEntity, UUID> {
}
