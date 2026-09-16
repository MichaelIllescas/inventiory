import React from "react";

const TotalCustomersCard = ({ prod }) => {
  const totalCustomers = prod || 0;

  return (
    <div className="card bg-primary text-white p-3 text-center">
      <h4>👥 Clientes Registrados</h4>
      <h2 className="fw-bold">{totalCustomers}</h2>
    </div>
  );
};

export default TotalCustomersCard;
