package ru.kazenin.pursit.core.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kazenin.pursit.core.configuration.auth.JwtAuthFilter;
import ru.kazenin.pursit.core.domain.UserEntity;
import ru.kazenin.pursit.core.domain.UserLinkEntity;
import ru.kazenin.pursit.core.exception.NotAllowedException;
import ru.kazenin.pursit.core.jpa.UserJpa;
import ru.kazenin.pursit.core.jpa.UserLinkJpa;
import ru.kazenin.pursit.core.service.UserService;
import ru.kazenin.pursit.model.UserDto;

import java.util.Optional;
import java.util.UUID;

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
    public UserEntity register(UserEntity user) {
        log.debug("register: {}", user);
        user.setId(UUID.randomUUID());
        return userJpa.save(user);
    }

    @Override
    @Transactional(readOnly = true)
    public UserDto getSelf() {
        var entity = JwtAuthFilter.getPerformer();
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
        var entity = JwtAuthFilter.getPerformer();
        log.debug("link: {} -> {}", entity.getUsername(), rumId);

        if (userLinkJpa.existsByUserIdAndRumId(entity.getId(), rumId)) {
            return;
        }

        var link = new UserLinkEntity();
        link.setUserId(entity.getId());
        link.setRumId(rumId);
        userLinkJpa.save(link);
    }

    @Override
    public void requireAdmin() {
        var entity = JwtAuthFilter.getPerformer();
        log.debug("requireAdmin: {}", entity.getUsername());

        if (!entity.isAdmin()) {
            throw new NotAllowedException();
        }
    }

    @Override
    public UserDto toDto(UserEntity entity) {
        return new UserDto()
                .id(String.valueOf(entity.getId()))
                .username(entity.getUsername())
                .email(entity.getEmail());
    }
}
