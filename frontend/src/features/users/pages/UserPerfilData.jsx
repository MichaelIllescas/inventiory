import { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { FaUser } from "react-icons/fa"; 
import useUserProfile from "../api/useUserProfile";
import ToastMessage from "../../../components/ToastMessage";
import EditModalProfile from "./EditModalProfile";
import useUpdateUser from "../api/useUpdateUser";


const UserPerfilData = () => {
  const [user, setUser] = useState(null);
  const { loading, error, fetchUserProfile } =useUserProfile();
   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
   const { updateUser } = useUpdateUser();
     const [toast, setToast] = useState({
       show: false,
       message: "",
       title: "",
       variant: "success",
     });
   

     const fetchData = async () => {
       try {
         const response = await fetchUserProfile(); // Esperar la respuesta del backend
         console.log(response); // Verificar qué devuelve el backend
         setUser(response); // Asignar los datos al estado
       } catch (err) {
         console.error("Error al obtener el perfil del usuario:", err);
       }
     };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (user) => {
    try {
      await updateUser(user);
      setToast({
        show: true,
        title: "Éxito",
        message: "Usuario actualizado correctamente",
        variant: "success",
      });
      setIsEditModalOpen(false);
      fetchData();
  
    } catch (error) {
      console.error("Error en handleSave:", error);

      // Intentamos extraer el mensaje de error desde diferentes fuentes
      let errorMessage = "Error desconocido al actualizar usuario";

      if (error.response?.data?.error) {
        errorMessage = error.response.data.error; // Mensaje desde la respuesta HTTP
      } else if (error.message) {
        errorMessage = error.message; // Mensaje del objeto Error
      }

      setToast({
        show: true,
        title: "Error",
        message: errorMessage,
        variant: "danger",
      });
    }
  };


  if (loading) return <p>Cargando datos del usuario...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (

    <>
    <div className="container mt-1 py-1">
      <Card className="shadow border-0 px-4 py-4" style={{ maxWidth: "700px", margin: "auto" }}>
        <div className="text-center mb-0">
          <FaUser size={50} className="text-primary mb-0" />
          <h2 className="fw-bold">{user?.firstName} {user?.lastName}</h2>
          <p className="text-muted">{user?.email}</p>
        </div>

        <div className="row">
          <div className="col-md-6">
            <h6 className="text-secondary fw-semibold">Información Personal</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><strong>Documento:</strong> {user?.documentNumber}</li>
              <li className="mb-2"><strong>Fecha de Registro:</strong> {user?.registrationDate}</li>
            </ul>
          </div>

          <div className="col-md-6">
            <h6 className="text-secondary fw-semibold">Contacto</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><strong>Email:</strong> {user?.email}</li>
              <li className="mb-2"><strong>Teléfono:</strong> {user?.phone}</li>
              <li className="mb-2"><strong>Dirección:</strong> {user?.address}</li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-4">
          <Button variant="primary" className="px-4" onClick={() =>setIsEditModalOpen(true)} >
            Editar Perfil
          </Button>
        </div>
      </Card>


      <EditModalProfile
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        data={user}
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

export default UserPerfilData;
