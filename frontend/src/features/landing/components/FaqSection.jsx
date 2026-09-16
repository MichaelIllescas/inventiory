import React from "react";
import { Container, Accordion } from "react-bootstrap";

const FaqSection = () => {
  return (
    <section className="py-5 bg-white" id="faq">
      <Container>
        <h2 className="text-center fw-bold mb-5 text-dark">
          Preguntas Frecuentes
        </h2>

        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>¿Inventiory es fácil de usar?</Accordion.Header>
            <Accordion.Body>
              Sí. Fue diseñado pensando su facilidad de uso, sin necesidad de
              conocimientos técnicos.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>
              ¿Qué pasa si necesito capacitación para su uso?
            </Accordion.Header>
            <Accordion.Body>
              Podés ponerte en contacto con el equipo y te brindrán el apoyo
              necesario para que puedas utlizarlo sin problemas.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              ¿Cómo contacto al equipo para asesoramiento?
            </Accordion.Header>
            <Accordion.Body>
              Podés enviar un correo electrónico a info@imperial-net.com o por
              WhatsApp al 02923530179 o 02392543053.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header>
              ¿Necesito registrar clientes para vender?
            </Accordion.Header>
            <Accordion.Body>
              No es obligatorio, pero es recomendable. Podés registrar ventas
              rápidas sin información del cliente o incorporarlo al momento de
              registrar la venta para tener el historial.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="4">
            <Accordion.Header>¿Mis datos están seguros?</Accordion.Header>
            <Accordion.Body>
              Absolutamente. Usamos conexiones cifradas y almacenamiento seguro
              para proteger tu información.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="5">
            <Accordion.Header>
              ¿Puedo cancelar la suscripción cuando quiera?
            </Accordion.Header>
            <Accordion.Body>
              Sí. No hay contratos ni permanencia mínima. Podés cancelar en
              cualquier momento.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="6">
            <Accordion.Header>
              ¿Puedo usar Inventiory desde el celular?
            </Accordion.Header>
            <Accordion.Body>
              Sí. Inventiory es una aplicación web adaptable, lo que significa
              que podés acceder y usarla cómodamente desde tu celular, tablet o
              computadora sin necesidad de instalar nada.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="10">
            <Accordion.Header>
              ¿Qué medios de pago aceptan para el Plan Pro?
            </Accordion.Header>
            <Accordion.Body>
              Podés abonar el Plan Pro mediante transferencia bancaria, Mercado
              Pago o cualquier otra billetera virtual. Si necesitás otro medio de
              pago, podés consultarnos y lo coordinamos.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </section>
  );
};

export default FaqSection;
