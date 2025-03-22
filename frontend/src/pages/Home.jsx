import React from "react";
import BackgroundAnimation from "../components/LandingPage/BackgroundAnimation";
import CTA from "../components/LandingPage/CTA";
import FeaturesOverview from "../components/LandingPage/FeaturesOverview";
import Footer from "../components/LandingPage/Footer";
import HeroSection from "../components/LandingPage/HeroSection";
import Navbar from "../components/Navbar/Navbar";

const Home = () => {
  return (
    <div className="bg-gray-900 min-h-screen">
      <BackgroundAnimation />
      <Navbar />
      <HeroSection />
      <FeaturesOverview />
      <CTA />
      <Footer />
    </div>
  );
};

export default Home;
