import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Mapeo de número de mes a nombre (opcional)
const monthNames = {
  1: "Enero",
  2: "Febrero",
  3: "Marzo",
  4: "Abril",
  5: "Mayo",
  6: "Junio",
  7: "Julio",
  8: "Agosto",
  9: "Septiembre",
  10: "Octubre",
  11: "Noviembre",
  12: "Diciembre",
};

const QuarterlyEarningsChart = ({ prod }) => {
  const labels = prod?.map(item => monthNames[item.month]) || [];
  const dataValues = prod?.map(item => Number(item.profit)) || [];

  const data = {
    labels,
    datasets: [
      {
        label: "Ganancia por Mes",
        data: dataValues,
        backgroundColor: "rgba(255, 159, 64, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="card p-3">
      <h4 className="text-center">📊 Ganancias netas del Trimestre</h4>
      <h6 className="text-center">(ventas-costos-gastos operativos)</h6>
      <div style={{ height: "300px" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default QuarterlyEarningsChart;
