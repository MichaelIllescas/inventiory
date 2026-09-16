import React from "react";
import { Users } from "lucide-react";

const TotalCustomersCard = ({ prod }) => {
  const totalCustomers = prod || 0;

  return (
    <div className="card bg-primary text-white p-3 text-center">
      <h4 className="d-flex align-items-center justify-content-center gap-2"><Users size={20} strokeWidth={1.75} /> Clientes Registrados</h4>
      <h2 className="fw-bold">{totalCustomers}</h2>
    </div>
  );
};

export default TotalCustomersCard;
