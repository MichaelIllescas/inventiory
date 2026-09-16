import BestSellingProductsTable from "./BestSellingProductsTable";
import LowStockProductsTable from "./LowStockProductsTable";
import DailyEarningsChart from "./DailyEarningsChart";
import QuarterlyEarningsChart from "./QuarterlyEarningsChart";
import MonthlyEarningsCard from "./MonthlyEarningsCard";
import TotalEarningsCard from "./TotalEarningsCard";
import ProfitabilityCard from "./ProfitabilityCard";
import TopCustomersTable from "./TopCustomersTable";
import TotalCustomersCard from "./TotalCustomersCard";
import TotalProductsCard from "./TotalProductsCard";
import TotalInvestmentCard from "./TotalInvestmentCard";
import useDashboardData from "../../dashboard/api/useDashboardData";
import InventoryTour from "./InventoryTour";

const Dashboard = () => {
  
  const { dashboardData, loading, error } = useDashboardData();

  if (loading) return <p className="text-center mt-5">Cargando datos del dashboard...</p>;
  if (error) return <p className="text-center mt-5 text-danger">Error al cargar el dashboard.</p>;

  return (
<>

    <div className="container mt-5 pt-4" data-aos="fade-in">
      <h1 className="mb-4 text-center" data-aos="fade-down">
        📊 Dashboard de Inventiory
      </h1>

      {/* Contenedor de métricas */}
      <div className="row text-center">
        <div className="col-md-4 col-12 mb-3" data-aos="flip-left">
          <TotalEarningsCard prod={dashboardData.totalNetProfit} />
        </div>
        <div className="col-md-4 col-12 mb-3" data-aos="flip-left" data-aos-delay="200">
          <MonthlyEarningsCard prod={dashboardData.currentMonthProfit} />
        </div>
        <div className="col-md-4 col-12 mb-3" data-aos="flip-left" data-aos-delay="400">
          <ProfitabilityCard prod={dashboardData.totalProfitability} />
        </div>
      </div>

      {/* Sección de tablas */}
      <div className="row">
        <div className="col-lg-6 col-12 mb-3" data-aos="fade-right">
          <BestSellingProductsTable prod={dashboardData.topSellingProducts} />
        </div>
        <div className="col-lg-6 col-12 mb-3" data-aos="fade-left">
          <LowStockProductsTable prod={dashboardData.lowStockProducts} />
        </div>
      </div>

      <div className="row">
  <div className="col-lg-6 col-12 mb-3" data-aos="zoom-in">
    <DailyEarningsChart prod={dashboardData.weeklyProfits} />
  </div>
  <div className="col-lg-6 col-12 mb-3" data-aos="zoom-in" data-aos-delay="300">
    <QuarterlyEarningsChart prod={dashboardData.quarterlyProfits} />
  </div>
</div>


      {/* Sección de ranking de clientes */}
      <div className="row">
        <div className="col-12" data-aos="fade-up">
          <TopCustomersTable prod={dashboardData.topCustomers} />
        </div>
      </div>

      {/* 🚀 Nueva Sección de Métricas */}
      <div className="row text-center mt-4">
        <div className="col-md-4 col-12 mb-3" data-aos="fade-up">
          <TotalCustomersCard prod={dashboardData.totalRegisteredClients} />
        </div>
        <div className="col-md-4 col-12 mb-3" data-aos="fade-up" data-aos-delay="200">
          <TotalProductsCard prod={dashboardData.totalRegisteredProducts} />
        </div>
        <div className="col-md-4 col-12 mb-3" data-aos="fade-up" data-aos-delay="400">
          <TotalInvestmentCard prod={dashboardData.totalInvestedCapital} />
        </div>
      </div>
    </div>

</>
  );
};

export default Dashboard;
