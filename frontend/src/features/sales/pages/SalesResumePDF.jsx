/* eslint-disable react/prop-types */
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Estilos del PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    paddingTop: 30,
    paddingBottom: 30,
    fontSize: 11,
    backgroundColor: "#ffffff",
    color: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    height: 100, 
    borderBottom: "1px solid #000",
  },
  
  companyInfo: {
    flex: 1,
  },
  logo: {
    width: 95,
    height: 95,
    marginTop:-10
  },
  sectionTitle: {
    fontSize: 13,
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "bold",
    borderBottom: "1px solid #000",
    paddingBottom: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  column: {
    flex: 1,
    minWidth: "45%", // Para asegurar que queden dos columnas
  },
  tableHeader: {
    flexDirection: "row",
    borderBottom: 1,
    marginTop: 5,
    paddingBottom: 2,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: 0.5,
    paddingVertical: 2,
  },
  col: {
    flex: 1,
    paddingHorizontal: 2,
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 9,
    color: "gray",
  },
});

const formatCurrency = (value) => `$${value?.toFixed(2) || "0.00"}`;


const SaleResumePDF = ({ data, company }) => {
  if (!data || !company) return null;
const now = new Date().toLocaleString();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Encabezado con logo y empresa */}
        <View style={styles.header} fixed>
  <View style={styles.companyInfo}>
    <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom:15 }}>{company.name}</Text>
    <Text>CUIT: {company.taxIdentificationNumber}</Text>
    <Text>Dirección: {company.businessAddress}</Text>
    <Text>Teléfono: {company.phone}</Text>
    <Text>Email: {company.email}</Text>
  </View>
  <Image style={styles.logo} src={"src/assets/img/logo.png"} />
</View>


        <Text style={{ fontSize: 18, textAlign: "center", marginBottom: 10 }}>
          Resumen de Venta
        </Text>

        {/* Cliente (en dos columnas) */}
        <Text style={styles.sectionTitle}>Datos del Cliente</Text>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text>Nombre: {data.client?.name || "No disponible"}</Text>
            <Text>DNI: {data.client?.documentNumber || "No disponible"}</Text>
            <Text>CUIT: {data.client?.laxId || "No disponible"}</Text>
          </View>
          <View style={styles.column}>
            <Text>Apellido: {data.client?.lastname || "No disponible"}</Text>
            <Text>Teléfono: {data.client?.phone || "No disponible"}</Text>
            <Text>Dirección: {data.client?.address || "No disponible"}</Text>
          </View>
        </View>

        {/* Información de la Venta (en dos columnas) */}
        <Text style={styles.sectionTitle}>Información de la Venta</Text>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text>ID: {data.id}</Text>
            <Text>Fecha de Venta: {data.saleDate}</Text>
          </View>
          <View style={styles.column}>
            <Text>Estado: {data.status}</Text>
            <Text>Forma de Pago: {data.paymentMethod}</Text>
          </View>
        </View>

        {/* Detalle de productos */}
        <Text style={styles.sectionTitle}>Productos Vendidos</Text>
        <View style={styles.tableHeader}>
          <Text style={[styles.col, { flex: 0.7 }]}>Cod.</Text>
          <Text style={[styles.col, { flex: 2 }]}>Descripción</Text>
          <Text style={[styles.col, { flex: 0.7 }]}>Cant.</Text>
          <Text style={[styles.col, { flex: 1 }]}>P. Unit.</Text>
          <Text style={[styles.col, { flex: 1 }]}>Subtotal</Text>
        </View>

        {data.saleDetails.map((item) => (
          <View key={item.id} style={styles.tableRow}>
            <Text style={[styles.col, { flex: 0.7 }]}>{item.productCode}</Text>
            <Text style={[styles.col, { flex: 2, paddingRigth: 20 }]}>
              {item.productName}, {item.productDescription},{" "}
              {item.productBrandName}, {item.productCategory}
            </Text>
            <Text style={[styles.col, { flex: 0.7 }]}>
              {item.productQuantity}
            </Text>
            <Text style={[styles.col, { flex: 1 }]}>
              {formatCurrency(item.productSalePrice)}
            </Text>
            <Text style={[styles.col, { flex: 1 }]}>
              {formatCurrency(item.subtotal)}
            </Text>
          </View>
        ))}

        {/* Totales en dos columnas */}
        <Text style={styles.sectionTitle}>Totales</Text>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text>Recargo aplicado: {data.extra_charge_percentage}%</Text>
            <Text>Descuento aplicado: {data.discountApplied}%</Text>
          </View>
          <View style={styles.column}>
            <Text>Total:</Text>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              {formatCurrency(data.totalSale)}
            </Text>
          </View>
        </View>

        {/* Pie de página */}
        <Text style={styles.footer}>
          Documento generado automáticamente por el sistema Inventiory. Fecha:{" "}
          {now}
        </Text>
      </Page>
    </Document>
  );
};

export default SaleResumePDF;
