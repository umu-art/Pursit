package ru.kazenin.pursit.core.configuration;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

import java.net.UnknownHostException;

@Slf4j
@Component
public class TelegramBot extends TelegramLongPollingBot {

    private final TelegramBotParameters telegramBotParameters;

    TelegramBot(TelegramBotParameters telegramBotParameters) throws TelegramApiException, UnknownHostException {
        super(telegramBotParameters.botToken);
        this.telegramBotParameters = telegramBotParameters;

//        log.trace("Tg account: {}", execute(new GetMe()));
//        log.trace("Tg chat: {}", execute(new GetChat(telegramBotParameters.masterChatId)));
//
//        sendMain(String.format("started on %s at %s", InetAddress.getLocalHost().getHostName(), new Date()));
    }

    @Override
    public String getBotUsername() {
        return telegramBotParameters.botUsername;
    }

    @Override
    public void onRegister() {
        super.onRegister();
    }

    @Override
    public void onUpdateReceived(Update update) {
        // :)
    }

    public void sendMain(String text) {
        send(text, 0);
    }

    public void sendUsers(String text) {
        send(text, telegramBotParameters.userTopicId);
    }

    public void sendHelp(String text) {
        send(text, telegramBotParameters.helpTopicId);
    }

    public void sendSittersRequest(String text) {
        send(text, telegramBotParameters.sittersRequestTopicId);
    }

    public void send(String text, int topic) {
        try {
            var message = new SendMessage(telegramBotParameters.masterChatId, text);
            if (topic != 0) {
                message.setMessageThreadId(topic);
            }
            this.executeAsync(message);
        } catch (TelegramApiException e) {
            log.error("Ошибка отправки сообщения в tg", e);
        }
    }

    @Component
    public static class TelegramBotParameters {

        @Value("${telegram-bot.username}")
        private String botUsername;

        @Value("${telegram-bot.token}")
        private String botToken;

        @Value("${telegram-bot.master-chat-id}")
        private String masterChatId;

        @Value("${telegram-bot.help-topic-id}")
        private int helpTopicId;

        @Value("${telegram-bot.users-topic-id}")
        private int userTopicId;

        @Value("${telegram-bot.sitters-request-topic-id}")
        private int sittersRequestTopicId;
    }
}
