import React from "react";

const TotalProductsCard = ({ prod }) => {
  const totalProducts = prod || 0;

  return (
    <div className="card bg-success text-white p-3 text-center">
      <h4>📦 Productos Registrados</h4>
      <h2 className="fw-bold">{totalProducts}</h2>
    </div>
  );
};

export default TotalProductsCard;
