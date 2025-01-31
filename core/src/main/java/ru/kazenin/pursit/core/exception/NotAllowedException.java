package ru.kazenin.pursit.core.exception;

import org.springframework.http.HttpStatus;

public class NotAllowedException extends PursitException {
    public NotAllowedException() {
        super("Доступ запрещен", HttpStatus.FORBIDDEN);
    }
}
