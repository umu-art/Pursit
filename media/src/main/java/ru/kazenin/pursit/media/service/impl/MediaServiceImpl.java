package ru.kazenin.pursit.media.service.impl;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import ru.kazenin.pursit.media.service.MediaService;
import ru.kazenin.pursit.model.UploadResultDto;

import java.io.IOException;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class MediaServiceImpl implements MediaService {

    private final AmazonS3 amazonS3;

    @Value("${s3.bucket}")
    private String bucket;

    @Override
    public Resource download(String id) {
        S3Object s3Object = amazonS3.getObject(bucket, id);
        S3ObjectInputStream inputStream = s3Object.getObjectContent();
        return new InputStreamResource(inputStream);
    }

    @Override
    public UploadResultDto upload(Resource body) {
        var result = new UploadResultDto(UUID.randomUUID().toString());
        try {
            var metadata = new ObjectMetadata();
            metadata.setContentLength(body.contentLength());
            amazonS3.putObject(bucket, result.getMediaId(), body.getInputStream(), metadata);
            return result;
        } catch (IOException e) {
            log.error("Failed to upload:", e);
            throw new RuntimeException(e);
        }
    }
}
