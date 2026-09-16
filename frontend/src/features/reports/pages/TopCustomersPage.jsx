import React, { useState, useEffect } from "react";
import useTopCustomers from "../api/useTopCustomers";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

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
                <BarChart data={customers} layout="vertical" margin={{ left: 20, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="customerName" width={150} />
                  <Tooltip />
                  <Bar dataKey="totalSpent" fill="#17a2b8" name="Total gastado" />
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
                    <th>Ranking</th>
                    <th>Nombre del Cliente</th>
                    <th>Número de Documento</th>
                    <th>Total Gastado</th>
                    <th>Compras Realizadas</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer, index) => (
                    <tr key={index}>
                      <td className="fw-bold">#{index + 1}</td>
                      <td>{customer.customerName}</td>
                      <td>{customer.documentNumber}</td>
                      <td>${Number(customer.totalSpent || 0).toLocaleString("es-AR", { minimumFractionDigits: 2 })}</td>
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
