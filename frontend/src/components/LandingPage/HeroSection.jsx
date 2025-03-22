import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 z-10">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }} 
        className="text-5xl font-bold mb-6 text-white"
      >
        Hire Based on Skills, Not Degrees
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-gray-300 text-xl mb-8 max-w-2xl"
      >
        Find the perfect talent based on verified skills and competencies rather than traditional credentials.
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 1.2 }} 
        className="space-x-4"
      >
        <button className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-md text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
          Get Started
        </button>
        <button className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 px-6 py-3 rounded-md text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300">
          Explore
        </button>
      </motion.div>
    </section>
  );
};

export default HeroSection;