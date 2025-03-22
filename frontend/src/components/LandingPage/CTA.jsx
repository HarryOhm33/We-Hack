import { motion } from "framer-motion";
import React from "react";

const CTA = () => {
  return (
    <section className="bg-gray-800 text-white py-16 text-center relative z-10">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-6"
        >
          Ready to Find the Best Talent?
        </motion.h2>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-md text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Join Now
        </motion.button>
      </div>
    </section>
  );
};

export default CTA;
