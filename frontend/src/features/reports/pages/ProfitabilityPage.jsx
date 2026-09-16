import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
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

  const formatCurrency = (value) => `$${Number(value || 0).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;


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
              <div className="bg-white rounded p-3 mb-4" style={{ width: "100%", minWidth: 0, height: "clamp(300px, 42vw, 330px)" }}>
                <h5 className="text-center mb-2">Evolución trimestral</h5>
                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                  <BarChart data={financialData.quarterlyData} margin={{ top: 10, right: 5, left: -15, bottom: 15 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" tick={{ fontSize: 11 }} />
                    <YAxis width={52} tick={{ fontSize: 11 }} tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <ReferenceLine y={0} stroke="#6c757d" />
                    <Bar dataKey="percentage" fill="#198754" name="Rentabilidad" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Tabla de datos por trimestre */}
              <div className="table-responsive">
                <table className="table table-bordered text-center ">
                  <thead className="table-success">
                    <tr>
                      <th>Trimestre</th>
                      <th>Ingresos</th>
                      <th>Gastos</th>
                      <th>Beneficio Neto</th>
                      <th>Rentabilidad (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {financialData.quarterlyData.map((data, index) => (
                      <tr key={index}>
                        <td>{data.quarter}</td>
                        <td>{formatCurrency(data.income)}</td>
                        <td>
                          {formatCurrency(data.expenses)}
                        </td>
                        <td>{formatCurrency(data.netProfit)}</td>
                        <td>{data.percentage}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

              </div>

              {/* Resumen General */}
              <div className="row g-3 mt-2">
                {[
                  ["Ingresos totales", financialData.income, "primary"],
                  ["Gastos totales", financialData.expenses, "warning"],
                  ["Beneficio neto", financialData.netProfit, financialData.netProfit >= 0 ? "success" : "danger"],
                  ["Rentabilidad anual", `${financialData.profitabilityPercentage}%`, "info"],
                ].map(([label, value, color]) => (
                  <div className="col-sm-6 col-lg-3" key={label}>
                    <div className={`border-start border-4 border-${color} bg-white rounded p-3 h-100`}>
                      <span className="text-muted">{label}</span>
                      <h4 className={`text-${color} mb-0`}>{typeof value === "string" ? value : formatCurrency(value)}</h4>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-light border rounded">
                <h6 className="fw-bold mb-3">¿Qué significa cada indicador?</h6>
                <div className="row g-3 small">
                  <div className="col-md-6">
                    <strong>Ingresos:</strong> total cobrado por las ventas realizadas durante el período.
                  </div>
                  <div className="col-md-6">
                    <strong>Gastos:</strong> gastos operativos registrados durante el período.
                  </div>
                  <div className="col-md-6">
                    <strong>Beneficio neto:</strong> ingresos menos gastos. Puede ser negativo si los gastos superan las ventas.
                  </div>
                  <div className="col-md-6">
                    <strong>Rentabilidad:</strong> beneficio neto expresado como porcentaje de los ingresos.
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

export default ProfitabilityPage;
