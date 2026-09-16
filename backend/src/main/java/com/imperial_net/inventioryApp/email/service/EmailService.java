package com.imperial_net.inventioryApp.email.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailPreparationException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;

/**
 * Servicio responsable de enviar correos electrónicos simples.
 */
@Service
@RequiredArgsConstructor
public class EmailService {

    /**
     * Componente de Spring encargado del envío de correos.
     */
    private final JavaMailSender mailSender;

    /**
     * Envía un correo electrónico con asunto y contenido especificados.
     *
     * @param to      dirección de correo electrónico del destinatario.
     * @param subject asunto del correo.
     * @param content contenido del mensaje.
     */
    public void send(String to, String subject, String content) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(content);
        message.setFrom("info@imperial-net.com");

        mailSender.send(message);
    }

    /**
     * Envía un correo electrónico con contenido HTML.
     *
     * @param to      dirección de correo electrónico del destinatario.
     * @param subject asunto del correo.
     * @param html    contenido HTML del mensaje.
     */
    public void sendHtml(String to, String subject, String html) {
        MimeMessage message = mailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(
                    message,
                    false,
                    StandardCharsets.UTF_8.name()
            );
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(html, true);
            helper.setFrom("info@imperial-net.com");
        } catch (MessagingException e) {
            throw new MailPreparationException("No se pudo preparar el email HTML.", e);
        }

        mailSender.send(message);
    }
}
