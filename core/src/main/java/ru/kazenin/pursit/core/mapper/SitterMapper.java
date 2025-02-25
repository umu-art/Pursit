package ru.kazenin.pursit.core.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import ru.kazenin.pursit.core.domain.SitterEntity;
import ru.kazenin.pursit.core.domain.SitterPhotoEntity;
import ru.kazenin.pursit.model.SitterDto;

@Mapper(componentModel = "spring")
public interface SitterMapper {

    SitterDto toDto(SitterEntity sitterEntity);

    SitterEntity toEntity(SitterDto sitterDto);

    void update(@MappingTarget SitterEntity entity, SitterDto sitterDto);

    default String map(SitterPhotoEntity sitterPhotoEntity) {
        return sitterPhotoEntity.getPhotoId();
    }

    default SitterPhotoEntity map(String s) {
        var res = new SitterPhotoEntity();
        res.setPhotoId(s);
        return res;
    }
}
