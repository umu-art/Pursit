package ru.kazenin.pursit.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kazenin.model.UserDto;
import ru.kazenin.pursit.domain.UserEntity;
import ru.kazenin.pursit.domain.UserLinkEntity;
import ru.kazenin.pursit.jpa.UserJpa;
import ru.kazenin.pursit.jpa.UserLinkJpa;
import ru.kazenin.pursit.service.UserService;

import java.util.Optional;
import java.util.UUID;

import static ru.kazenin.pursit.configuration.auth.JwtAuthFilter.getPerformer;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserJpa userJpa;
    private final UserLinkJpa userLinkJpa;

    @Override
    @Transactional(readOnly = true)
    public UserEntity loadUserByUsername(String username) throws UsernameNotFoundException {
        log.debug("loadUserByUsername: {}", username);
        return userJpa.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Пользователь не найден"));
    }

    @Override
    @Transactional(readOnly = true)
    public boolean existsByUsername(String username) {
        log.debug("existsByUsername: {}", username);
        return userJpa.existsByUsername(username);
    }

    @Override
    public boolean existsByEmail(String email) {
        log.debug("existsByEmail: {}", email);
        return userJpa.existsByEmail(email);
    }

    @Override
    @Transactional
    public void register(UserEntity user) {
        log.debug("register: {}", user);
        user.setId(UUID.randomUUID());
        userJpa.save(user);
    }

    @Override
    @Transactional(readOnly = true)
    public UserDto getSelf() {
        var entity = getPerformer();
        log.debug("getSelf: {}", entity.getUsername());
        return toDto(entity);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<UserDto> getByEmail(String email) {
        log.debug("getByEmail: {}", email);
        var entity = userJpa.findByEmail(email);
        return entity.map(this::toDto);
    }

    @Override
    @Transactional
    public void link(String rumId) {
        var entity = getPerformer();
        log.debug("link: {} -> {}", entity.getUsername(), rumId);

        if (userLinkJpa.existsByUserIdAndRumId(entity.getId(), rumId)) {
            return;
        }

        var link = new UserLinkEntity();
        link.setUserId(entity.getId());
        link.setRumId(rumId);
        userLinkJpa.save(link);
    }

    private UserDto toDto(UserEntity entity) {
        return new UserDto()
                .id(String.valueOf(entity.getId()))
                .username(entity.getUsername())
                .email(entity.getEmail());
    }
}
