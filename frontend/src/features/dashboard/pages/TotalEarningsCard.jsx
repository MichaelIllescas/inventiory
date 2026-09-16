import React from "react";
import { Wallet } from "lucide-react";

const TotalEarningsCard = ({ prod }) => {
  const totalGanancias = prod || 0;

  return (
    <div className="card bg-success text-white p-3 text-center">
      <h4 className="d-flex align-items-center justify-content-center gap-2"><Wallet size={20} strokeWidth={1.75} /> Ganancias Totales</h4>
      <h2 className="fw-bold">${totalGanancias.toLocaleString()}</h2>
    </div>
  );
};

export default TotalEarningsCard;
