package ru.kazenin.pursit.core.exception;

import org.springframework.http.HttpStatus;

public class BadRequestException extends PursitException {
    public BadRequestException(String message) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}
