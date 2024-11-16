package ru.kazenin.pursit.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.UUID;

@Data
@Entity
@Table(name = "sitters_geo")
public class SitterGeolocationEntity {
    @Id
    private UUID id;

    @OneToOne(targetEntity = SitterEntity.class)
    @JoinColumn(name = "sitter_id", nullable = false)
    private SitterEntity sitter;

    @Column(name = "latitude", nullable = false)
    private double latitude;

    @Column(name = "longitude", nullable = false)
    private double longitude;

    @Column(name = "name", nullable = false)
    private String name;
}
