package ru.kazenin.pursit.media.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import ru.kazenin.pursit.api.MediaApi;
import ru.kazenin.pursit.media.service.MediaService;
import ru.kazenin.pursit.model.UploadResultDto;

@Controller
@RequiredArgsConstructor
public class MediaController implements MediaApi {

    private final MediaService mediaService;

    @Override
    public ResponseEntity<Resource> download(String id) {
        return ResponseEntity.ok(mediaService.download(id));
    }

    @Override
    public ResponseEntity<UploadResultDto> upload(Resource body) {
        return ResponseEntity.ok(mediaService.upload(body));
    }
}
