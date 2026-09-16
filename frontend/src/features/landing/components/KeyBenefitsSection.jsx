import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaClock, FaChartLine, FaEye } from 'react-icons/fa';

const KeyBenefitsSection = () => {
  return (
    <section className="py-5 bg-white" id="beneficios">
      <Container>
        <h2 className="text-center fw-bold mb-5 text-dark">
          Beneficios Clave para tu Negocio
        </h2>
        <Row className="g-4">
          {/* Time saving */}
          <Col md={4}>
            <Card className="h-100 shadow-sm border-0 text-center">
              <Card.Body>
                <FaClock size={40} className="mb-3 text-dark" />
                <Card.Title className="fw-bold">Ahorro de tiempo</Card.Title>
                <Card.Text>
                  <p>
                    Automatiza tareas repetitivas y dedicá tu tiempo a lo que realmente importa: hacer crecer tu negocio.
                    </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Total control */}
          <Col md={4}>
            <Card className="h-100 shadow-sm border-0 text-center">
              <Card.Body>
                <FaEye size={40} className="mb-3 text-primary" />
                <Card.Title className="fw-bold">Control total</Card.Title>
                <Card.Text>
                  Visualizá el estado de tus productos y tus ventas en tiempo real desde cualquier dispositivo.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Increase profits */}
          <Col md={4}>
            <Card className="h-100 shadow-sm border-0 text-center">
              <Card.Body>
                <FaChartLine size={40} className="mb-3 text-warning" />
                <Card.Title className="fw-bold">Incrementa tus ganancias</Card.Title>
                <Card.Text>
                  Tomá decisiones inteligentes con reportes automáticos que te ayudan a optimizar tu rentabilidad.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default KeyBenefitsSection;
