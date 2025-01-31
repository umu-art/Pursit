package ru.kazenin.pursit.media.configuration;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class S3Config {
    @Value("${s3.url}")
    private String url;

    @Value("${s3.key.access}")
    private String accessKey;

    @Value("${s3.key.secret}")
    private String accessKeySecret;

    @Value("${s3.region}")
    private String bucketRegion;

    @Bean
    public AmazonS3 getAwsS3Client() {
        BasicAWSCredentials basicAWSCredentials = new BasicAWSCredentials(accessKey, accessKeySecret);

        return AmazonS3ClientBuilder
                .standard()
                .withCredentials(new AWSStaticCredentialsProvider(basicAWSCredentials))
                .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(url, bucketRegion))
                .withPathStyleAccessEnabled(true)
                .build();
    }
}
