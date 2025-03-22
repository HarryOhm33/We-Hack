import React from "react";
import Navbar from "../components/Navbar/Navbar";
import BackgroundAnimation from "../components/LandingPage/BackgroundAnimation";
import HeroSection from "../components/LandingPage/HeroSection";
import FeaturesOverview from "../components/LandingPage/FeaturesOverview";
import CTA from "../components/LandingPage/CTA";
import Footer from "../components/LandingPage/Footer";

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