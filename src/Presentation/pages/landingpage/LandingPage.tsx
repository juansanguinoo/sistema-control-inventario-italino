import { AboutUsLandingPage } from "./components/AboutUs";
import { ContactLandingPage } from "./components/Contact";
import { FeaturesLandingPage } from "./components/Features";
import { FooterLandingPage } from "./components/Footer";
import { HeaderLandingPage } from "./components/Header";
import { HeroLandingPage } from "./components/Hero";
import { ProductsLandingPage } from "./components/Products";
import { StatisticsLandingPage } from "./components/Statistics";
import "./styles.css";

export const LandingPage = () => {
  return (
    <div className="landing-container">
      <HeaderLandingPage />
      <HeroLandingPage />
      <ProductsLandingPage />
      <AboutUsLandingPage />
      <StatisticsLandingPage />
      <FeaturesLandingPage />
      <ContactLandingPage />
      <FooterLandingPage />
    </div>
  );
};
