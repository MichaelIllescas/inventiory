import Footer from "./Footer";
import Header from "./Header";

export const MainLayout = ({ children }) => {
    return (
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <Header/>
  
        {/* Contenido principal */}
        <main className="flex-grow p-4">{children}</main>
  
        {/* Footer */}
      <Footer/>
      </div>
    );
  };
  