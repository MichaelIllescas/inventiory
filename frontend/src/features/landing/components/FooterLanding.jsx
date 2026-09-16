import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <small>&copy; {new Date().getFullYear()} Inventiory. Todos los derechos reservados.</small>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <Link to="/terminos" className="text-white me-3 text-decoration-none">
              Términos y condiciones
            </Link>
            <Link to="/privacidad" className="text-white text-decoration-none">
              Política de privacidad
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
