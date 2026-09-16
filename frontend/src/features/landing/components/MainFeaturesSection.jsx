import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  FaWarehouse,
  FaFileInvoiceDollar,
  FaChartPie,
  FaBell,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";

const MainFeaturesSection = () => {
  return (
    <section className="py-5 bg-white" id="caracteristicas">
      <Container>
        <h2 className="text-center fw-bold mb-5 text-dark">
          Características Principales
        </h2>
        <Row className="g-4">
          {/* Control de stock inteligente */}
          <Col md={6}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body className="d-flex align-items-start">
                <FaWarehouse size={30} className="me-3 text-success" />
                <div>
                  <Card.Title className="fw-bold">
                    Control de stock inteligente
                  </Card.Title>
                  <Card.Text>
                    Inventiory actualiza el inventario en tiempo real con cada
                    venta o ingreso de productos.
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Facturación automática */}
          <Col md={6}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body className="d-flex align-items-start">
                <FaFileInvoiceDollar size={30} className="me-3 text-primary" />
                <div>
                  <Card.Title className="fw-bold">
                    Facturación digital y automática
                  </Card.Title>
                  <Card.Text>
                    Generá facturas al instante con los datos de cada venta y
                    descargalas listas para imprimir o enviar.
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Reportes claros */}
          <Col md={6}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body className="d-flex align-items-start">
                <FaChartPie size={30} className="me-3 text-warning" />
                <div>
                  <Card.Title className="fw-bold">
                    Reportes claros y útiles
                  </Card.Title>
                  <Card.Text>
                    Visualizá tus ventas, costos y ganancias mensuales para
                    tomar decisiones acertadas.
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Alertas automáticas */}
          <Col md={6}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body className="d-flex align-items-start">
                <FaBell size={30} className="me-3 text-danger" />
                <div>
                  <Card.Title className="fw-bold">
                    Alertas automáticas de stock bajo
                  </Card.Title>
                  <Card.Text>
                    Mantenete informado en tiempo real cuando un producto esté
                    por debajo del mínimo configurado.
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
          {/* Ranking de clientes */}
          <Col md={6}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body className="d-flex align-items-start">
                <FaUsers size={30} className="me-3 text-primary" />
                <div>
                  <Card.Title className="fw-bold">
                    Ranking de clientes
                  </Card.Title>
                  <Card.Text>
                    Visualizá cuáles son tus mejores clientes para optimizar tus estrategias de negocio.
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
          {/* Cálculo de rentabilidad */}
          <Col md={6}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body className="d-flex align-items-start">
                <FaChartLine size={30} className="me-3 text-success" />
                <div>
                  <Card.Title className="fw-bold">
                    Cálculo automático de rentabilidad
                  </Card.Title>
                  <Card.Text>
                  Conocé que tan rentalbe es tu negocio en base a la información registrada.

                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default MainFeaturesSection;
