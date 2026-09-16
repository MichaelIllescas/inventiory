import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import heroImage from '../../../assets/img/pyme.jpg';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section
      id="inicio"
      className=" min-vh-100 d-flex align-items-center"
    >
      <Container>
        <Row className="align-items-center">
          {/* Texto */}
          <Col
            md={6}
            className="mb-4 mb-md-0 order-2 order-md-1 text-center text-md-start"
          >
            <h1 className="display-4 fw-bold ">
            Digitalizá la gestión de tu Negocio con una solución simple y efectiva
            </h1>
            <p className="lead ">
            Inventiory centraliza el control de tus productos, la información de tus clientes y ventas para que tomes decisiones inteligentes y ahorres tiempo en tus procesos de negocio.
            </p>
             <Link to="/registerFreeTrial">
            <Button variant="success" size="lg" href="#registro" className='mt-3'>
              Prueba Inventiory Gratis
            </Button>
             </Link>
          </Col>

          {/* Imagen */}
          <Col md={6} className="order-1 order-md-2 text-center ">
            <img
              src={heroImage}
              alt="Sistema Inventiory"
              className="img-fluid shadow image-hero-sm"
              style={{}}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
