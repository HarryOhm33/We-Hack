import { motion } from "framer-motion";
import React from "react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 pb-16 z-10 overflow-hidden">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
            <span className="block">SKILL-BASED</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              HIRING
            </span>
          </h1>

          <p className="text-gray-300 text-xl mb-8 max-w-lg">
            Traditional degrees don't always reflect skills. Our platform helps
            companies assess candidates based on practical skills, not just
            certifications.
          </p>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg"
            >
              EXPLORE
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent text-white border border-gray-600 px-8 py-3 rounded-full text-lg font-semibold shadow-md"
            >
              LOG IN
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-full lg:w-1/2 flex justify-center"
        >
          <div className="relative">
            <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 opacity-30 blur-xl"></div>
            <div className="relative">
              <img
                src="/api/placeholder/550/400"
                alt="Skill assessment visualization"
                className="w-full max-w-lg object-cover rounded-lg"
              />
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-8 h-8 bg-yellow-400 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-10 left-10 w-6 h-6 bg-purple-500 rounded-full"></div>
              <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-pink-500 rounded-full"></div>

              {/* Circuit-like lines */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 550 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M50,200 Q150,50 275,200 T500,200"
                  stroke="#EC4899"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
                <path
                  d="M100,350 Q200,200 325,350 T550,350"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
                <path
                  d="M-50,100 Q50,250 175,100 T400,100"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
