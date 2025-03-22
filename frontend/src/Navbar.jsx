import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 p-4 transition-all duration-300 ${
        scrolled
          ? "bg-black bg-opacity-80 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg mr-3 flex items-center justify-center">
            <span className="text-white font-bold text-xl">SBH</span>
          </div>
          <h2 className="text-2xl font-bold text-white">COMPANY</h2>
        </div>

        <ul className="hidden md:flex space-x-8">
          <li className="text-gray-300 hover:text-white cursor-pointer transition-colors border-b-2 border-pink-600 pb-1">
            Home
          </li>
          <li className="text-gray-300 hover:text-white cursor-pointer transition-colors">
            About
          </li>
          <li className="text-gray-300 hover:text-white cursor-pointer transition-colors">
            Market
          </li>
          <li>
            <button className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-all">
              Sign Up
            </button>
          </li>
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;
