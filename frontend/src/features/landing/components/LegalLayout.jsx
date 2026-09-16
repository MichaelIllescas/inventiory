import React from 'react';
import NavBarLandingPage from './NavBarLandingPage';
import Footer from "../../../layout/Footer";
import PrivacyPage from '../components/PrivacyPage';
import TermsPage from '../components/TermsPage';

const LegalLayout = () => {
  return (
    <>
      <NavBarLandingPage />
      <main style={{ marginTop: '90px' }}>
        <PrivacyPage/>
        <TermsPage/>
      </main>
      <Footer />
    </>
  );
};

export default LegalLayout;
