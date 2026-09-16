import React, { useState, useEffect } from "react";
import useAnnualIncome from "../api/useAnnualIncome";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

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
  };

  // Datos para la gráfica
  const data = [
    { name: "Ingresos Brutos", value: safeIncome.grossIncome },
    { name: "Costo Total", value: safeIncome.totalCost },
    { name: "Ganancia Neta", value: safeIncome.grossProfit },
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
              <div className="chart-container mb-4" style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#343a40" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Información detallada */}
              <div className="row justify-content-center text-start mt-4">
                <div className="col-md-8">
                  <div className="d-flex justify-content-between border-bottom py-2">
                    <h6 className="fw-bold">Total Vendido:</h6>
                    <p className="fw-bold text-primary mb-0">${(safeIncome.grossIncome ?? 0).toLocaleString()}</p>
                  </div>
                  <p className="text-muted">Total de ingresos obtenidos por ventas en el año.</p>

                  <div className="d-flex justify-content-between border-bottom py-2">
                    <h6 className="fw-bold">Costo Total:</h6>
                    <p className="fw-bold text-warning mb-0">${(safeIncome.totalCost ?? 0).toLocaleString()}</p>
                  </div>
                  <p className="text-muted">Costo de compra de los productos vendidos en el año.</p>

                 

                  <div className="d-flex justify-content-between border-bottom py-2">
                    <h6 className="fw-bold">Ganancia Neta:</h6>
                    <p className="fw-bold text-success mb-0">${(safeIncome.grossProfit ?? 0).toLocaleString()}</p>
                  </div>
                  <p className="text-muted">Total Vendido menos el Costo Total.</p>

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
