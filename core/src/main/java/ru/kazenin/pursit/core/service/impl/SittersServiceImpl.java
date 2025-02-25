package ru.kazenin.pursit.core.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.kazenin.pursit.core.jpa.SitterJpa;
import ru.kazenin.pursit.core.jpa.SitterPhotoJpa;
import ru.kazenin.pursit.core.mapper.SitterMapper;
import ru.kazenin.pursit.core.service.SittersService;
import ru.kazenin.pursit.model.SitterDto;

import java.util.List;
import java.util.UUID;

import static java.util.Objects.nonNull;

@Slf4j
@Service
@RequiredArgsConstructor
public class SittersServiceImpl implements SittersService {

    private final SitterJpa sitterJpa;
    private final SitterMapper sitterMapper;
    private final SitterPhotoJpa sitterPhotoJpa;

    @Override
    public List<SitterDto> getAll() {
        return sitterJpa.findAll()
                .stream()
                .map(sitterMapper::toDto)
                .toList();
    }

    @Override
    public List<SitterDto> getByIds(List<UUID> sittersIds) {
        return sitterJpa.findAllByIdIn(sittersIds)
                .stream()
                .map(sitterMapper::toDto)
                .toList();
    }

    @Override
    public void upsert(SitterDto sitterDto) {
        var entity = sitterMapper.toEntity(sitterDto);

        if (nonNull(entity.getId())) {
            var existingEntity = sitterJpa.findById(entity.getId());
            if (existingEntity.isPresent() && nonNull(existingEntity.get().getGeolocation())) {
                entity.getGeolocation().setId(existingEntity.get().getGeolocation().getId());
                sitterPhotoJpa.deleteAll(existingEntity.get().getPhotos());
            }
        }

        entity.getGeolocation().setSitter(entity);
        entity.getPhotos()
                .forEach(photo -> photo.setSitter(entity));

        sitterJpa.save(entity);
    }

    @Override
    public void delete(UUID sitterId) {
        sitterJpa.deleteById(sitterId);
    }
}
