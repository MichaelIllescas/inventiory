import React from "react";

const TotalEarningsCard = ({ prod }) => {
  const totalGanancias = prod || 0;

  return (
    <div className="card bg-success text-white p-3 text-center">
      <h4>💰 Ganancias Totales</h4>
      <h2 className="fw-bold">${totalGanancias.toLocaleString()}</h2>
    </div>
  );
};

export default TotalEarningsCard;
