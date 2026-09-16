import { lazy, Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { LoginPage } from "../features/auth/pages/LoginPage";
import  Dashboard  from "../features/dashboard/pages/Dashboard";
import { ProtectedRoute } from "./ProtectedRoute";
import ProviderRegister from "../features/providers/pages/ProviderRegister";
import ProvidersPage from "../features/providers/pages/ProvidersPage";
import ProductRegister from "../features/products/pages/ProductRegister";
import ProductPage from "../features/products/pages/ProductsPage";
import ModifyPrice from "../features/products/pages/ModifyPrice";
import ClientRegister from "../features/clients/pages/ClientRegister";
import ClientsPage from "../features/clients/pages/ClientsPage";
import StockPage from "../features/stocks/pages/StockPage";
import ExpensesPage from "../features/expenses/pages/ExpensesPage";
import ExpenseRegister from "../features/expenses/pages/ExpenseRegister";
import SaleRegister from "../features/sales/pages/SaleRegister";
import SalesPage from "../features/sales/pages/SalesPage";
import DailyIcomePage from "../features/reports/pages/DailyIcomePage";
import MonthlyIncomePage from "../features/reports/pages/MonthlyIncomePage";
import AnnualIncomePage from "../features/reports/pages/AnnualIncomePage";
import TopCustomersPage from "../features/reports/pages/TopCustomersPage";
import TopSellingProductsPage from "../features/reports/pages/TopSellingProductsPage";
import InventoryAnalysisPage from "../features/reports/pages/InventoryAnalysisPage";
import ProfitabilityPage from "../features/reports/pages/ProfitabilityPage";
import ExpenseAnalysisPage from "../features/reports/pages/ExpenseAnalysisPage";
import ForgotPassword from "../components/ForgotPassword";
import ResetPassword from "../components/ResetPassword";
import { LoadingScreen } from "../components/LoadingScreen";
import { useAuth } from "../../src/contexts/AuthContext";
import LegalLayout from "../features/landing/components/LegalLayout";
import TermsPage from "../features/landing/components/TermsPage";
import PrivacyPage from "../features/landing/components/PrivacyPage";
import RegisterFreeTrialPage from "../features/landing/pages/RegisterFreeTrialPage";
import RegisterPlanProPage from "../features/landing/pages/RegisterPlanProPage";

const UsersPage = lazy(() => import("../features/users/pages/UsersPage"));
const RegisterForm = lazy(() => import("../features/users/pages/RegisterForm"));
const ChangePassword = lazy(() => import("../features/users/pages/changePassword"));
const PerfilManagemetnTabs = lazy(() =>
  import("../features/users/pages/PerfilManagementTabs")
);

export const AppRoutes = () => {
  const { user } = useAuth();
  const role = user?.roles?.[0]?.authority;
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
      {/* Ruta pública para el login */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      {/* Legales: cada documento con su propia ruta y enlace compartible */}
      <Route path="/terminos" element={<LegalLayout><TermsPage /></LegalLayout>} />
      <Route path="/privacidad" element={<LegalLayout><PrivacyPage /></LegalLayout>} />
      {/* Ruta anterior, se mantiene para no romper enlaces ya publicados */}
      <Route path="/legalTerms" element={<Navigate to="/terminos" replace />} />
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
        <Route path="/productRegister" element={<ProtectedRoute element={<ProductRegister/>} />} />
        <Route path="/productsList" element={<ProtectedRoute element={<ProductPage/>} />} />
        <Route path="/updatePrice" element={<ProtectedRoute element={<ModifyPrice/>} />} />
        <Route path="/clientRegister" element={<ProtectedRoute element={<ClientRegister/>} />} />
        <Route path="/clientsList" element={<ProtectedRoute element={<ClientsPage/>} />} />
        <Route path="/stocksList" element={<ProtectedRoute element={<StockPage/>} />} />
        <Route path="/expensesList" element={<ProtectedRoute element={<ExpensesPage/>} />} />
        <Route path="/expenseRegister" element={<ProtectedRoute element={<ExpenseRegister/>} />} />
        <Route path="/saleRegister" element={<ProtectedRoute element={<SaleRegister />} />} />
        <Route path="/salesList" element={<ProtectedRoute element={<SalesPage/>} />} />
        <Route path="/dailyincome" element={<ProtectedRoute element={<DailyIcomePage/>} />} />
        <Route path="/monthlyIncome" element={<ProtectedRoute element={<MonthlyIncomePage/>} />} />
        <Route path="/anualIncome" element={<ProtectedRoute element={<AnnualIncomePage/>} />} />
        <Route path="/topCustomers" element={<ProtectedRoute element={<TopCustomersPage/>} />} />
        <Route path="/topProducts" element={<ProtectedRoute element={<TopSellingProductsPage/>} />} />
        <Route path="/inventoryAnalysis" element={<ProtectedRoute element={<InventoryAnalysisPage/>} />} />
        <Route path="/profiability" element={<ProtectedRoute element={<ProfitabilityPage/>} />} />
        <Route path="/expenseAnalysis" element={<ProtectedRoute element={<ExpenseAnalysisPage/>} />} />
        <Route path="/changePassword" element={<ProtectedRoute element={<ChangePassword/>} />} />
        <Route path="/configuration" element={<ProtectedRoute element={<PerfilManagemetnTabs/>} />} />



      {/* Redirigir cualquier ruta desconocida a "/login" */}
      <Route path="*" element={<LoginPage />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Suspense>
  );
};
