import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/es";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const DailyEarningsChart = ({ prod }) => {
  const labels = prod?.map((item) =>
    dayjs(item.date).locale("es").format("ddd") // "lun", "mar", etc.
  ) || [];

  const dataValues = prod?.map((item) => Number(item.profit)) || [];

  const data = {
    labels,
    datasets: [
      {
        label: "Ganancias últimos 7 días",
        data: dataValues,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.3,
        pointBackgroundColor: "rgba(75,192,192,1)",
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="card p-3">
      <h4 className="text-center">📈 Ganancias Diarias por ventas (últimos 7 días)</h4>
      <h6 className="text-center">(ventas-costos)</h6>
      <div style={{ height: "300px" }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default DailyEarningsChart;
