import React, { useState, useEffect } from "react";
import useAnnualIncome from "../api/useAnnualIncome";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const AnnualIncomePage = () => {
  const currentYear = new Date().getFullYear().toString(); // Año actual
  const [year, setYear] = useState(currentYear);
  const { income, loading, error, fetchAnnualIncome } = useAnnualIncome();

  useEffect(() => {
    fetchAnnualIncome(year);
  }, [year, fetchAnnualIncome]);

  // Evita errores con valores indefinidos
  const safeIncome = income || {
    grossIncome: 0,
    totalCost: 0,
    grossProfit: 0,
    totalExpenses: 0,
    netResult: 0,
    salesCount: 0,
  };

  const formatCurrency = (value) => `$${Number(value || 0).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const chartData = [
    { name: "Ventas", value: Number(safeIncome.grossIncome || 0) },
    { name: "Gastos", value: Number(safeIncome.totalExpenses || 0) },
  ];

  return (
    <div className="container mt-5 pt-4">
      <div className="card shadow">
        <div className="card-header bg-dark text-white">
          <h5 className="mb-0">Ingresos Anuales</h5>
        </div>
        <div className="card-body">
          {/* Selector de año */}
          <div className="mb-3">
            <label className="form-label">Seleccionar Año:</label>
            <input
              type="number"
              className="form-control w-50"
              value={year}
              min="2000"
              max={currentYear}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>

          {/* Mensajes de carga y error */}
          {loading && <p className="text-center text-muted">Cargando datos de ingresos...</p>}
          {error && <p className="text-danger text-center">{error}</p>}

          {/* Gráfico */}
          {!loading && (
            <>
              <div className="row g-3 mb-4">
                {[['Ventas del año', safeIncome.grossIncome, 'primary'], ['Gastos del año', safeIncome.totalExpenses, 'warning'], ['Resultado neto', safeIncome.netResult, safeIncome.netResult >= 0 ? 'success' : 'danger']].map(([label, value, color]) => (
                  <div className="col-md-4" key={label}>
                    <div className={`border-start border-4 border-${color} bg-white rounded p-3 h-100`}>
                      <span className="text-muted">{label}</span>
                      <h3 className={`text-${color} mb-0`}>{formatCurrency(value)}</h3>
                    </div>
                  </div>
                ))}
              </div>

              <div className="row g-4 align-items-stretch">
                <div className="col-md-6">
                  <div className="bg-white rounded p-3 h-100" style={{ minHeight: 360 }}>
                <h5 className="text-center mb-2">Ventas y gastos del año</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={85} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                      {chartData.map((entry, index) => <Cell key={entry.name} fill={['#0d6efd', '#f0ad00'][index]} />)}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
                  </div>
                </div>

              {/* Información detallada */}
                <div className="col-md-6">
                  <div className="text-start p-3 h-100">
                  <div className="d-flex justify-content-between border-bottom py-2">
                    <h6 className="fw-bold">Total Vendido:</h6>
                    <p className="fw-bold text-primary mb-0">{formatCurrency(safeIncome.grossIncome)}</p>
                  </div>
                  <p className="text-muted">Total de ingresos obtenidos por ventas en el año.</p>

                  <div className="d-flex justify-content-between border-bottom py-2">
                    <h6 className="fw-bold">Gastos del año:</h6>
                    <p className="fw-bold text-warning mb-0">{formatCurrency(safeIncome.totalExpenses)}</p>
                  </div>
                  <p className="text-muted">Total de gastos registrados en el año.</p>

                 

                  <div className="d-flex justify-content-between border-bottom py-2">
                    <h6 className="fw-bold">Resultado Neto:</h6>
                    <p className="fw-bold text-success mb-0">{formatCurrency(safeIncome.netResult)}</p>
                  </div>
                  <p className="text-muted">Ventas realizadas menos gastos del año.</p>

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

export default AnnualIncomePage;
