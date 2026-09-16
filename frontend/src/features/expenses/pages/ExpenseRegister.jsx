import React, { useState } from "react";
import useRegisterExpense from "../api/useRegisterExpense";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { AlertTriangle, CheckCircle, DollarSign } from "lucide-react";
import DatePicker from "react-datepicker";
import { es } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

const ExpenseRegister = () => {
  const { registrationExpense, loading, error } = useRegisterExpense();
  const [confirm, setConfirm] = useState(false);

  const [formData, setFormData] = useState({
    expenseType: "",
    amount: "",
    paymentMethod: "",
    description: "",
    expenseDate: new Date(), // se iniciliza con fecha actual
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, expenseDate: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      expenseDate: formData.expenseDate.toISOString().split("T")[0],
    };

    const result = await registrationExpense(formattedData);
    if (result) {
      setConfirm(true);
      setFormData({
        expenseType: "",
        amount: "",
        paymentMethod: "",
        description: "",
        expenseDate: new Date(), // se reinicie la fecha al dia actual
      });

      setTimeout(() => {
        setConfirm(false);
      }, 7000);
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div
      className="mt-5 pt-3 d-flex align-items-center justify-content-center flex-column"
      data-aos="fade-left"
    >
      <div className="col-sm-12 col-md-8 col-lg-8 card pt-4 pb-3">
        <h2 className="text-center pt-2">
          <DollarSign size={24} className="me-2" />
          Registrar Gasto
        </h2>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="row">
            {/* Primera columna */}
            <div className="col-md-6">
              <label htmlFor="expenseType" className="form-label">
                Tipo de Gasto:
              </label>
              <input
                type="text"
                name="expenseType"
                id="expenseType"
                value={formData.expenseType}
                onChange={handleChange}
                required
                className="form-control"
                placeholder="Ej.: Compra de Materiales"
              />

              <label htmlFor="amount" className="form-label mt-3">
                Monto:
              </label>
              <input
                type="number"
                name="amount"
                id="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                className="form-control"
                placeholder="Ej.: 4500.75"
              />
              <div className="w-100 ">
                <label htmlFor="expenseDate" className="form-label mt-3">
                  Fecha del Gasto:
                </label>{" "}
                <br />
                <DatePicker
                  selected={formData.expenseDate}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  className="form-control form-select"
                  wrapperClassName="w-100"
                   locale={es}
                  
                />
              </div>
            </div>

            {/* Segunda columna */}
            <div className="col-md-6">
              <label htmlFor="paymentMethod" className="form-label">
                Método de Pago:
              </label>
              <input
                type="text"
                name="paymentMethod"
                id="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                required
                className="form-control"
                placeholder="Ej.: Transferencia, Efectivo, Tarjeta"
              />

              <label htmlFor="description" className="form-label mt-3">
                Descripción:
              </label>
              <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                className="form-control"
                placeholder="Ej.: Compra de insumos para la oficina"
              />
            </div>
          </div>

          <div className="text-center mt-4 pt-3">
            <button type="submit" className="btn btn-confirm">
              Registrar Gasto
            </button>
          </div>
        </form>

        {error && (
          <div
            className="alert alert-danger mt-1 text-center mx-2"
            role="alert"
          >
            <AlertTriangle />
            <span className="m-2">{error}</span>
          </div>
        )}
        {confirm && (
          <div
            className="alert alert-success mt-0 text-center mx-2"
            role="alert"
          >
            <CheckCircle />
            <span>¡Gasto registrado exitosamente!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseRegister;
