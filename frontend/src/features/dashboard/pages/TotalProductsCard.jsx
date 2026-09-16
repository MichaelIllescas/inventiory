import React from "react";
import { Package } from "lucide-react";

const TotalProductsCard = ({ prod }) => {
  const totalProducts = prod || 0;

  return (
    <div className="card bg-success text-white p-3 text-center">
      <h4 className="d-flex align-items-center justify-content-center gap-2"><Package size={20} strokeWidth={1.75} /> Productos Registrados</h4>
      <h2 className="fw-bold">{totalProducts}</h2>
    </div>
  );
};

export default TotalProductsCard;
