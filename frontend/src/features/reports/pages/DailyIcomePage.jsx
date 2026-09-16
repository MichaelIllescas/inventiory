import React, { useState, useEffect } from "react";
import useDailyIncome from "../api/useDailyIncome";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const DailyIncomePage = () => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const { income, loading, error, fetchDailyIncome } = useDailyIncome();

  useEffect(() => {
    fetchDailyIncome(date);
  }, [date, fetchDailyIncome]);

  // Asegurar que income no sea undefined o null
  const safeIncome = income || {
    grossIncome: 0,
    totalCost: 0,
    grossProfit: 0,
    totalExpenses: 0,
    netResult: 0,
    salesCount: 0,
  };

  const formatCurrency = (value) =>
    `$${Number(value || 0).toLocaleString("es-AR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const chartData = [
    { name: "Ventas", value: Number(safeIncome.grossIncome || 0) },
    { name: "Gastos", value: Number(safeIncome.totalExpenses || 0) },
  ];
  const chartColors = ["#0d6efd", "#f0ad00"];

  return (
    <div className="container mt-5 pt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Ingresos Diarios</h5>
        </div>
        <div className="card-body">
          {/* Selector de fecha */}
          <div className="mb-3">
            <label className="form-label">Seleccionar Fecha:</label>
            <input
              type="date"
              className="form-control w-50"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Mensajes de carga y error */}
          {loading && (
            <p className="text-center text-muted">
              Cargando datos de ingresos...
            </p>
          )}
          {error && <p className="text-danger text-center">{error}</p>}

              {/* Resumen visual */}
          {!loading && (
            <>
              <div className="row g-3 mb-4">
                <div className="col-md-4">
                  <div className="border-start border-4 border-primary bg-white rounded p-3 h-100">
                    <span className="text-muted">Ventas del día</span>
                    <h3 className="text-primary mb-0">{formatCurrency(safeIncome.grossIncome)}</h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="border-start border-4 border-warning bg-white rounded p-3 h-100">
                    <span className="text-muted">Gastos del día</span>
                    <h3 className="text-warning mb-0">{formatCurrency(safeIncome.totalExpenses)}</h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className={`border-start border-4 ${safeIncome.netResult >= 0 ? "border-success" : "border-danger"} bg-white rounded p-3 h-100`}>
                    <span className="text-muted">Resultado neto</span>
                    <h3 className={`${safeIncome.netResult >= 0 ? "text-success" : "text-danger"} mb-0`}>
                      {formatCurrency(safeIncome.netResult)}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="row g-4 align-items-stretch">
                <div className="col-md-6">
                  <div className="bg-white rounded p-3 h-100" style={{ minHeight: 360 }}>
                    <h5 className="text-center mb-2">Ventas y gastos del día</h5>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={85}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={entry.name} fill={chartColors[index]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="text-start mt-0 p-3 h-100">
                  <div className="d-flex justify-content-between border-bottom py-2">
                    <h6 className="fw-bold">Total Vendido:</h6>
                    <p className="fw-bold text-primary mb-0">
                      ${(safeIncome.grossIncome ?? 0).toLocaleString()}
                    </p>
                  </div>
                  <p className="text-muted">
                    Total cobrado por las ventas realizadas en el día.
                  </p>

                  <div className="d-flex justify-content-between border-bottom py-2">
                    <h6 className="fw-bold">Gastos del día:</h6>
                    <p className="fw-bold text-warning mb-0">
                      ${(safeIncome.totalExpenses ?? 0).toLocaleString()}
                    </p>
                  </div>
                  <p className="text-muted">
                    Total de gastos registrados en el día.
                  </p>

                 

                  <div className="d-flex justify-content-between border-bottom py-2">
                    <h6 className="fw-bold">Resultado Neto:</h6>
                    <p className="fw-bold text-success mb-0">
                      ${(safeIncome.netResult ?? 0).toLocaleString()}
                    </p>
                  </div>
                  <p className="text-muted">
                    Ventas realizadas menos gastos del día.
                  </p>

                  <div className="d-flex justify-content-between border-bottom py-2">
                    <h6 className="fw-bold">Ventas realizadas:</h6>
                    <p className="fw-bold mb-0">{safeIncome.salesCount ?? 0}</p>
                  </div>

                  
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyIncomePage;
