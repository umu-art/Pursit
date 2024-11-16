package ru.kazenin.pursit.mapper;

import org.mapstruct.Mapper;
import ru.kazenin.model.SitterDto;
import ru.kazenin.pursit.domain.SitterEntity;
import ru.kazenin.pursit.domain.SitterPhotoEntity;

@Mapper(componentModel = "spring")
public interface SitterMapper {

    SitterDto toDto(SitterEntity sitterEntity);

    default String map(SitterPhotoEntity sitterPhotoEntity) {
        return sitterPhotoEntity.getPhotoUrl();
    }
}
