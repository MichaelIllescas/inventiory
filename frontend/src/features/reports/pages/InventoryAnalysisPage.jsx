import React, { useState, useEffect } from "react";
import useInventoryAnalysis from "../api/useInventoryAnalysis";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from "recharts";

const PERIOD_OPTIONS = [
  { value: 3, label: "Últimos 3 meses" },
  { value: 6, label: "Últimos 6 meses" },
  { value: 12, label: "Últimos 12 meses" },
  { value: 24, label: "Últimos 24 meses" },
];

const CHART_DIMENSIONS = [
  { value: "category", label: "Por categoría" },
  { value: "brand", label: "Por marca" },
];

const CHART_GROUPS = 10;

/** Alto de cada barra y del espacio que ocupa, para que el gráfico crezca con los datos. */
const CHART_ROW_HEIGHT = 38;
const CHART_BAR_SIZE = 22;
const CHART_BASE_HEIGHT = 70;

const formatCurrency = (value) =>
  `$${Number(value || 0).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/** Formato abreviado para los ejes del gráfico: 380000 se muestra como $380 K. */
const formatCompactCurrency = (value) => {
  const amount = Number(value || 0);
  if (Math.abs(amount) >= 1_000_000) {
    return `$${(amount / 1_000_000).toLocaleString("es-AR", { maximumFractionDigits: 1 })} M`;
  }
  if (Math.abs(amount) >= 1_000) {
    return `$${(amount / 1_000).toLocaleString("es-AR", { maximumFractionDigits: 0 })} K`;
  }
  return `$${amount.toLocaleString("es-AR", { maximumFractionDigits: 0 })}`;
};

const formatNumber = (value, decimals = 0) =>
  Number(value || 0).toLocaleString("es-AR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

const formatPercentage = (value) => `${formatNumber(value, 2)}%`;

const formatDate = (value) =>
  value ? new Date(`${value}T00:00:00`).toLocaleDateString("es-AR") : "Sin ventas";

const SummaryCard = ({ title, value, detail, variant = "secondary" }) => (
  <div className="col-12 col-sm-6 col-lg-3 mb-3">
    <div className={`card h-100 border-${variant} shadow-sm`}>
      <div className="card-body">
        <h6 className="text-muted text-uppercase small mb-2">{title}</h6>
        <p className={`h4 mb-1 text-${variant}`}>{value}</p>
        {detail && <p className="small text-muted mb-0">{detail}</p>}
      </div>
    </div>
  </div>
);

const InventoryAnalysisPage = () => {
  const [months, setMonths] = useState(6);
  const [chartDimension, setChartDimension] = useState("category");
  const { analysis, loading, error, fetchInventoryAnalysis } = useInventoryAnalysis();

  useEffect(() => {
    fetchInventoryAnalysis(months);
  }, [months, fetchInventoryAnalysis]);

  const summary = analysis?.summary;
  const chartSource = chartDimension === "brand" ? analysis?.byBrand : analysis?.byCategory;
  const chartData = (chartSource || []).slice(0, CHART_GROUPS);
  const chartHeight = CHART_BASE_HEIGHT + chartData.length * CHART_ROW_HEIGHT;

  return (
    <div className="container mt-5 pt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Análisis de Inventario</h5>
        </div>
        <div className="card-body">
          {/* Selector de período de rotación */}
          <div className="mb-3">
            <label className="form-label">Período para medir rotación:</label>
            <select
              className="form-select w-50"
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
            >
              {PERIOD_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Mensajes de carga y error */}
          {loading && <p className="text-center text-muted">Cargando datos...</p>}
          {error && <p className="text-danger text-center">{error}</p>}

          {!loading && !error && summary && (
            <>
              <p className="text-muted small">
                Ventas analizadas entre {formatDate(analysis.periodStart)} y {formatDate(analysis.periodEnd)}.
              </p>

              {/* Indicadores generales */}
              <div className="row">
                <SummaryCard
                  title="Valorizado a venta"
                  value={formatCurrency(summary.totalValueAtSalePrice)}
                  detail={`${formatNumber(summary.totalUnits)} unidades en ${formatNumber(summary.totalProducts)} productos`}
                  variant="primary"
                />
                <SummaryCard
                  title="Precio promedio"
                  value={formatCurrency(summary.averageUnitPrice)}
                  detail="Precio de venta promedio por unidad en stock"
                  variant="dark"
                />
                <SummaryCard
                  title="Facturación del período"
                  value={formatCurrency(summary.revenueInPeriod)}
                  detail={`${formatNumber(summary.unitsSoldInPeriod)} unidades vendidas`}
                  variant="success"
                />
                <SummaryCard
                  title="Rotación del período"
                  value={formatNumber(summary.turnoverRatio, 2)}
                  detail={
                    summary.daysOfStockCoverage !== null && summary.daysOfStockCoverage !== undefined
                      ? `Cobertura estimada: ${formatNumber(summary.daysOfStockCoverage, 1)} días`
                      : "Sin ventas en el período"
                  }
                  variant="info"
                />
              </div>

              {/* Alertas de inventario */}
              <div className="row">
                <SummaryCard
                  title="Sin stock"
                  value={formatNumber(summary.productsOutOfStock)}
                  detail="Productos activos en quiebre"
                  variant="danger"
                />
                <SummaryCard
                  title="Bajo el mínimo"
                  value={formatNumber(summary.lowStockProducts)}
                  detail="Productos en o por debajo del stock mínimo"
                  variant="warning"
                />
                <SummaryCard
                  title="Stock inmovilizado"
                  value={formatNumber(summary.slowMovingProducts)}
                  detail={`${formatCurrency(summary.slowMovingValue)} inmovilizados (${formatPercentage(
                    summary.slowMovingPercentage
                  )} del inventario)`}
                  variant="secondary"
                />
                <SummaryCard
                  title="Productos con stock"
                  value={formatNumber(summary.productsInStock)}
                  detail={`Sobre ${formatNumber(summary.totalProducts)} productos activos`}
                  variant="info"
                />
              </div>

              {/* Valorización por categoría o marca */}
              {chartData.length > 0 && (
                <>
                  <div className="d-flex flex-wrap justify-content-between align-items-center mt-4 mb-2 gap-2">
                    <h6 className="mb-0">Valorización del inventario</h6>
                    <div className="btn-group btn-group-sm" role="group" aria-label="Dimensión del gráfico">
                      {CHART_DIMENSIONS.map((dimension) => (
                        <button
                          key={dimension.value}
                          type="button"
                          className={`btn ${
                            chartDimension === dimension.value ? "btn-primary" : "btn-outline-primary"
                          }`}
                          onClick={() => setChartDimension(dimension.value)}
                        >
                          {dimension.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <p className="small text-muted">
                    {chartData.length === 1
                      ? "Hay un solo grupo con stock, así que concentra el 100% del valor."
                      : `Se muestran los ${chartData.length} grupos de mayor valorización a precio de venta.`}
                  </p>
                  <div className="chart-container mb-4" style={{ width: "100%", height: chartHeight }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={chartData}
                        layout="vertical"
                        margin={{ left: 10, right: 80, top: 5, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" tickFormatter={formatCompactCurrency} />
                        <YAxis type="category" dataKey="name" width={140} tick={{ fontSize: 12 }} />
                        <Tooltip
                          formatter={(value, _name, item) => [
                            `${formatCurrency(value)} (${formatPercentage(item?.payload?.sharePercentage)})`,
                            "Valorizado a venta",
                          ]}
                        />
                        <Bar
                          dataKey="valueAtSalePrice"
                          fill="#0d6efd"
                          name="Valorizado a venta"
                          barSize={CHART_BAR_SIZE}
                          radius={[0, 4, 4, 0]}
                        >
                          <LabelList
                            dataKey="valueAtSalePrice"
                            position="right"
                            formatter={formatCompactCurrency}
                            style={{ fontSize: 12, fill: "#495057" }}
                          />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </>
              )}

              {/* Detalle por categoría */}
              <h6 className="mt-4">Inventario por categoría</h6>
              <div className="table-responsive mb-4">
                <table className="table table-striped text-center align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>Categoría</th>
                      <th>Productos</th>
                      <th>Sin stock</th>
                      <th>Unidades</th>
                      <th>Valorizado (venta)</th>
                      <th>Participación</th>
                      <th>Vendidas</th>
                      <th>Facturación</th>
                      <th>Rotación</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysis.byCategory.map((group) => (
                      <tr key={group.name}>
                        <td className="text-start">{group.name}</td>
                        <td>{formatNumber(group.productCount)}</td>
                        <td>{formatNumber(group.outOfStockCount)}</td>
                        <td>{formatNumber(group.units)}</td>
                        <td>{formatCurrency(group.valueAtSalePrice)}</td>
                        <td>{formatPercentage(group.sharePercentage)}</td>
                        <td>{formatNumber(group.unitsSoldInPeriod)}</td>
                        <td>{formatCurrency(group.revenueInPeriod)}</td>
                        <td>{formatNumber(group.turnoverRatio, 2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Detalle por marca */}
              <h6 className="mt-4">Inventario por marca</h6>
              <div className="table-responsive mb-4">
                <table className="table table-striped text-center align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>Marca</th>
                      <th>Productos</th>
                      <th>Unidades</th>
                      <th>Valorizado (venta)</th>
                      <th>Participación</th>
                      <th>Rotación</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysis.byBrand.map((group) => (
                      <tr key={group.name}>
                        <td className="text-start">{group.name}</td>
                        <td>{formatNumber(group.productCount)}</td>
                        <td>{formatNumber(group.units)}</td>
                        <td>{formatCurrency(group.valueAtSalePrice)}</td>
                        <td>{formatPercentage(group.sharePercentage)}</td>
                        <td>{formatNumber(group.turnoverRatio, 2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Clasificación ABC */}
              <h6 className="mt-4">Clasificación ABC por valor</h6>
              <p className="small text-muted">
                El segmento A concentra hasta el 80% del valor del inventario, el B hasta el 95% y el C el resto.
              </p>
              <div className="table-responsive mb-4">
                <table className="table table-bordered text-center align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>Segmento</th>
                      <th>Productos</th>
                      <th>% de productos</th>
                      <th>Valorizado (venta)</th>
                      <th>% del valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysis.abcAnalysis.map((segment) => (
                      <tr key={segment.segment}>
                        <td className="fw-bold">{segment.segment}</td>
                        <td>{formatNumber(segment.productCount)}</td>
                        <td>{formatPercentage(segment.productPercentage)}</td>
                        <td>{formatCurrency(segment.valueAtSalePrice)}</td>
                        <td>{formatPercentage(segment.valuePercentage)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Stock inmovilizado */}
              <h6 className="mt-4">Stock inmovilizado (sin ventas en el período)</h6>
              <div className="table-responsive mb-4">
                <table className="table table-striped text-center align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>Producto</th>
                      <th>Categoría</th>
                      <th>Marca</th>
                      <th>Stock</th>
                      <th>Valorizado (venta)</th>
                      <th>Última venta</th>
                      <th>Días sin vender</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysis.slowMovingProducts.map((product) => (
                      <tr key={product.productId}>
                        <td className="text-start">{product.productName}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td>{formatNumber(product.stock)}</td>
                        <td>{formatCurrency(product.valueAtSalePrice)}</td>
                        <td>{formatDate(product.lastSaleDate)}</td>
                        <td>{product.daysWithoutSales !== null ? formatNumber(product.daysWithoutSales) : "-"}</td>
                      </tr>
                    ))}
                    {analysis.slowMovingProducts.length === 0 && (
                      <tr>
                        <td colSpan="7" className="text-muted">
                          No hay stock inmovilizado en el período seleccionado.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mayor rotación */}
              <h6 className="mt-4">Productos de mayor rotación</h6>
              <div className="table-responsive mb-4">
                <table className="table table-striped text-center align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>Producto</th>
                      <th>Categoría</th>
                      <th>Stock</th>
                      <th>Vendidas</th>
                      <th>Facturación</th>
                      <th>Rotación</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysis.fastMovingProducts.map((product) => (
                      <tr key={product.productId}>
                        <td className="text-start">{product.productName}</td>
                        <td>{product.category}</td>
                        <td>{formatNumber(product.stock)}</td>
                        <td>{formatNumber(product.unitsSoldInPeriod)}</td>
                        <td>{formatCurrency(product.revenueInPeriod)}</td>
                        <td>{formatNumber(product.turnoverRatio, 2)}</td>
                      </tr>
                    ))}
                    {analysis.fastMovingProducts.length === 0 && (
                      <tr>
                        <td colSpan="6" className="text-muted">
                          No hubo ventas en el período seleccionado.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Reposición sugerida */}
              <h6 className="mt-4">Productos en o bajo el stock mínimo</h6>
              <div className="table-responsive">
                <table className="table table-striped text-center align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>Producto</th>
                      <th>Categoría</th>
                      <th>Marca</th>
                      <th>Stock</th>
                      <th>Vendidas</th>
                      <th>Última venta</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysis.lowStockProducts.map((product) => (
                      <tr key={product.productId}>
                        <td className="text-start">{product.productName}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td>{formatNumber(product.stock)}</td>
                        <td>{formatNumber(product.unitsSoldInPeriod)}</td>
                        <td>{formatDate(product.lastSaleDate)}</td>
                      </tr>
                    ))}
                    {analysis.lowStockProducts.length === 0 && (
                      <tr>
                        <td colSpan="6" className="text-muted">
                          No hay productos por debajo del stock mínimo.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Mensaje si no hay datos */}
          {!loading && !error && !summary && (
            <p className="text-center text-muted">No hay productos activos para analizar.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InventoryAnalysisPage;
