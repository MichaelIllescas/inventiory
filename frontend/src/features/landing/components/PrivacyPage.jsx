import React from 'react';
import { Container } from 'react-bootstrap';

const PrivacyPage = () => {
  return (
    <section className="py-0" >
      <Container>
        <h4 className=" mb-3">Política de Privacidad</h4>
        <hr />
        <p><strong>Fecha de entrada en vigencia:</strong> 2 de abril de 2025</p>
        <p>Tu privacidad es importante para nosotros. Esta política explica qué datos recopilamos y cómo los usamos.</p>
        <ul>
          <li><strong>Datos que recopilamos:</strong> Recopilamos información como nombre, correo electrónico, actividad dentro del sistema y datos de contacto proporcionados voluntariamente.</li>
          <li><strong>Uso de los datos:</strong> Usamos la información para ofrecer y mejorar el servicio, contactar al usuario y enviar notificaciones relacionadas con el sistema.</li>
          <li><strong>Protección de datos:</strong> Implementamos medidas de seguridad para proteger tu información personal.</li>
          <li><strong>Compartir información:</strong> No compartimos tus datos con terceros, salvo requerimiento legal.</li>
          <li><strong>Acceso y eliminación:</strong> Podés solicitar acceder, modificar o eliminar tu información escribiendo a <strong>info@imperial-net.com</strong>.</li>
        </ul>
        <p>Gracias por confiar en Inventiory.</p>
      </Container>
    </section>
  );
};

export default PrivacyPage;
