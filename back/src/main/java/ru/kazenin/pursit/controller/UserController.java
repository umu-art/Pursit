package ru.kazenin.pursit.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Controller;
import ru.kazenin.api.UserApi;
import ru.kazenin.model.AuthDto;
import ru.kazenin.model.LinkRequest;
import ru.kazenin.model.RegisterDto;
import ru.kazenin.model.UserDto;
import ru.kazenin.pursit.configuration.TelegramBot;
import ru.kazenin.pursit.domain.UserEntity;
import ru.kazenin.pursit.exception.BadRequestException;
import ru.kazenin.pursit.service.UserService;
import ru.kazenin.pursit.service.impl.JwtService;

import static ru.kazenin.pursit.configuration.auth.JwtAuthFilter.AUTH_COOKIE;

@Slf4j
@Controller
@RequiredArgsConstructor
public class UserController implements UserApi {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserService userService;
    private final TelegramBot telegramBot;

    @Override
    public ResponseEntity<Void> register(RegisterDto registerDto) {
        log.debug("register: {}", registerDto);

        if (userService.existsByUsername(registerDto.getUsername())) {
            throw new BadRequestException("Пользователь с таким никнеймом уже существует");
        }

        if (userService.existsByEmail(registerDto.getEmail())) {
            throw new BadRequestException("На этот email уже есть аккаунт");
        }

        UserEntity user = new UserEntity();
        user.setUsername(registerDto.getUsername());
        user.setPassword(registerDto.getPassword());
        user.setEmail(registerDto.getEmail());

        userService.register(user);

        var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(registerDto.getUsername(), registerDto.getPassword()));

        var token = jwtService.generateJwtToken(authentication);

        telegramBot.sendUsers("Новый пользователь: " + registerDto.getEmail());

        return ResponseEntity.ok()
                .header("Set-Cookie", AUTH_COOKIE + "=" + token + "; Path=/; HttpOnly; SameSite=Strict")
                .build();
    }

    @Override
    public ResponseEntity<Void> login(AuthDto authDto) {
        log.debug("login: {}", authDto);
        var user = userService.getByEmail(authDto.getEmail());

        if (user.isEmpty()) {
            throw new BadCredentialsException("Неверный email или пароль");
        }

        var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.get().getUsername(), authDto.getPassword()));

        var token = jwtService.generateJwtToken(authentication);

        telegramBot.sendUsers("Вход: " + authDto.getEmail());

        return ResponseEntity.ok()
                .header("Set-Cookie", AUTH_COOKIE + "=" + token + "; Path=/; HttpOnly; SameSite=Strict")
                .build();
    }

    @Override
    public ResponseEntity<Void> logout() {
        return ResponseEntity.ok()
                .header("Set-Cookie", AUTH_COOKIE + "=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT")
                .build();
    }

    @Override
    public ResponseEntity<UserDto> getSelf() {
        return ResponseEntity.ok(userService.getSelf());
    }

    @Override
    public ResponseEntity<Void> link(LinkRequest linkRequest) {
        userService.link(linkRequest.getRumId());
        return ResponseEntity.ok().build();
    }
}
