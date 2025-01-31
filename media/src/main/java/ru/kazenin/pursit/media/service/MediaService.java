package ru.kazenin.pursit.media.service;

import org.springframework.core.io.Resource;
import ru.kazenin.pursit.model.UploadResultDto;

public interface MediaService {

    Resource download(String id);

    UploadResultDto upload(Resource body);
}
