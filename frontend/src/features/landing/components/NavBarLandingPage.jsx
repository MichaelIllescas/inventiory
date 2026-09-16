import React, { useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';

import logo from '../../../assets/img/logo.png';

const NavBarLandingPage = () => {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
const navigate = useNavigate();

  
const handleScroll = (e, targetId) => {
  e.preventDefault();
  setExpanded(false);

  if (location.pathname === "/") {
    // Scroll dentro de la landing
    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  } else {
    // Redirige a la landing con el hash
    navigate(`/#${targetId}`);
  }
  setExpanded(false); // Cierra el menú después de hacer scroll
};
  
  return (
    <Navbar
      bg=""
      expand="lg"
      fixed="top"
      className="shadow-sm py-2 nav"
      expanded={expanded}
    >
      <Container>
        <Link to="/" className="navbar-brand d-flex align-items-center text-white">
          <img
            src={logo}
            width="40"
            height="40"
            alt="Logo Inventiory"
            className="me-2 rotate-center"
          />
        </Link>

        <Navbar.Toggle
          aria-controls="main-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />

        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link href="#inicio" onClick={(e) => handleScroll(e, 'inicio')}>
              Inicio
            </Nav.Link>
            <Nav.Link href="#beneficios" onClick={(e) => handleScroll(e, 'beneficios')}>
              Beneficios
            </Nav.Link>
            <Nav.Link href="#precios" onClick={(e) => handleScroll(e, 'precios')}>
              Planes
            </Nav.Link>
            <Nav.Link href="#faq" onClick={(e) => handleScroll(e, 'faq')}>
              FAQ
            </Nav.Link>
            <Nav.Link href="#contact" onClick={(e) => handleScroll(e, 'contact')}>
              Contacto
            </Nav.Link>

            <Nav.Item className="ms-3 w-lg-auto my-2 my-lg-0">
              <Link to="/registerFreeTrial" onClick={() => setExpanded(false)}>
                <Button variant="success" size="md">
                  Probar Gratis
                </Button>
              </Link>
            </Nav.Item>

            <Nav.Item className="ms-3 w-lg-auto my-2 my-lg-0">
              <Link
                to="/login"
                className="text-secondary small text-decoration-none"
                onClick={() => setExpanded(false)}
              >
                <strong className="btn btn-primary">Iniciar sesión</strong>
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarLandingPage;
