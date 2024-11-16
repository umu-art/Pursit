package ru.kazenin.pursit.exception;

import org.springframework.http.HttpStatus;

import java.util.UUID;

public class NotFoundException extends PursitException {

    public NotFoundException(Class<?> clazz, UUID id) {
        super(String.format("Entity %s with id %s not found", clazz.getSimpleName(), id), HttpStatus.NOT_FOUND);
    }

}
