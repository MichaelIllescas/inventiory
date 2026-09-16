import React, { useState, useEffect } from "react";
import useTopSellingProducts from "../api/useTopSellingProducts";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const TopSellingProductsPage = () => {
  const currentMonth = new Date().toISOString().slice(0, 7); // Formato "YYYY-MM"
  const [month, setMonth] = useState(currentMonth);
  const { products, loading, error, fetchTopSellingProducts } = useTopSellingProducts();

  useEffect(() => {
    fetchTopSellingProducts(month);
  }, [month, fetchTopSellingProducts]);

  return (
    <div className="container mt-5 pt-4">
      <div className="card shadow">
        <div className="card-header bg-success text-white">
          <h5 className="mb-0">Productos Más Vendidos</h5>
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
          {!loading && products.length > 0 && (
            <div className="chart-container mb-4" style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={products} layout="vertical" margin={{ left: 20, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" allowDecimals={false} />
                  <YAxis type="category" dataKey="productName" width={150} />
                  <Tooltip />
                  <Bar dataKey="totalQuantitySold" fill="#28a745" name="Unidades vendidas" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Tabla de productos más vendidos */}
          {!loading && products.length > 0 && (
            <div className="table-responsive">
              <table className="table table-striped text-center">
                <thead className="table-dark">
                  <tr>
                    <th>Ranking</th>
                    <th>Producto</th>
                    <th>Código</th>
                    <th>Cantidad Vendida</th>
                    <th>Total Generado(Bruto)</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index}>
                      <td className="fw-bold">#{index + 1}</td>
                      <td>{product.productName}</td>
                      <td>{product.productCode}</td>
                      <td>{product.totalQuantitySold}</td>
                      <td>${Number(product.totalRevenue || 0).toLocaleString("es-AR", { minimumFractionDigits: 2 })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Mensaje si no hay datos */}
          {!loading && products.length === 0 && (
            <p className="text-center text-muted">No hay datos para el mes seleccionado.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopSellingProductsPage;
