import { useEffect, useState } from "react";
import UserPerfilData from "./UserPerfilData";
import CompanyData from "./CompanyData";
import CompanyRegistrationForm from "./CompanyRegistrationForm";
import useCompany from "../api/useCompany";

const ProfileManagementTabs = () => {
  const [activeTab, setActiveTab] = useState("user-profile");
  const [companyData, setCompanyData] = useState(null);
  const { fetchCompany, loading } = useCompany();

  useEffect(() => {
    const checkCompany = async () => {
      const company = await fetchCompany();
      if (company && !company.error) {
        setCompanyData(company);
      } else {
        setCompanyData(null);
      }
    };

    checkCompany();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="mt-3 pt-2">
      <div className="container mt-5 pt-3 card col-sm-12 col-md-8 col-lg-8">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "user-profile" ? "active" : ""}`}
              onClick={() => handleTabChange("user-profile")}
            >
              Perfil de Usuario
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "company-profile" ? "active" : ""}`}
              onClick={() => handleTabChange("company-profile")}
            >
              Perfil de Empresa
            </button>
          </li>
        </ul>

        <div className="tab-content mt-3">
          {activeTab === "user-profile" && <UserPerfilData />}
          {activeTab === "company-profile" && (
            loading ? (
              <p>Cargando datos de empresa...</p>
            ) : companyData ? (
              <CompanyData companyData={companyData} />
            ) : (
              <CompanyRegistrationForm
                onSuccess={(newCompany) => {
                  setCompanyData(newCompany); // Actualiza la vista con los datos
                  setActiveTab("company-profile"); // Cambia a la pestaña si no estaba
                }}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileManagementTabs;
