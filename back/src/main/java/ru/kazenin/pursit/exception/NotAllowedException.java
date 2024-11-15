package ru.kazenin.pursit.exception;

import org.springframework.http.HttpStatus;

public class NotAllowedException extends PursitException {
    public NotAllowedException() {
        super("Доступ запрещен", HttpStatus.FORBIDDEN);
    }
}
