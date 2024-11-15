package ru.kazenin.pursit.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class PursitException extends RuntimeException {

    private final String errorMessage;
    private final int errorCode;

    public PursitException(String message, HttpStatus code) {
        super(message);
        this.errorMessage = message;
        this.errorCode = code.value();
    }
}
