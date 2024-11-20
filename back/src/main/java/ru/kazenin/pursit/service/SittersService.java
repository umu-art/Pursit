package ru.kazenin.pursit.service;

import ru.kazenin.model.SitterDto;

import java.util.List;
import java.util.UUID;

public interface SittersService {

    List<SitterDto> getAll();

    List<SitterDto> getByIds(List<UUID> sittersIds);

    void createSitter(SitterDto sitterDto);
}
