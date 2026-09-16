import React from "react";
import { CalendarDays } from "lucide-react";

const MonthlyEarningsCard = ({ prod }) => {
  const gananciasMes = prod || 0;

  return (
    <div className="card bg-primary text-white p-3 text-center">
      <h4 className="d-flex align-items-center justify-content-center gap-2"><CalendarDays size={20} strokeWidth={1.75} /> Ganancias del Mes</h4>
      <h2 className="fw-bold">${gananciasMes.toLocaleString()}</h2>
    </div>
  );
};

export default MonthlyEarningsCard;
