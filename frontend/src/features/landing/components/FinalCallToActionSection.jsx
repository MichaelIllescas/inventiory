import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FinalCallToActionSection = () => {
  return (
    <section className="py-5 bg-primary text-white text-center" id="cta-final">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <h2 className="fw-bold mb-4">
              Da el primer paso hacia la digitalización de tu Empresa
            </h2>
            <p className="lead mb-4">
              Un sistema simple, profesional y diseñado para hacer crecer tu negocio. Sin complicaciones, de manera sencilla y eficiente.
            </p>
             <Link to="/registerFreeTrial" >
            <Button variant="success" size="lg" href="/registro">
              Empieza Gratis Ahora
            </Button>
             </Link>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default FinalCallToActionSection;
