package ru.kazenin.pursit.mapper;

import org.mapstruct.Mapper;
import ru.kazenin.model.SitterDto;
import ru.kazenin.pursit.domain.SitterEntity;
import ru.kazenin.pursit.domain.SitterPhotoEntity;

@Mapper(componentModel = "spring")
public interface SitterMapper {

    SitterDto toDto(SitterEntity sitterEntity);

    SitterEntity toEntity(SitterDto sitterDto);

    default String map(SitterPhotoEntity sitterPhotoEntity) {
        return sitterPhotoEntity.getPhotoUrl();
    }

    default SitterPhotoEntity map(String s) {
        var res = new SitterPhotoEntity();
        res.setPhotoUrl(s);
        return res;
    }
}
