/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { FaDownload } from "react-icons/fa";
import useCompany from "../../users/api/useCompany";
import SaleResumePDF from "./SalesResumePDF";

const BtnDownloadResume = ({ data }) => {
  const { fetchCompany } = useCompany();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const obtenerEmpresa = async () => {
      const result = await fetchCompany();
      if (result) setCompany(result);
    };
    obtenerEmpresa();
  }, []);

  if (!data || !company) return null;

  return (
    <PDFDownloadLink 
      document={<SaleResumePDF data={data} company={company} />}
      fileName={`resumen_venta_${data.id || "sin_id"}.pdf`}
      className="btn btn-primary btn-sm p-2"
      size={16}
    >
      {({ loading }) =>
        loading ? "Generando PDF..." : (
          <span
            title="Descargar resumen de venta"
            style={{ display: "flex", alignItems: "center", gap: "5px" }}
          >
            <FaDownload size={16}/> 
          </span>
        )
      }
    </PDFDownloadLink>
  );
};

export default BtnDownloadResume;
