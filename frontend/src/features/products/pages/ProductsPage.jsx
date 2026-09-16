import React, { useMemo, useState, useEffect } from "react";
import useProducts from "../api/useProducts";
import useUpdateProduct from "../api/useUpdateProduct";
import useToggleProductStatus from "../api/useToggleProductStatus";
import DataTable from "../../../components/DataTable";
import { LoadingScreen } from "../../../components/LoadingScreen";
import EditProductModal from "./EditProductModal";
import ProductDetailsModal from "./ProductDetailsModal";
import ToastMessage from "../../../components/ToastMessage";
import { Modal, Button } from "react-bootstrap";
import { FaEye, FaEdit, FaToggleOn, FaToggleOff } from "react-icons/fa";

const ProductPage = () => {
  const { products, loading, error, fetchProducts, setProducts } = useProducts();
  const { updateProduct } = useUpdateProduct();
  const { toggleStatus } = useToggleProductStatus();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    title: "",
    variant: "success",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (id) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;
    setSelectedProduct({ ...product });
    setIsEditModalOpen(true);
  };

  const handleViewDetails = (id) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;
    setSelectedProduct({ ...product });
    setIsDetailsModalOpen(true);
  };

  const handleConfirmToggle = (product) => {
    if (!product) return;
    setSelectedProduct({ ...product });
    setIsConfirmModalOpen(true);
  };

  const handleToggleStatus = async () => {
    if (!selectedProduct) return;
    const newStatus = selectedProduct.state === "ACTIVO" ? "INACTIVO" : "ACTIVO";

    try {
      const response = await toggleStatus(selectedProduct.id, newStatus);
      if (!response) throw new Error("El backend no respondió correctamente");

      setToast({
        show: true,
        title: "Éxito",
        message: `Producto ${newStatus === "ACTIVO" ? "Activado" : "Desactivado"} correctamente`,
        variant: "success",
      });

      setIsConfirmModalOpen(false);
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === selectedProduct.id ? { ...p, state: newStatus } : p
        )
      );
    } catch (error) {
      setToast({
        show: true,
        title: "Error",
        message: "No se pudo cambiar el estado. Verifica que el backend esté funcionando.",
        variant: "danger",
      });
    }
  };

  const handleSave = async (updatedProduct) => {
    try {
      await updateProduct(updatedProduct);
      setToast({
        show: true,
        title: "Éxito",
        message: "Producto actualizado correctamente",
        variant: "success",
      });
      setIsEditModalOpen(false);
      fetchProducts();
    } catch (error) {
      setToast({
        show: true,
        title: "Error",
        message: "No se pudo actualizar el producto",
        variant: "danger",
      });
    }
  };

  const columns = useMemo(
    () => [
      { Header: "CÓDIGO", accessor: "code" },
      { Header: "NOMBRE", accessor: "name" },
      { Header: "MARCA", accessor: "brandName" },
      { Header: "DESCRIPCIÓN", accessor: "description" },
      { Header: "PRECIO VENTA", accessor: "salePrice", Cell: ({ value }) => `$${value.toFixed(2)}` },
      { Header: "STOCK", accessor: "stock" },
      { Header: "ESTADO", accessor: "state", Cell: ({ value }) => (value === "ACTIVO" ? "Activo" : "Inactivo") },
      {
        Header: "ACCIONES",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="d-flex justify-content-center gap-2">
            <button className="btn btn-info btn-sm" onClick={() => handleViewDetails(row.original.id)} title="Ver Detalles">
              <FaEye />
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => handleEdit(row.original.id)} title="Editar Producto">
              <FaEdit />
            </button>
            <button
              className={`btn btn-${row.original.state === "ACTIVO" ? "success" : "danger"} btn-sm`}
              onClick={() => handleConfirmToggle(row.original)}
              title={row.original.state === "ACTIVO" ? "Desactivar" : "Activar"}
            >
              {row.original.state === "ACTIVO" ? <FaToggleOn /> : <FaToggleOff />}
            </button>
          </div>
        ),
      },
    ],
    [products]
  );

  if (loading) return <LoadingScreen />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mt-3 pt-1">
      <div className="container card mt-5 pt-5 table-responsive table" data-aos="fade-left">
        <h2>Productos Registrados</h2>
        <DataTable columns={columns} data={products || []} />
      </div>
      <EditProductModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} productData={selectedProduct} onSubmit={handleSave} />
      <ProductDetailsModal isOpen={isDetailsModalOpen} onClose={() => setIsDetailsModalOpen(false)} product={selectedProduct} />
   
      <Modal show={isConfirmModalOpen} onHide={() => setIsConfirmModalOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Cambio de Estado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro de que desea {selectedProduct?.state === "ACTIVO" ? "desactivar" : "activar"} el producto <strong>{selectedProduct?.name}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsConfirmModalOpen(false)}>Cancelar</Button>
          <Button variant={selectedProduct?.state === "ACTIVO" ? "danger" : "success"} onClick={handleToggleStatus}>
            {selectedProduct?.state === "ACTIVO" ? "Desactivar" : "Activar"}
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastMessage show={toast.show} onClose={() => setToast({ ...toast, show: false })} message={toast.message} title={toast.title} variant={toast.variant} delay={5000} />
    </div>
  );
};

export default ProductPage;