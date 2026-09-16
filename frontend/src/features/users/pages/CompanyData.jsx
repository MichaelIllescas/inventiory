import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { FaBuilding } from "react-icons/fa";
import useCompany from "../api/useCompany";
import ToastMessage from "../../../components/ToastMessage";
import EditModaCompany from "./EditModalCompany";
import { LoadingScreen } from '../../../components/LoadingScreen';
import useUpdateCompany from "../api/useUpdateCompany";

const CompanyData = ({ companyData }) => {
  const [company, setCompany] = useState(companyData); // Usar datos recibidos
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    title: "",
    variant: "success",
  });
  console.log(companyData)

  const { fetchCompany } = useCompany(); // Solo para usar en la actualización
  const { updateCompany } = useUpdateCompany();

  const fetchData = async () => {
    try {
      const response = await fetchCompany();
      setCompany(response);
    } catch (err) {
      console.error("Error al obtener los datos de su Compañía:", err);
    }
  };

  const handleSave = async (updatedCompany) => {
    try {
      await updateCompany(updatedCompany);
      setToast({
        show: true,
        title: "Éxito",
        message: "Compañía actualizada correctamente",
        variant: "success",
      });
      setIsEditModalOpen(false);
      fetchData(); // Ahora sí refrescamos los datos
    } catch (error) {
      let errorMessage = "Error desconocido al actualizar la Compañía";
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }

      setToast({
        show: true,
        title: "Error",
        message: errorMessage,
        variant: "danger",
      });
    }
  };

  if (!company) return <LoadingScreen />;

  return (
    <>
      <div className="container mt-1 py-1">
        <Card className="shadow-sm border-1 px-4 py-4" style={{ maxWidth: "700px", margin: "auto" }}>
          <div className="text-center mb-0">
            <FaBuilding size={50} className="text-primary mb-0" />
            <h2 className="fw-bold">{company?.name}</h2>
            <p className="text-muted">{company?.email}</p>
          </div>

          <div className="row">
            <div className="col-md-6">
              <h6 className="text-secondary fw-semibold">Información de la Empresa</h6>
              <ul className="list-unstyled">
                <li className="mb-2"><strong>CIUT:</strong> {company?.taxIdentificationNumber}</li>
                <li className="mb-2"><strong>Fecha de Registro:</strong> {company?.registrationDate}</li>
              </ul>
            </div>

            <div className="col-md-6">
              <h6 className="text-secondary fw-semibold">Contacto</h6>
              <ul className="list-unstyled">
                <li className="mb-2"><strong>Email:</strong> {company?.email}</li>
                <li className="mb-2"><strong>Teléfono:</strong> {company?.phone}</li>
                <li className="mb-2"><strong>Dirección:</strong> {company?.businessAddress}</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-4">
            <Button variant="primary" className="px-4" onClick={() => setIsEditModalOpen(true)}>
              Editar Compañía
            </Button>
          </div>
        </Card>

        <EditModaCompany
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          data={company}
          onSubmit={handleSave}
        />
      </div>

      <ToastMessage
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        message={toast.message}
        title={toast.title}
        variant={toast.variant}
      />
    </>
  );
};

export default CompanyData;
