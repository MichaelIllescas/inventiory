import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useProfitability from "../api/useProfitability"; // Importamos el hook

const ProfitabilityPage = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const {
    data: financialData,
    loading,
    error,
    fetchProfitability,
  } = useProfitability();

  useEffect(() => {
    fetchProfitability(selectedYear);
  }, [selectedYear, fetchProfitability]);


  return (
    <div className="container mt-5 pt-4">
      <div className="card shadow">
        <div className="card-header bg-success text-white">
          <h5 className="mb-0">Rentabilidad del Negocio</h5>
        </div>

        <div className="card-body">
          {/* Selector de Año */}
          <div className="mb-4 text-center">
            <label className="me-2">
              <strong>Selecciona un año:</strong>
            </label>
            <select
              className="form-select d-inline w-auto"
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            >
              {[2024, 2025, 2026, 2027, 2028, 2029, 2030].map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Manejo de Carga y Errores */}
          {loading && (
            <p className="text-center text-primary">Cargando datos...</p>
          )}
          {error && <p className="text-center text-danger">{error}</p>}

          {/* Si hay datos, los mostramos */}
          {financialData && (
            <>
              {/* Gráfico de Rentabilidad Trimestral */}
              <div
                className="chart-container mb-4"
                style={{ width: "100%", height: 300 }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={financialData.quarterlyData}>
                    <XAxis dataKey="quarter" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="percentage"
                      stroke="#28a745"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Tabla de datos por trimestre */}
              <div className="table-responsive">
                <table className="table table-bordered text-center ">
                  <thead className="table-success">
                    <tr>
                      <th>Trimestre</th>
                      <th>Ingresos</th>
                      <th>Gastos (Costo Productos + Gastos Operativos)</th>
                      <th>Beneficio Neto</th>
                      <th>Rentabilidad (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {financialData.quarterlyData.map((data, index) => (
                      <tr key={index}>
                        <td>{data.quarter}</td>
                        <td>${data.income.toLocaleString()}</td>
                        <td>
                          ${(data.productCost + data.expenses).toLocaleString()}
                        </td>
                        <td>${data.netProfit.toLocaleString()}</td>
                        <td>{data.percentage}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

              </div>

              {/* Descripción sobre los datos */}
              <div className="alert alert-info text-center">
                <p>
                  <strong>Explicación de los datos:</strong>
                </p>
                <ul className="text-start">
                  <li>
                    <strong>Ingresos:</strong> Total de ventas realizadas en el
                    período.
                  </li>
                  <li>
                    <strong>Gastos:</strong> Incluye costos de productos
                    vendidos y gastos operativos.
                  </li>
                  <li>
                    <strong>Beneficio Neto:</strong> Ingresos menos los gastos
                    totales.
                  </li>
                  <li>
                    <strong>Rentabilidad (%):</strong> Relación entre el
                    beneficio neto y los ingresos, expresada en porcentaje.
                  </li>
                </ul>
              </div>

              {/* Resumen General */}
              <div className="text-center mt-4">
                <h5>
                  <strong>Resumen de Rentabilidad ({selectedYear})</strong>
                </h5>
                <p>
                  <strong>Ingresos Totales:</strong> $
                  {financialData.income.toLocaleString()}
                </p>
                <p>
                  <strong>
                    Gastos Totales (Costo de Productos + Gastos Operativos):
                  </strong>{" "}
                  $
                  {(
                    financialData.totalCost + financialData.expenses
                  ).toLocaleString()}
                </p>
                
                <p>
                  <strong>Beneficio Neto:</strong> $
                  {financialData.netProfit.toLocaleString()}
                </p>
                <p>
                  <strong>Rentabilidad Anual:</strong>{" "}
                  {financialData.profitabilityPercentage}%
                </p>
              </div>
              {/* Explicación de la diferencia entre rentabilidad anual y trimestral */}
              <div className="alert alert-warning text-center mt-4">
                <p>
                  <strong>Nota sobre la Rentabilidad Anual:</strong>
                </p>
                <p>
                  <strong>
                    Rentabilidad Anual (%) = (Beneficio Neto Anual / Ingresos
                    Totales Anuales) × 100
                  </strong>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfitabilityPage;
