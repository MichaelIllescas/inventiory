import React, { useState, useEffect, useMemo } from "react";
import useExpenses from "../api/UseExpenses";
import useUpdateExpense from "../api/useUpdateExpense";
import useDeleteExpense from "../api/useDeleteExpense";
import useFilter from "../api/useFilter";
import DataTable from "../../../components/DataTable";
import { LoadingScreen } from "../../../components/LoadingScreen";
import EditExpenseModal from "./EditExpenseModal";
import ToastMessage from "../../../components/ToastMessage";
import ConfirmModal from "./ConfirmModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";

const ExpensesPage = () => {
  const { expenses, fetchExpenses, loading, error } = useExpenses();
  const { updateExpense } = useUpdateExpense();
  const { deleteExpense } = useDeleteExpense();
  const { filteredExpenses, filterExpenses, clearFilter, error: filterError } = useFilter(fetchExpenses);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    title: "",
    variant: "success",
  });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleEdit = (id) => {
    const expense = expenses.find((e) => e.id === id);
    if (!expense) return;
    setSelectedExpense(expense);
    setIsEditModalOpen(true);
  };

  const handleSave = async (updatedExpense) => {
    try {
      await updateExpense(updatedExpense);
      setToast({
        show: true,
        title: "Éxito",
        message: "Gasto actualizado correctamente",
        variant: "success",
      });
      setIsEditModalOpen(false);
      fetchExpenses();
    } catch (error) {
      setToast({
        show: true,
        title: "Error",
        message: error.response?.data?.error || error.message,
        variant: "danger",
      });
    }
  };

  // ✅ Abre el modal de confirmación antes de eliminar
  const handleOpenConfirmModal = (expense) => {
    setExpenseToDelete(expense);
    setIsConfirmModalOpen(true);
  };

  // ✅ Confirmar y eliminar gasto
  const handleDelete = async () => {
    if (!expenseToDelete) return;
    try {
      await deleteExpense(expenseToDelete.id);
      setToast({
        show: true,
        title: "Eliminado",
        message: "Gasto eliminado correctamente",
        variant: "success",
      });
      fetchExpenses();
    } catch (error) {
      setToast({
        show: true,
        title: "Error",
        message: error.response?.data?.error || error.message,
        variant: "danger",
      });
    } finally {
      setIsConfirmModalOpen(false);
      setExpenseToDelete(null);
    }
  };

  const handleFilter = async () => {
    if (!startDate || !endDate) {
      setToast({
        show: true,
        title: "Error",
        message: "Debes seleccionar un rango de fechas",
        variant: "danger",
      });
      return;
    }

    await filterExpenses(startDate, endDate, setToast);
  };

  const handleClearFilter = () => {
    setStartDate(null);
    setEndDate(null);
    clearFilter();
  };

  const columns = useMemo(
    () => [
      { Header: "TIPO DE GASTO", accessor: "expenseType" },
      { Header: "MONTO", accessor: "amount" },
      { Header: "MÉTODO DE PAGO", accessor: "paymentMethod" },
      { Header: "DESCRIPCIÓN", accessor: "description" },
      { Header: "FECHA DE REGISTRO", accessor: "date" },
      {
        Header: "ACCIONES",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="d-flex justify-content-center gap-2">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => handleEdit(row.original.id)}
              style={{ width: "40px", borderRadius: "150px" }}
            >
              ✏️
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleOpenConfirmModal(row.original)}
              style={{ width: "40px", borderRadius: "150px" }}
            >
              🗑️
            </button>
          </div>
        ),
      },
    ],
    [expenses]
  );

  return (
    <div className="mt-3 pt-1">
      <div className="container card mt-5 pt-5 table-responsive">
        <h2>Gastos Registrados</h2>

        <div className="d-flex align-items-center gap-2 mb-3">
          <label>Desde:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="form-control"
            dateFormat="dd/MM/yyyy"
            locale={es}
          />
          <label>Hasta:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="form-control"
            dateFormat="dd/MM/yyyy"
            locale={es}
          />
          <button className="btn btn-success" onClick={handleFilter}>
            Filtrar
          </button>
          <button className="btn btn-secondary" onClick={handleClearFilter}>
            Limpiar filtro
          </button>
        </div>

        {filterError && <p className="text-danger">{filterError}</p>}

        <DataTable columns={columns} data={filteredExpenses.length > 0 ? filteredExpenses : expenses} />

        <EditExpenseModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          data={selectedExpense}
          onSubmit={handleSave}
        />

        <ConfirmModal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={handleDelete}
          expense={expenseToDelete}
        />

      </div>
        <ToastMessage
          show={toast.show}
          title={toast.title}
          message={toast.message}
          variant={toast.variant}
          onClose={() => setToast({ ...toast, show: false })}
        />
    </div>
  );
};

export default ExpensesPage;
