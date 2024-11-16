package ru.kazenin.pursit.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.kazenin.model.SitterDto;
import ru.kazenin.pursit.domain.SitterEntity;
import ru.kazenin.pursit.exception.NotFoundException;
import ru.kazenin.pursit.jpa.SitterJpa;
import ru.kazenin.pursit.mapper.SitterMapper;
import ru.kazenin.pursit.service.SittersService;

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
    public SitterDto getById(UUID sitterId) {
        return sitterMapper.toDto(
                sitterJpa.findById(sitterId)
                        .orElseThrow(() -> new NotFoundException(SitterEntity.class, sitterId)));
    }
}
