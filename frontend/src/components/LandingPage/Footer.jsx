import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 text-center relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left mb-8">
          <div>
            <h3 className="text-white font-bold mb-3">Skill-Based Hiring</h3>
            <p className="text-sm">Revolutionizing the way companies hire talent in the digital age.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-purple-300 cursor-pointer">About Us</li>
              <li className="hover:text-purple-300 cursor-pointer">Careers</li>
              <li className="hover:text-purple-300 cursor-pointer">Blog</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-purple-300 cursor-pointer">Documentation</li>
              <li className="hover:text-purple-300 cursor-pointer">Help Center</li>
              <li className="hover:text-purple-300 cursor-pointer">Pricing</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-purple-300 cursor-pointer">Twitter</li>
              <li className="hover:text-purple-300 cursor-pointer">LinkedIn</li>
              <li className="hover:text-purple-300 cursor-pointer">Contact Us</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6">
          <p>&copy; 2025 Skill-Based Hiring Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;