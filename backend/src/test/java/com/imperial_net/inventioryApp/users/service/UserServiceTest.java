package com.imperial_net.inventioryApp.users.service;

import com.imperial_net.inventioryApp.auth.service.CookieService;
import com.imperial_net.inventioryApp.email.service.EmailService;
import com.imperial_net.inventioryApp.users.model.ResetToken;
import com.imperial_net.inventioryApp.users.model.User;
import com.imperial_net.inventioryApp.users.repository.ResetTokenRepository;
import com.imperial_net.inventioryApp.users.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private CookieService cookieService;

    @Mock
    private ResetTokenRepository resetTokenRepository;

    @Mock
    private EmailService emailService;

    @Test
    void sendsProfessionalResetPasswordEmailWithGeneratedTokenLink() {
        User user = User.builder()
                .firstName("Juan <Admin>")
                .email("juan@correo.com")
                .build();
        when(userRepository.findByEmail("juan@correo.com")).thenReturn(Optional.of(user));

        UserService userService = new UserService(
                userRepository,
                passwordEncoder,
                cookieService,
                resetTokenRepository,
                emailService
        );

        userService.sendResetToken("juan@correo.com");

        ArgumentCaptor<ResetToken> resetTokenCaptor = ArgumentCaptor.forClass(ResetToken.class);
        verify(resetTokenRepository).save(resetTokenCaptor.capture());

        String expectedLink = "http://localhost:3000/reset-password?token=" + resetTokenCaptor.getValue().getToken();
        ArgumentCaptor<String> htmlCaptor = ArgumentCaptor.forClass(String.class);
        verify(emailService).sendHtml(
                org.mockito.ArgumentMatchers.eq("juan@correo.com"),
                org.mockito.ArgumentMatchers.eq("Restablecé tu contraseña de Inventiory"),
                htmlCaptor.capture()
        );

        String html = htmlCaptor.getValue();
        assertTrue(html.contains("Restablecimiento de contraseña"));
        assertTrue(html.contains("Restablecer contraseña"));
        assertTrue(html.contains("Juan &lt;Admin&gt;"));
        assertTrue(html.contains(expectedLink));
        assertTrue(html.contains("30 minutos"));
    }

    @Test
    void doesNotSendResetEmailWhenUserDoesNotExist() {
        when(userRepository.findByEmail("nadie@correo.com")).thenReturn(Optional.empty());
        UserService userService = new UserService(
                userRepository,
                passwordEncoder,
                cookieService,
                resetTokenRepository,
                emailService
        );

        userService.sendResetToken("nadie@correo.com");

        verify(resetTokenRepository, never()).save(org.mockito.ArgumentMatchers.any());
        verify(emailService, never()).sendHtml(
                org.mockito.ArgumentMatchers.anyString(),
                org.mockito.ArgumentMatchers.anyString(),
                org.mockito.ArgumentMatchers.anyString()
        );
    }
}
