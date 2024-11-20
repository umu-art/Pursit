package ru.kazenin.pursit.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import ru.kazenin.api.SittersApi;
import ru.kazenin.model.SitterDto;
import ru.kazenin.model.SitterRequestDto;
import ru.kazenin.pursit.configuration.TelegramBot;
import ru.kazenin.pursit.jpa.SitterJpa;
import ru.kazenin.pursit.service.SittersService;

import java.util.List;
import java.util.UUID;

import static ru.kazenin.pursit.configuration.auth.JwtAuthFilter.getPerformer;

@Slf4j
@Controller
@RequiredArgsConstructor
public class SittersController implements SittersApi {

    private final TelegramBot telegramBot;
    private final SittersService sittersService;
    private final SitterJpa sitterJpa;

    @Override
    public ResponseEntity<Void> createSitter(SitterDto sitterDto) {
        sittersService.createSitter(sitterDto);
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

        var user = getPerformer();
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
