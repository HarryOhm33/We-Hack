import { motion } from "framer-motion";
import React from "react";

const FeatureCard = ({ icon, title, description, delay }) => {
  return (
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
};

const FeaturesOverview = () => {
  const features = [
    {
      icon: "🎯",
      title: "Skill Assessment",
      description:
        "Evaluate candidates with practical, job-relevant skill tests rather than just reviewing resumes.",
    },
    {
      icon: "🧠",
      title: "AI Matching",
      description:
        "Our algorithms match candidates to positions based on verified skill compatibility.",
    },
    {
      icon: "📊",
      title: "Performance Analytics",
      description:
        "Track and measure candidate performance across multiple skill dimensions with detailed reports.",
    },
    {
      icon: "🔍",
      title: "Blind Evaluation",
      description:
        "Remove bias by focusing on skills rather than demographics or educational background.",
    },
  ];

  return (
    <section className="py-20 relative z-10">
      <div className="container mx-auto px-6">
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
              Skill-Based Hiring
            </span>{" "}
            Works
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Our platform revolutionizes recruitment by focusing on what truly
            matters - practical skills and actual capabilities.
          </p>
        </motion.div>

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
