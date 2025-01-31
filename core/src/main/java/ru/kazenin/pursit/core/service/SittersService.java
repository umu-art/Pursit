package ru.kazenin.pursit.core.service;

import ru.kazenin.pursit.model.SitterDto;

import java.util.List;
import java.util.UUID;

public interface SittersService {

    List<SitterDto> getAll();

    List<SitterDto> getByIds(List<UUID> sittersIds);

    void upsert(SitterDto sitterDto);
}
