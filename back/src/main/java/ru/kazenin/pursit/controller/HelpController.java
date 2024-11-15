package ru.kazenin.pursit.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import ru.kazenin.api.HelpApi;
import ru.kazenin.model.HelpDto;

@Slf4j
@Controller
@RequiredArgsConstructor
public class HelpController implements HelpApi {

    @Override
    public ResponseEntity<Void> sendHelp(@Valid HelpDto helpDto) {
        return null;
    }
}
