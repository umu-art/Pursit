package ru.kazenin.pursit.service;

import ru.kazenin.model.SitterDto;

import java.util.List;
import java.util.UUID;

public interface SittersService {

    List<SitterDto> getAll();

    SitterDto getById(UUID sitterId);
}
