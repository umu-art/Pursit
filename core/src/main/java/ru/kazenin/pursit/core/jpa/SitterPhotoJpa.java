package ru.kazenin.pursit.core.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.kazenin.pursit.core.domain.SitterPhotoEntity;

import java.util.UUID;

public interface SitterPhotoJpa extends JpaRepository<SitterPhotoEntity, UUID> {
}
