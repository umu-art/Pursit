package ru.kazenin.pursit.core.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.kazenin.pursit.model.SitterDto;
import ru.kazenin.pursit.core.jpa.SitterJpa;
import ru.kazenin.pursit.core.mapper.SitterMapper;
import ru.kazenin.pursit.core.service.SittersService;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class SittersServiceImpl implements SittersService {

    private final SitterJpa sitterJpa;
    private final SitterMapper sitterMapper;

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

        entity.getGeolocation().setSitter(entity);
        entity.getPhotos()
                .forEach(photo -> photo.setSitter(entity));

        sitterJpa.save(entity);
    }
}
