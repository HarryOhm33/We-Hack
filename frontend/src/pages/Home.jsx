import React from "react";
import Background from "../components/BackgroundAnimation";
import CTA from "../components/LandingPage/CTA";
import FeaturesOverview from "../components/LandingPage/FeaturesOverview";
import Footer from "../components/LandingPage/Footer";
import HeroSection from "../components/LandingPage/HeroSection";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background Animation */}
      <Background />

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Overview */}
      <FeaturesOverview />

      {/* Call to Action */}
      <CTA />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
