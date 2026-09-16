import { Routes, Route } from "react-router-dom";
import { LoginPage } from "../features/auth/pages/LoginPage";
import  Dashboard  from "../features/dashboard/pages/Dashboard";
import  UsersPage  from "../features/users/pages/UsersPage";
import  RegisterForm  from "../features/users/pages/RegisterForm";
import { ProtectedRoute } from "./ProtectedRoute";
import ProviderRegister from "../features/providers/pages/ProviderRegister";
import ProvidersPage from "../features/providers/pages/ProvidersPage";
import ProductRegister from "../features/products/pages/ProductRegister";
import ProductPage from "../features/products/pages/ProductsPage";
import UpdateStock from "../features/products/pages/StockUpdate";
import ModifyPrice from "../features/products/pages/ModifyPrice";
import ClientRegister from "../features/clients/pages/ClientRegister";
import ClientsPage from "../features/clients/pages/ClientsPage";
import ProductManagementTabs from "../features/buys/pages/ProductManagementTabs";
import StockPage from "../features/stocks/pages/StockPage";
import PurchasesPage from "../features/buys/pages/PurchasesPage";
import ExpensesPage from "../features/expenses/pages/ExpensesPage";
import ExpenseRegister from "../features/expenses/pages/ExpenseRegister";
import SaleRegister from "../features/sales/pages/SaleRegister";
import SalesPage from "../features/sales/pages/SalesPage";
import DailyIcomePage from "../features/reports/pages/DailyIcomePage";
import MonthlyIncomePage from "../features/reports/pages/MonthlyIncomePage";
import AnnualIncomePage from "../features/reports/pages/AnnualIncomePage";
import TopCustomersPage from "../features/reports/pages/TopCustomersPage";
import TopSellingProductsPage from "../features/reports/pages/TopSellingProductsPage";
import ProfitabilityPage from "../features/reports/pages/ProfitabilityPage";
import ChangePassword from "../features/users/pages/changePassword";
import PerfilManagemetnTabs from "../features/users/pages/PerfilManagementTabs";
import ForgotPassword from "../components/ForgotPassword";
import ResetPassword from "../components/ResetPassword";
import { useAuth } from "../../src/contexts/AuthContext";
import LandingPage from "../features/landing/pages/LandingPage";
import LegalLayout from "../features/landing/components/LegalLayout";
import RegisterFreeTrial from "../features/landing/components/RegisterFreeTrial";
import RegisterFreeTrialPage from "../features/landing/pages/RegisterFreeTrialPage";
import RegisterPlanPro from "../features/landing/pages/RegisterPlanProPage";
import RegisterPlanProPage from "../features/landing/pages/RegisterPlanProPage";

export const AppRoutes = () => {
  const { user } = useAuth();
  const role = user?.roles?.[0]?.authority;
  return (
    <Routes>
      {/* Ruta pública para el login */}
      <Route path="/login" element={<LoginPage />} />
      {/* Ruta pública para landing page */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/legalTerms" element={<LegalLayout />} />
      <Route path="/registerFreeTrial" element={<RegisterFreeTrialPage />} />
      <Route path="/registerPro" element={<RegisterPlanProPage />} />
      
      {/* Rutas protegidas dentro de MainLayout
      */}


      {/* users managenent */}

   {role === "ADMIN" && (
  <>
    <Route path="/userList" element={<ProtectedRoute element={<UsersPage />} />} />
    <Route path="/userRegister" element={<ProtectedRoute element={<RegisterForm />} />} />
  </>
)}

        
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/providerRegister" element={<ProtectedRoute element={<ProviderRegister/>} />} />
        <Route path="/providerList" element={<ProtectedRoute element={<ProvidersPage/>} />} />
        <Route path="/productRegister" element={<ProtectedRoute element={<ProductManagementTabs/>} />} />
        <Route path="/productsList" element={<ProtectedRoute element={<ProductPage/>} />} />
        <Route path="/updateStock" element={<ProtectedRoute element={<UpdateStock/>} />} />
        <Route path="/updatePrice" element={<ProtectedRoute element={<ModifyPrice/>} />} />
        <Route path="/clientRegister" element={<ProtectedRoute element={<ClientRegister/>} />} />
        <Route path="/clientsList" element={<ProtectedRoute element={<ClientsPage/>} />} />
        <Route path="/buyRegister" element={<ProtectedRoute element={<ProductManagementTabs/>} />} />
        <Route path="/stocksList" element={<ProtectedRoute element={<StockPage/>} />} />
        <Route path="/buistHistory" element={<ProtectedRoute element={<PurchasesPage/>} />} />
        <Route path="/expensesList" element={<ProtectedRoute element={<ExpensesPage/>} />} />
        <Route path="/expenseRegister" element={<ProtectedRoute element={<ExpenseRegister/>} />} />
        <Route path="/saleRegister" element={<ProtectedRoute element={<SaleRegister />} />} />
        <Route path="/salesList" element={<ProtectedRoute element={<SalesPage/>} />} />
        <Route path="/dailyincome" element={<ProtectedRoute element={<DailyIcomePage/>} />} />
        <Route path="/monthlyIncome" element={<ProtectedRoute element={<MonthlyIncomePage/>} />} />
        <Route path="/anualIncome" element={<ProtectedRoute element={<AnnualIncomePage/>} />} />
        <Route path="/topCustomers" element={<ProtectedRoute element={<TopCustomersPage/>} />} />
        <Route path="/topProducts" element={<ProtectedRoute element={<TopSellingProductsPage/>} />} />
        <Route path="/profiability" element={<ProtectedRoute element={<ProfitabilityPage/>} />} />
        <Route path="/changePassword" element={<ProtectedRoute element={<ChangePassword/>} />} />
        <Route path="/configuration" element={<ProtectedRoute element={<PerfilManagemetnTabs/>} />} />



      {/* Redirigir cualquier ruta desconocida a "/login" */}
      <Route path="*" element={<LoginPage />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
};
