import React from 'react'
import NavBarLandingPage from '../components/NavBarLandingPage';
import RegisterFreeTrial from '../components/RegisterFreeTrial';
import Footer from '../../../layout/Footer';

const RegisterFreeTrialPage = () => {
    return (
        <>
          <NavBarLandingPage />
          <main style={{ marginTop: '40px' }}>
          <RegisterFreeTrial/>
          </main>
          <Footer />
        </>
      );
}

export default RegisterFreeTrialPage
