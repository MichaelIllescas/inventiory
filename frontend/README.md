# 💻 Inventiory - Frontend

Este repositorio contiene el frontend de **Inventiory**, un **ERP web orientado a PyMEs**, desarrollado con React.  
Se conecta al backend para ofrecer una interfaz moderna y responsiva para la gestión de productos, clientes, stock, ventas, facturación y reportes  rentables de tu negocio..

---

## 🧠 Visión general

El frontend permite a usuarios con distintos roles (Administrador y usuarios) acceder a las funcionalidades de Inventiory a través de una interfaz web intuitiva, optimizada para desktop y dispositivos móviles.

---

## 🎯 Funcionalidades

- Autenticación con JWT y control de roles
- Dashboard con KPIs y métricas
- Gestión de productos, stock, clientes y proveedores
- Registro y edición de ventas
- Facturación automática con exportación PDF
- Visualización de reportes de ventas y ganancias
- Sistema de alertas por bajo stock

---

## 🧱 Tecnologías utilizadas

- **React**
- **Axios** (para consumir la API REST del backend)
- **React Router DOM**
- **Bootstrap 5**
- **HTML / CSS**
- **React Icons**
- **Vite** 

---

## ⚙️ Instalación

### Requisitos

- Node.js 18+
- NPM o Yarn
- Acceso a la URL del backend

### Pasos

```bash
# Clonar el repositorio
git clone https://github.com/MichaelIllescas/inventiory-frontend.git
cd inventiory-frontend

# Instalar dependencias
npm install


## 🌐 Configuración 

# Crear archivo de configuración
Dentro de src/config  configura la url de la api en el archivo axiosConfig.js 
# Luego editar .env con la URL real del backend

# Iniciar el servidor de desarrollo
npm run dev
```




---

## 🔗 Backend relacionado

👉 El backend del proyecto se encuentra en un repositorio separado:  
[Inventiory - Backend](https://github.com/MichaelIllescas/inventiory-backend.git)

---

## 👨‍💻 Autor

- Michael Jonathan Illescas

---

## 📄 Licencia

MIT
