package ru.kazenin.pursit.media.service.impl;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.NotImplementedException;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import ru.kazenin.pursit.media.service.MediaService;
import ru.kazenin.pursit.model.UploadResultDto;

@Service
@RequiredArgsConstructor
public class MediaServiceImpl implements MediaService {

    @Override
    public Resource download(String id) {
        throw new NotImplementedException();
    }

    @Override
    public UploadResultDto upload(Resource body) {
        throw new NotImplementedException();
    }
}
