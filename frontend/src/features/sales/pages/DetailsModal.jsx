import React from "react";
import { Modal, Button } from "react-bootstrap";

const DetailsModal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  return (
    <Modal show={isOpen} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Detalles de la Venta</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Datos del Cliente */}
        <div>
          <p>
            <strong className="m-2">Datos del Cliente:</strong>{" "}
            {data.client ? " " : "No Asignado"}
          </p>
          {data.client && (
            <div className="d-flex">
              <div className="col-6">
                <p>
                  <strong>Cliente:</strong> {data.client?.name || "No Asignado"}
                </p>
                <p>
                  <strong>Apellido:</strong> {data.client?.lastname || "No Asignado"}
                </p>
              </div>
              <div className="col-6">
                <p>
                  <strong>D.N.I.:</strong> {data.client?.documentNumber || "No Disponible"}
                </p>
                <p>
                  <strong>Teléfono:</strong> {data.client?.phone || "No Disponible"}
                </p>
              </div>
            </div>
          )}
        </div>
        <hr />

        {/* Información de la Venta */}
        <div className="d-flex">
          <div className="col-6">
            <p>
              <strong className="m-2">Id:</strong> {data.id}
            </p>
            <p>
              <strong className="m-2">Estado:</strong> {data.status}
            </p>
          </div>
          <div className="col-6">
            <p>
              <strong className="m-2">Fecha de Venta:</strong> {data.saleDate}
            </p>
            <p>
              <strong className="m-2">Forma de Pago:</strong> {data.paymentMethod}
            </p>
          </div>
        </div>
        <hr />

        {/* Tabla de Productos */}
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">Cod.</th>
                <th scope="col">Descripción</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Precio Unitario</th>
                <th scope="col">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {data.saleDetails.map((item) => (
                <tr key={item.id}>
                  <td>{item.productCode}</td>
                  <td>
                    {item.productName} {item.productDescription},{" "}
                    {item.productBrandName}, {item.productCategory}
                  </td>
                  <td>{item.productQuantity}</td>
                  <td>${item.productSalePrice.toFixed(2)}</td>
                  <td>${item.subtotal.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="5" className="text-end px-4">
                <strong className="mx-1">Recargos: </strong>{data.extra_charge_percentage}%   <strong className="mx-1">Decuentos: </strong> {data.discountApplied}% <strong className=" mx-2">Total:</strong> ${data.totalSale.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetailsModal;
