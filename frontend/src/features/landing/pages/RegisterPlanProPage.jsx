import React from 'react'
import NavBarLandingPage from '../components/NavBarLandingPage';
import Footer from '../../../layout/Footer';
import RegisterProPlan from '../components/RegisterProPlan';

const RegisterPlanProPage = () => {
    return (
        <>
          <NavBarLandingPage />
          <main style={{ marginTop: '40px' }}>
          <RegisterProPlan/>
          </main>
          <Footer />
        </>
      );
}

export default RegisterPlanProPage
