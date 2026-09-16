import { PiggyBank } from "lucide-react";

const TotalInvestmentCard = ({ prod }) => {
  const businessValue = prod || 0;

  return (
    <div className="card bg-success text-white p-3 text-center">
      <h4 className="d-flex align-items-center justify-content-center gap-2"><PiggyBank size={20} strokeWidth={1.75} /> Total Actual del Negocio</h4>
      <h2 className="fw-bold">${businessValue.toLocaleString()}</h2>
    </div>
  );
};

export default TotalInvestmentCard;
