package ru.kazenin.pursit.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.UUID;

@Data
@Entity
@Table(name = "sitters_photo")
public class SitterPhotoEntity {
    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne(targetEntity = SitterEntity.class)
    @JoinColumn(name = "sitter_id", nullable = false)
    private SitterEntity sitter;

    @Column(name = "photo_url", nullable = false)
    private String photoUrl;
}
