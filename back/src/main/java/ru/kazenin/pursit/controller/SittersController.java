package ru.kazenin.pursit.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import ru.kazenin.api.SittersApi;
import ru.kazenin.model.SitterDto;
import ru.kazenin.model.SitterRequestDto;

import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
public class SittersController implements SittersApi {

    @Override
    public ResponseEntity<List<SitterDto>> getSitters() {
        return null;
    }

    @Override
    public ResponseEntity<Void> sendRequest(@Valid SitterRequestDto sitterRequestDto) {
        return null;
    }
}
