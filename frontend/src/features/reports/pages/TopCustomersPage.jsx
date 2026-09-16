import React, { useState, useEffect } from "react";
import useTopCustomers from "../api/useTopCustomers";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const TopCustomersPage = () => {
  const currentMonth = new Date().toISOString().slice(0, 7); // Formato "YYYY-MM"
  const [month, setMonth] = useState(currentMonth);
  const { customers, loading, error, fetchTopCustomers } = useTopCustomers();

  useEffect(() => {
    fetchTopCustomers(month);
  }, [month, fetchTopCustomers]);

  return (
    <div className="container mt-5 pt-4">
      <div className="card shadow">
        <div className="card-header bg-info text-white">
          <h5 className="mb-0">Clientes con Más Compras</h5>
        </div>
        <div className="card-body">
          {/* Selector de mes */}
          <div className="mb-3">
            <label className="form-label">Seleccionar Mes:</label>
            <input
              type="month"
              className="form-control w-50"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
          </div>

          {/* Mensajes de carga y error */}
          {loading && <p className="text-center text-muted">Cargando datos...</p>}
          {error && <p className="text-danger text-center">{error}</p>}

          {/* Gráfico */}
          {!loading && customers.length > 0 && (
            <div className="chart-container mb-4" style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={customers}>
                  <XAxis dataKey="customerName" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="totalSpent" fill="#17a2b8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Tabla de clientes */}
          {!loading && customers.length > 0 && (
            <div className="table-responsive">
              <table className="table table-striped text-center">
                <thead className="table-dark">
                  <tr>
                    <th>Nombre del Cliente</th>
                    <th>Número de Documento</th>
                    <th>Total Gastado</th>
                    <th>Compras Realizadas</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer, index) => (
                    <tr key={index}>
                      <td>{customer.customerName}</td>
                      <td>{customer.documentNumber}</td>
                      <td>${customer.totalSpent.toLocaleString()}</td>
                      <td>{customer.totalPurchases}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Mensaje si no hay datos */}
          {!loading && customers.length === 0 && (
            <p className="text-center text-muted">No hay datos para el mes seleccionado.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopCustomersPage;
