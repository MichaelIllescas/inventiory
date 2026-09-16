package com.imperial_net.inventioryApp.email.service;

import jakarta.mail.Session;
import jakarta.mail.internet.MimeMessage;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.javamail.JavaMailSender;

import java.util.Properties;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class EmailServiceTest {

    @Mock
    private JavaMailSender mailSender;

    @Test
    void sendsHtmlEmailWithExpectedHeadersAndBody() throws Exception {
        MimeMessage mimeMessage = new MimeMessage(Session.getInstance(new Properties()));
        when(mailSender.createMimeMessage()).thenReturn(mimeMessage);

        EmailService emailService = new EmailService(mailSender);

        emailService.sendHtml(
                "cliente@correo.com",
                "Restablecé tu contraseña",
                "<strong>Contenido profesional</strong>"
        );

        ArgumentCaptor<MimeMessage> messageCaptor = ArgumentCaptor.forClass(MimeMessage.class);
        verify(mailSender).send(messageCaptor.capture());

        MimeMessage sentMessage = messageCaptor.getValue();
        assertEquals("Restablecé tu contraseña", sentMessage.getSubject());
        assertEquals("info@imperial-net.com", sentMessage.getFrom()[0].toString());
        assertEquals("cliente@correo.com", sentMessage.getAllRecipients()[0].toString());
        assertTrue(sentMessage.getContent().toString().contains("<strong>Contenido profesional</strong>"));
    }
}
