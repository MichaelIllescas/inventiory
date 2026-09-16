/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import SelectCliente from "./SelectCliente";
import SelectProduct from "./SelectProduct";
import useRegisterSale from "../api/useRegisterSale";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { CheckCircle } from "lucide-react";
import Select from "react-select";


const SaleRegister = () => {
  const [cliente, setCliente] = useState(null);
  const [productsSelected, setProductsSelected] = useState([]); // Productos seleccionados por el usuario
  const [descuento, setDescuento] = useState(0);
  const [aumento, setAumento] = useState(0);
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const { registerSale, loading, error, success } = useRegisterSale();
  const [ajusteTipo, setAjusteTipo] = useState(null); // "discount" o "increase"
  const [ajusteValor, setAjusteValor] = useState(0);
 

  const handleRegisterSale = async () => {
    if (productsSelected.length === 0) {
      return;
    }

    if (!paymentMethod) {
      return;
    }

    await registerSale({
      products: productsSelected,
      discount: descuento,
      paymentMethod,
      clientId: cliente ? cliente.id : null,
      extra_charge_percentage: aumento,
    });
  };
  useEffect(() => {
    if (success) {
      setCliente(null);
      setProductsSelected([]);
      setDescuento(0);
      setDescuento(0);
      setTotal(0);
      setPaymentMethod("");
      setAjusteValor(0);
    }
  }, [success]); // Se ejecuta cuando `success` cambia

  const handleClienteSeleccionado = (clienteSeleccionado) => {
    setCliente(clienteSeleccionado); // Almacena todo el objeto cliente
  };

  // Maneja cuando un producto es seleccionado
  const handleProductoSeleccionado = (productoSeleccionado) => {
    if (!productoSeleccionado) return; // Evita errores si no se selecciona nada

    setProductsSelected((prevProductsSelected) => {
      const existingProduct = prevProductsSelected.find(
        (producto) => producto.id === productoSeleccionado.value
      );

      let updatedProducts;

      if (existingProduct) {
        // Si el producto ya está seleccionado, aumentar la cantidad
        updatedProducts = prevProductsSelected.map((producto) =>
          producto.id === productoSeleccionado.value
            ? { ...producto, cantidad: producto.cantidad + 1 }
            : producto
        );
      } else {
        // Si no está seleccionado, agregarlo al carrito con cantidad 1
        updatedProducts = [
          ...prevProductsSelected,
          {
            id: productoSeleccionado.value,
            label: productoSeleccionado.label,
            salePrice: productoSeleccionado.salePrice,
            cantidad: 1,
          },
        ];
      }

      actualizarTotal(updatedProducts);
      return updatedProducts;
    });
  };

  // Aumentar o disminuir la cantidad de un producto
  const handleCantidadChange = (id, delta) => {
    setProductsSelected((prevSelectedProducts) => {
      const updatedProducts = prevSelectedProducts.map((producto) =>
        producto.id === id
          ? { ...producto, cantidad: Math.max(1, producto.cantidad + delta) }
          : producto
      );

      actualizarTotal(updatedProducts);
      return updatedProducts;
    });
  };

  // Eliminar un producto del carrito y permitir que vuelva al SelectProduct
  const handleEliminarProducto = (id) => {
    setProductsSelected((prevSelectedProducts) => {
      const updatedProducts = prevSelectedProducts.filter(
        (producto) => producto.id !== id
      );

      actualizarTotal(updatedProducts);
      return updatedProducts;
    });
  };

  const actualizarTotal = (updatedProducts) => {
    const subtotal = updatedProducts.reduce(
      (acc, producto) => acc + producto.salePrice * producto.cantidad,
      0
    );
  
    const porcentaje = Math.min(parseFloat(ajusteValor) || 0, 100);
  
    let descuentoValor = 0;
    let aumentoValor = 0;
  
    if (ajusteTipo === "discount") {
      descuentoValor = (porcentaje / 100) * subtotal;
    } else if (ajusteTipo === "increase") {
      aumentoValor = (porcentaje / 100) * subtotal;
    }
  
    const totalCalculado = subtotal - descuentoValor + aumentoValor;
    setTotal(totalCalculado.toFixed(2));
  
    // Además, actualizamos los valores reales que se envían al backend
    setDescuento((ajusteTipo === "discount" ? porcentaje : 0).toFixed(2));
    setAumento((ajusteTipo === "increase" ? porcentaje : 0).toFixed(2));
  };
  


 
  useEffect(() => {
    // Actualizar descuento y aumento en base al tipo seleccionado
    if (ajusteTipo === "discount") {
      setDescuento(parseFloat(ajusteValor) || 0);
      setAumento(0);
    } else if (ajusteTipo === "increase") {
      setAumento(parseFloat(ajusteValor) || 0);
      setDescuento(0);
    } else {
      setDescuento(0);
      setAumento(0);
    }
  
    // Calcular el total actualizado con los valores actuales
    actualizarTotal(productsSelected);
  }, [ajusteTipo, ajusteValor, productsSelected]);
  

  if (loading) return <LoadingScreen />;
  return (
    <div className="container mt-5 pt-5">
      <div className="row">
        {/* Sección de Registro y Detalles del Cliente */}
        <div className="col-md-6 mt-2">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="card-title">Seleccionar Cliente</h4>

              {/* Select Cliente */}
              <SelectCliente
                onClienteSeleccionado={handleClienteSeleccionado}
              />

              <hr />
              <h4 className="mt-3">Detalles del Cliente</h4>
              {cliente ? (
                <>
                  <p>
                    <strong>Nombre:</strong> {cliente.name} {cliente.lastname}
                  </p>
                  <p>
                    <strong>D.N.I.:</strong> {cliente.documentNumber}
                  </p>
                  <p>
                    <strong>Dirección.:</strong> {cliente.address}
                  </p>
                  <p>
                    <strong>Teléfono.:</strong> {cliente.phone}
                  </p>
                  <p>
                    <strong>Email.:</strong> {cliente.email}
                  </p>
                  <hr />
                </>
              ) : (
                <p>No Asignado</p>
              )}
            </div>
          </div>
        </div>

        {/* Sección de Selección de Productos y Confirmar Venta */}
        <div className="col-md-6 mt-2">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="card-title">Seleccionar Productos</h4>

              {/* Select Producto */}
              <SelectProduct
                onProductoSeleccionado={handleProductoSeleccionado}
                productosSeleccionados={productsSelected} // Se pasan los productos seleccionados
              />
              <hr />
              <h4 className="mt-3">Listado de Productos Seleccionados</h4>
              <ul className="list-group w-100">
                {productsSelected.length === 0 ? (
                  <li className="list-group-item">
                    No hay productos seleccionados
                  </li>
                ) : (
                  productsSelected.map((producto) => (
                    <li
                      key={producto.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div>{producto.label}</div>

                      <div className="d-inline-block ms-3 d-flex">
                        {/* Botón para disminuir la cantidad */}
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => handleCantidadChange(producto.id, -1)}
                        >
                          -
                        </button>

                        {/* Mostrar cantidad */}
                        <span className="mx-2">{producto.cantidad}</span>

                        {/* Botón para aumentar la cantidad */}
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => handleCantidadChange(producto.id, 1)}
                        >
                          +
                        </button>

                        {/* Botón para eliminar el producto */}
                        <div className="px-2">
                          <button
                            className="btn btn-sm btn-danger mx-1"
                            onClick={() => handleEliminarProducto(producto.id)}
                          >
                            ✖
                          </button>
                        </div>
                      </div>
                    </li>
                  ))
                )}
              </ul>
              <hr />

              {/* <h4 className="mt-3">Aplicar Descuento (%)</h4>
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Ingrese descuento (%)"
                  value={descuento}
                  onChange={(e) => setDescuento(e.target.value)}
                />
              </div>
              <hr />

              <h4 className="mt-3">Aplicar Recargo (%)</h4>
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Ingrese aumento (%)"
                  value={aumento}
                  onChange={(e) => setAumento(e.target.value)}
                />
              </div> */}
              <h4 className="mt-3">Aplicar Descuento o Recargo (%)</h4>
<div className="mb-3">
  <Select
    options={[
      { value: "discount", label: "Descuento (%)" },
      { value: "increase", label: "Recargo (%)" },
    ]}
    onChange={(option) => setAjusteTipo(option ? option.value : null)}
    isClearable
    placeholder="Seleccione ajuste..."
    value={
      ajusteTipo
        ? {
            value: ajusteTipo,
            label: ajusteTipo === "discount" ? "Descuento (%)" : "Recargo (%)",
          }
        : null
    }
  />

  <input
    type="number"
    className="form-control mt-2"
    placeholder="Ingrese porcentaje (%)"
    value={ajusteValor}
    onChange={(e) => setAjusteValor(e.target.value)}
    disabled={!ajusteTipo}
  />
</div>

              <hr />

              <h4 className="mt-3">Total: ${total}</h4>

              <hr />
              <h4 className="mt-3">Modalidad de Pago</h4>
              <div className="mb-3">
                <select required
                  className="form-select"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="">Seleccione una modalidad de Pago</option>
                  <option value="CASH">Efectivo</option>
                  <option value="CREDIT_CARD">Tarjeta de Crédito</option>
                  <option value="DEBIT_CARD">Tarjeta de Débito</option>
                  <option value="BANK_TRANSFER">Transferencia Bancaria</option>
                  <option value="OTHER">Otro</option>
                </select>
              </div>

              <hr />
              <div className="text-center">
                <div className="text-center">
                  <button
                    className="btn btn-success m-auto"
                    onClick={handleRegisterSale}
                    disabled={loading}
                  >
                    {loading ? "Registrando venta..." : "Confirmar Venta"}
                  </button>
                </div>
              </div>
              <hr />
              {success && (
                <div className="alert alert-success mt-3 text-center">
                  <CheckCircle className="me-2" /> ¡Venta registrada
                  exitosamente!
                </div>
              )}
              {/* Confirmación */}

              {error && (
                <div className="alert alert-danger mt-3" role="alert">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleRegister;
