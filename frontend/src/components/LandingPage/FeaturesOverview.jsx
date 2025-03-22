import { motion } from "framer-motion";
import React from "react";

const FeatureCard = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="bg-gray-800 p-6 rounded-lg shadow-lg"
    >
      <div className="text-purple-500 text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

const FeaturesOverview = () => {
  const features = [
    {
      icon: "🧠",
      title: "Skill Assessment",
      description:
        "Evaluate candidates based on their actual capabilities with our advanced assessment tools.",
    },
    {
      icon: "📊",
      title: "Data-Driven Matches",
      description:
        "Our AI algorithms match candidates to positions based on skill compatibility.",
    },
    {
      icon: "🔍",
      title: "Unbiased Hiring",
      description:
        "Focus on skills rather than backgrounds to promote diversity and inclusion.",
    },
    {
      icon: "⏱️",
      title: "Time Efficiency",
      description:
        "Reduce time-to-hire by focusing on qualified candidates from the start.",
    },
  ];

  return (
    <section className="py-20 bg-gray-900 relative z-10">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-16 text-center text-white"
        >
          Why Choose Skill-Based Hiring?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesOverview;
