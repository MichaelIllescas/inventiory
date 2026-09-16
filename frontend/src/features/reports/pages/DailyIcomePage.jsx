import React, { useState, useEffect } from "react";
import useDailyIncome from "../api/useDailyIncome";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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

          {/* Gráfico */}
          {!loading && (
            <>
              <div
                className="chart-container mb-4"
                style={{ width: "100%", height: 300 }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#007bff" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Información en texto debajo del gráfico */}
              <div className="row justify-content-center text-start mt-4">
                <div className="col-md-8">
                  <div className="d-flex justify-content-between border-bottom py-2">
                    <h6 className="fw-bold">Total Vendido:</h6>
                    <p className="fw-bold text-primary mb-0">
                      ${(safeIncome.grossIncome ?? 0).toLocaleString()}
                    </p>
                  </div>
                  <p className="text-muted">
                    Total de ingresos obtenidos por ventas en el día, sin
                    considerar costos ni descuentos.
                  </p>

                  <div className="d-flex justify-content-between border-bottom py-2">
                    <h6 className="fw-bold">Costo Total:</h6>
                    <p className="fw-bold text-warning mb-0">
                      ${(safeIncome.totalCost ?? 0).toLocaleString()}
                    </p>
                  </div>
                  <p className="text-muted">
                    Costo de compra de los productos vendidos en el día.
                  </p>

                 

                  <div className="d-flex justify-content-between border-bottom py-2">
                    <h6 className="fw-bold">Ganancia Neta:</h6>
                    <p className="fw-bold text-success mb-0">
                      ${(safeIncome.grossProfit ?? 0).toLocaleString()}
                    </p>
                  </div>
                  <p className="text-muted">
                    Total Vendido menos el Costo Total. Representa la
                    ganancia final obtenida.
                  </p>

                  
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
