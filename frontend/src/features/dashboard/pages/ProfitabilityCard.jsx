import React from "react";
import { Percent } from "lucide-react";

const ProfitabilityCard = ({ prod }) => {
  const rentabilidad = prod || 0;

  return (
    <div className="card bg-warning text-dark p-3 text-center">
      <h4 className="d-flex align-items-center justify-content-center gap-2"><Percent size={20} strokeWidth={1.75} /> Rentabilidad del Negocio</h4>
      <h2 className="fw-bold">{rentabilidad.toFixed(2)}%</h2>
    </div>
  );
};

export default ProfitabilityCard;
