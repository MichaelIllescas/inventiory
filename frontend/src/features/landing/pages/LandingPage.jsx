import HeroSection from "../components/HeroSection";
import NavBarLandingPage from "../components/NavBarLandingPage";
import "../../../styles/landing.css"
import KeyBenefitsSection from "../components/KeyBenefitsSection";
import HowItWorksSection from "../components/HowItWorksSection";
import MainFeaturesSection from "../components/MainFeaturesSection";
import PricingSection from "../components/PricingSection";
import FaqSection from "../components/FaqSection";
import FinalCallToActionSection from "../components/FinalCallToActionSection";
import Footer from "../../../layout/Footer"
import ContactSection from "../components/ContactSection";

const LandingPage = () => {
  return (
    <>
    <div className="bg-image">
       <NavBarLandingPage/> 
        <HeroSection/>
        <KeyBenefitsSection/>
        <HowItWorksSection/>
        <MainFeaturesSection/>
        <PricingSection/>
        <FaqSection/>
        <FinalCallToActionSection/>
        <ContactSection/>
        <Footer/>
    </div>
       
    </>
  )
}

export default LandingPage;
