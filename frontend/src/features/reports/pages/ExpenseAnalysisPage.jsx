import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import useExpenseAnalysis from "../api/useExpenseAnalysis";
import { Modal, Button } from "react-bootstrap";
import { FaEye } from "react-icons/fa";

const colors = ["#0d6efd", "#198754", "#f0ad00", "#dc3545", "#6f42c1", "#6c757d"];

const ExpenseAnalysisPage = () => {
  const [period, setPeriod] = useState("MONTH");
  const [value, setValue] = useState(new Date().toISOString().slice(0, 7));
  const { analysis, loading, error, fetchAnalysis } = useExpenseAnalysis();
  const [selectedExpense, setSelectedExpense] = useState(null);

  useEffect(() => { fetchAnalysis(period, value); }, [period, value, fetchAnalysis]);

  const money = (value) => `$${Number(value || 0).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const categoryData = Object.entries(analysis?.byCategory || {}).map(([name, value]) => ({ name, value: Number(value) }));
  const paymentData = Object.entries(analysis?.byPaymentMethod || {}).map(([name, value]) => ({ name, value: Number(value) }));

  return <div className="container mt-5 pt-4"><div className="card shadow"><div className="card-header bg-warning"><h5 className="mb-0">Análisis de Gastos</h5></div><div className="card-body">
    <label className="form-label">Seleccionar mes:</label>
    <div className="d-flex gap-2 mb-4 flex-wrap">
      <select className="form-select w-auto" value={period} onChange={(e) => {
        const nextPeriod = e.target.value;
        setPeriod(nextPeriod);
        setValue(nextPeriod === "MONTH" ? new Date().toISOString().slice(0, 7) : new Date().getFullYear().toString());
      }}>
        <option value="MONTH">Mensual</option>
        <option value="QUARTER">Trimestral</option>
        <option value="YEAR">Anual</option>
      </select>
      {period === "MONTH" && <input type="month" className="form-control w-auto" value={value} onChange={(e) => setValue(e.target.value)} />}
      {period === "QUARTER" && <select className="form-select w-auto" value={value} onChange={(e) => setValue(e.target.value)}>{[1, 2, 3, 4].map((quarter) => <option key={quarter} value={`${new Date().getFullYear()}-Q${quarter}`}>Trimestre {quarter}</option>)}</select>}
      {period === "YEAR" && <input type="number" className="form-control w-auto" value={value} onChange={(e) => setValue(e.target.value)} />}
    </div>
    {loading && <p className="text-center text-muted">Cargando datos...</p>}
    {error && <p className="text-danger text-center">{error}</p>}
    {!loading && analysis && <>
      <div className="border-start border-4 border-warning bg-light rounded p-3 mb-4"><span className="text-muted">Total gastado</span><h2 className="text-warning mb-0">{money(analysis.total)}</h2></div>
      <div className="row g-4">
        <div className="col-lg-6"><div className="bg-white rounded p-3" style={{ height: 330 }}><h5 className="text-center">Por categoría</h5><ResponsiveContainer width="100%" height="85%"><PieChart><Pie data={categoryData} dataKey="value" nameKey="name" outerRadius={85} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>{categoryData.map((entry, i) => <Cell key={entry.name} fill={colors[i % colors.length]} />)}</Pie><Tooltip formatter={money} /><Legend /></PieChart></ResponsiveContainer></div></div>
        <div className="col-lg-6"><div className="bg-white rounded p-3" style={{ height: 330 }}><h5 className="text-center">Por método de pago</h5><ResponsiveContainer width="100%" height="85%"><PieChart><Pie data={paymentData} dataKey="value" nameKey="name" outerRadius={85} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>{paymentData.map((entry, i) => <Cell key={entry.name} fill={colors[i % colors.length]} />)}</Pie><Tooltip formatter={money} /><Legend /></PieChart></ResponsiveContainer></div></div>
      </div>
      <div className="table-responsive mt-4"><table className="table table-striped table-bordered text-center"><thead className="table-dark"><tr><th>Fecha</th><th>Categoría</th><th>Monto</th><th>Acciones</th></tr></thead><tbody>{analysis.details.map((expense) => <tr key={expense.id}><td>{expense.date}</td><td>{expense.expenseType}</td><td>{money(expense.amount)}</td><td><div className="d-flex justify-content-center"><button className="btn btn-info btn-sm" title="Ver detalles" onClick={() => setSelectedExpense(expense)}><FaEye /></button></div></td></tr>)}</tbody></table></div>
    </>}
    {!loading && analysis && analysis.details.length === 0 && <p className="text-center text-muted">No hay gastos para el mes seleccionado.</p>}
    <Modal show={Boolean(selectedExpense)} onHide={() => setSelectedExpense(null)} centered>
      <Modal.Header closeButton><Modal.Title>Detalle del gasto</Modal.Title></Modal.Header>
      <Modal.Body>{selectedExpense && <div className="d-grid gap-2"><div><strong>Fecha:</strong> {selectedExpense.date}</div><div><strong>Categoría:</strong> {selectedExpense.expenseType}</div><div><strong>Monto:</strong> {money(selectedExpense.amount)}</div><div><strong>Método de pago:</strong> {selectedExpense.paymentMethod}</div><div><strong>Descripción:</strong> {selectedExpense.description || "Sin descripción"}</div></div>}</Modal.Body>
      <Modal.Footer><Button variant="secondary" onClick={() => setSelectedExpense(null)}>Cerrar</Button></Modal.Footer>
    </Modal>
  </div></div></div>;
};

export default ExpenseAnalysisPage;
