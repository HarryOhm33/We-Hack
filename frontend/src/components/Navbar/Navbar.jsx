import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white fixed w-full z-50 shadow-lg p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h2 className="text-2xl font-bold">Skill-Based Hiring</h2>
        <ul className="flex space-x-6">
          <li className="hover:text-purple-300 cursor-pointer">About</li>
          <li className="hover:text-purple-300 cursor-pointer">Features</li>
          <li className="hover:text-purple-300 cursor-pointer">Login</li>
          <li className="hover:text-gray-900 cursor-pointer bg-purple-500 hover:bg-purple-400 text-white px-4 py-2 rounded-md transition-colors duration-300">
            Sign Up
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
