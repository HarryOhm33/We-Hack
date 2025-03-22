import { motion } from "framer-motion";
import React from "react";

const CTA = () => {
  return (
    <section className="py-20 relative z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-pink-900 opacity-20"></div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl opacity-10"></div>

      <div className="container mx-auto px-6 relative">
        <div className="bg-gray-900 bg-opacity-60 backdrop-blur-lg rounded-2xl p-12 shadow-2xl border border-gray-800 max-w-4xl mx-auto">
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-6 text-white"
            >
              Ready to Revolutionize Your Hiring Process?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-300 mb-8 max-w-2xl mx-auto"
            >
              Join forward-thinking companies that are finding better talent
              faster with our skill-based hiring platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="px-6 py-4 rounded-lg bg-gray-800 border border-gray-700 text-white w-full sm:w-auto min-w-0 sm:min-w-[300px] focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105">
                Get Started Free
              </button>
            </motion.div>

            <p className="text-gray-500 mt-4 text-sm">
              No credit card required. Free 14-day trial.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
