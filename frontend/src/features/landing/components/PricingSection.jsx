import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PricingSection = () => {
  return (
    <section className="py-5 text-white" id="precios">
      <Container>
        <h2 className="text-center fw-bold mb-5 text-white">
          Planes y precios
        </h2>
        <p className="text-center text-white mb-4">
          Comenzá gratis. Elegí el plan que mejor se adapta a tu negocio.
        </p>
        <div className="container py-5">
  <Row className="justify-content-center g-4">
    {/* Plan Gratuito */}
    <Col xs={12} md={6} lg={4}>
      <Card className="text-center shadow-sm border-0 h-100">
        <Card.Body className="d-flex flex-column">
          <h5 className="fw-bold text-success mb-3">Plan Gratuito</h5>
          <h2 className="fw-bold text-dark">
            $0<span className="fs-6 text-muted">/mes</span>
          </h2>
          <p className="text-muted mb-4">
            Incluye todas las funcionalidades del sistema hasta diez registros.
          </p>
          <ul className="list-unstyled text-start mb-4 w-100">
            <li>✔️ Control de stock en tiempo real</li>
            <li>✔️ Facturación automática</li>
            <li>✔️ Reportes y alertas</li>
            <li>✔️ Soporte por email</li>
            <li>✔️ 10 Registros por sección</li>
          </ul>
          <div className="mt-auto">
             <Link to="/registerFreeTrial">
            <Button variant="success" size="lg" href="/registro">
              Comenzá gratis
            </Button>
             </Link>
          </div>
        </Card.Body>
      </Card>
    </Col>

    {/* Plan Pro */}
    <Col xs={12} md={6} lg={4}>
      <Card className="text-center shadow-sm border-0 h-100">
        <Card.Body className="d-flex flex-column">
          <h5 className="fw-bold text-success mb-3">Plan Pro</h5>
          <h2 className="fw-bold text-dark">
            $15.000<span className="fs-6 text-muted">/mes</span>
          </h2>
          <p className="text-muted mb-4">
            Incluye todas las funcionalidades del sistema sin límites.
          </p>
          <ul className="list-unstyled text-start mb-4 w-100">
            <li>✔️ Control de stock en tiempo real</li>
            <li>✔️ Facturación automática</li>
            <li>✔️ Reportes y alertas</li>
            <li>✔️ Soporte por email</li>
            <li>✔️ Uso ilimitado</li>
          </ul>
          <div className="mt-auto">
            <Link to={"/registerPro"}>
            <Button variant="success" size="lg" href="/registro">
              Suscríbete
            </Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
  </Row>
</div>

      </Container>
    </section>
  );
};

export default PricingSection;
