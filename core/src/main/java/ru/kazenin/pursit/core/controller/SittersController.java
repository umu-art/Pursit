package ru.kazenin.pursit.core.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import ru.kazenin.pursit.api.SittersApi;
import ru.kazenin.pursit.model.SitterDto;
import ru.kazenin.pursit.model.SitterRequestDto;
import ru.kazenin.pursit.core.configuration.TelegramBot;
import ru.kazenin.pursit.core.configuration.auth.JwtAuthFilter;
import ru.kazenin.pursit.core.jpa.SitterJpa;
import ru.kazenin.pursit.core.service.SittersService;

import java.util.List;
import java.util.UUID;

@Slf4j
@Controller
@RequiredArgsConstructor
public class SittersController implements SittersApi {

    private final TelegramBot telegramBot;
    private final SittersService sittersService;
    private final SitterJpa sitterJpa;

    @Override
    public ResponseEntity<Void> upsertSitter(SitterDto sitterDto) {
        sittersService.upsert(sitterDto);
        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity<List<SitterDto>> getSitters() {
        log.info("getSitters");
        return ResponseEntity.ok(sittersService.getAll());
    }

    @Override
    public ResponseEntity<List<SitterDto>> getSittersByIds(List<UUID> sittersIds) {
        return ResponseEntity.ok(sittersService.getByIds(sittersIds));
    }

    @Override
    public ResponseEntity<Void> sendRequest(SitterRequestDto sitterRequestDto) {
        log.info("sendRequest: {}", sitterRequestDto);
        StringBuilder text = new StringBuilder("Запрос на передержку:").append("\n");

        var user = JwtAuthFilter.getPerformer();
        text
                .append("Заказчик: ")
                .append(user.getUsername())
                .append(" ")
                .append(user.getEmail())
                .append("\n");

        var sitters = sitterJpa.findAllByIdIn(sitterRequestDto.getSitterIds());
        sitters.forEach(sitter ->
                text
                        .append("Ситтер: ")
                        .append(sitter.getName())
                        .append(" ")
                        .append(sitter.getContacts())
                        .append("\n"));


        for (var field : SitterRequestDto.class.getDeclaredFields()) {
            try {
                field.setAccessible(true);

                text
                        .append(field.getName())
                        .append(": ")
                        .append(field.get(sitterRequestDto))
                        .append("\n");
            } catch (IllegalAccessException e) {
                log.error("Ошибка процессинга: ", e);
            }
        }

        telegramBot.sendSittersRequest(text.toString());

        return ResponseEntity.ok().build();
    }
}
