package ru.kazenin.pursit.core.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import ru.kazenin.pursit.api.HelpApi;
import ru.kazenin.pursit.model.HelpDto;
import ru.kazenin.pursit.core.configuration.TelegramBot;

@Slf4j
@Controller
@RequiredArgsConstructor
public class HelpController implements HelpApi {

    private final TelegramBot telegramBot;

    @Override
    public ResponseEntity<Void> sendHelp(HelpDto helpDto) {
        log.info("sendHelp: {}", helpDto);
        StringBuilder text = new StringBuilder("Сообщение из эллипсоида:").append("\n");

        for (var field : HelpDto.class.getDeclaredFields()) {
            try {
                field.setAccessible(true);

                text
                        .append(field.getName())
                        .append(": ")
                        .append(field.get(helpDto))
                        .append("\n");
            } catch (IllegalAccessException e) {
                log.error("Ошибка процессинга: ", e);
            }
        }

        telegramBot.sendHelp(text.toString());

        return ResponseEntity.ok().build();
    }
}
