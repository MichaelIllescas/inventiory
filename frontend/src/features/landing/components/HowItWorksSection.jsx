import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaUserPlus, FaCogs, FaBoxes } from 'react-icons/fa';

const HowItWorksSection = () => {
  return (
    <section className="py-5 " id="como-funciona">
      <Container>
        <h2 className="text-center fw-bold mb-5 text-white">
          ¿Cómo funciona Inventiory?
        </h2>
        <Row className="g-4">
          {/* Paso 1: Registro */}
          <Col md={4}>
            <Card className="h-100 shadow-sm border-0 text-center">
              <Card.Body>
                <FaUserPlus size={40} className="mb-3 text-success" />
                <Card.Title className="fw-bold">Regístrate gratis</Card.Title>
                <Card.Text>
                  Comenzá en minutos creando tu cuenta sin compromiso. ¡Es rápido y gratuito!
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Paso 2: Personalización */}
          <Col md={4}>
            <Card className="h-100 shadow-sm border-0 text-center">
              <Card.Body>
                <FaCogs size={40} className="mb-3 text-primary" />
                <Card.Title className="fw-bold">Personalizá tu perfil empresarial</Card.Title>
                <Card.Text>
                  Cargá tus productos, sus precios, proveedores, compras y otros gastos operativos.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Paso 3: Gestión */}
          <Col md={4}>
            <Card className="h-100 shadow-sm border-0 text-center">
              <Card.Body>
                <FaBoxes size={40} className="mb-3 text-warning" />
                <Card.Title className="fw-bold">Empezá a gestionar</Card.Title>
                <Card.Text>
                  Registrá ventas, clientes (opcional), y el sistema se encarga del resto: stock, alertas e informes.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HowItWorksSection;
