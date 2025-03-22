import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Background from "../components/BackgroundAnimation";

const Home = () => {
  const navigate = useNavigate();

  const FeatureCard = ({ icon, title, description, delay }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="bg-gray-900 bg-opacity-50 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-gray-800 hover:border-purple-500 transition-all duration-300"
    >
      <div className="p-6">
        <div className="text-3xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Background />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 pb-16 z-10">
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
              Traditional degrees don't always reflect skills. Our platform
              helps companies assess candidates based on practical skills, not
              just certifications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg"
                onClick={() => navigate("/signup")}
              >
                Get Started
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-900 border border-gray-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg"
                onClick={() => navigate("/login")}
              >
                Login
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
              <div className="relative bg-gray-900 rounded-lg p-4">
                <div className="h-96 w-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center backdrop-blur-lg">
                  <div className="text-center space-y-4">
                    <div className="text-2xl text-white font-bold">
                      Platform Preview
                    </div>
                    <div className="text-gray-400">
                      Interactive skill assessments
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 z-10 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Why{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                Skill-Based
              </span>{" "}
              Hiring Works
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Transform your hiring process with data-driven skill assessments
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🎯",
                title: "Precise Assessments",
                description:
                  "Real-world challenges instead of resume screening",
              },
              {
                icon: "🤖",
                title: "AI Matching",
                description: "Smart candidate-job matching algorithm",
              },
              {
                icon: "📊",
                title: "Analytics",
                description: "Detailed performance insights and metrics",
              },
              {
                icon: "👁️",
                title: "Blind Hiring",
                description: "Focus purely on demonstrated skills",
              },
            ].map((feature, index) => (
              <FeatureCard key={index} {...feature} delay={index * 0.2} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 z-10 px-6">
        <div className="container mx-auto">
          <div className="bg-gray-900 bg-opacity-60 backdrop-blur-lg rounded-2xl p-12 shadow-2xl border border-gray-800 max-w-4xl mx-auto">
            <div className="text-center">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold mb-6 text-white"
              >
                Ready to Revolutionize Hiring?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-gray-300 mb-8 max-w-2xl mx-auto"
              >
                Join companies that found better talent 3x faster
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row justify-center gap-4"
              >
                <input
                  type="email"
                  placeholder="Enter your work email"
                  className="px-6 py-4 rounded-lg bg-gray-800 border border-gray-700 text-white w-full sm:w-auto min-w-0 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
                <button
                  onClick={() => navigate("/signup")}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Start Free Trial
                </button>
              </motion.div>
              <p className="text-gray-500 mt-4 text-sm">
                14-day free trial • No credit card required
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
