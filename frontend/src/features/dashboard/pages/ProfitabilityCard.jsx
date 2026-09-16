import React from "react";

const ProfitabilityCard = ({ prod }) => {
  const rentabilidad = prod || 0;

  return (
    <div className="card bg-warning text-dark p-3 text-center">
      <h4>📊 Rentabilidad del Negocio</h4>
      <h2 className="fw-bold">{rentabilidad.toFixed(2)}%</h2>
    </div>
  );
};

export default ProfitabilityCard;
