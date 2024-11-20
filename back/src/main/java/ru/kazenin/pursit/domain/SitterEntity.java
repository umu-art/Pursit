package ru.kazenin.pursit.domain;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import ru.kazenin.model.SitterType;

import java.util.List;
import java.util.UUID;

@Data
@Entity
@Table(name = "sitters")
public class SitterEntity {
    @Id
    private UUID id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "type", nullable = false)
    @Enumerated(EnumType.STRING)
    private SitterType type;

    @Column(name = "avatar_url", nullable = false)
    private String avatarUrl;

    @Column(name = "short_description", nullable = false)
    private String shortDescription;

    @Column(name = "long_description", nullable = false)
    private String longDescription;

    @Column(name = "price_description", nullable = false)
    private int price;

    @Column(name = "contacts", nullable = false)
    private String contacts;

    @Column(name = "experience", nullable = false)
    private int experience;

    @Column(name = "ready_come_itself", nullable = false)
    private boolean readyComeItself;

    @Column(name = "takes_cats", nullable = false)
    private boolean takesCats;

    @Column(name = "takes_dogs", nullable = false)
    private boolean takesDogs;

    @OneToMany(mappedBy = "sitter", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @Fetch(FetchMode.SUBSELECT)
    private List<SitterPhotoEntity> photosUrls;

    @OneToOne(mappedBy = "sitter", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @Fetch(FetchMode.JOIN)
    private SitterGeolocationEntity geolocation;
}
