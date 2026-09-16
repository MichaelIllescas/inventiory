import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const ContactSection = () => {
  return (
    <section className="py-5 " id="contact">
      <Container>
        <h2 className="text-center fw-bold mb-5 text-white">
          ¿Tenés dudas? Contactanos
        </h2>
        <Row>
          {/* Formulario */}
          <Col md={6} className="mb-4 mb-md-0">
            <Form>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Tu nombre" required />
              </Form.Group>

              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control type="email" placeholder="tucorreo@ejemplo.com" required />
              </Form.Group>

              <Form.Group controlId="message" className="mb-3">
                <Form.Label>Mensaje</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Escribí tu consulta..." required />
              </Form.Group>

              <Button variant="primary"  type="submit">
                Enviar mensaje
              </Button>
            </Form>
          </Col>

         {/* Datos de contacto */}
<Col md={6}>
  <div className="h-100 d-flex flex-column justify-content-center">
    <p className="text-white mt-0">
      <strong>Inventiory</strong> es un sistema desarrollado por <strong>Imperial-Net</strong>, una empresa tecnológica emergente comprometida con la digitalización de Empersas en Trenque Lauquen y la zona.
    </p>
    <p><strong>Email:</strong> info@imperial-net.com</p>
    <p><strong>Teléfonos:</strong> 2923 530179 o 2392 543053</p>
    <p><strong>Ubicación:</strong> Trenque Lauquen, Buenos Aires, Argentina</p>
    <p className="text-white mt-3">
      Te responderemos lo antes posible para ayudarte a comenzar con Inventiory y la transformación digital de tu negocio.
    </p>
  </div>
</Col>

        </Row>
      </Container>
    </section>
  );
};

export default ContactSection;
