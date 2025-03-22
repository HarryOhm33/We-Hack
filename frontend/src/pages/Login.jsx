import React from "react";
import { FaArrowRight } from "react-icons/fa";
// import Background from "./BackgroundAnimation";

const Login = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black overflow-hidden">
      {/* <Background /> */}
      <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-xl w-96 border border-gray-700 relative z-10 flex flex-col items-center overflow-hidden">
        {/* Abstract Background Shapes Inside the Box */}
        <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-br-full opacity-50"></div>
        <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500 rounded-bl-full opacity-50"></div>

        <h2 className="text-4xl font-bold mb-6 text-pink-400 relative z-20 text-center w-full">
          Welcome!
        </h2>

        <form
          action="#"
          method="POST"
          className="space-y-6 relative z-20 w-full flex flex-col items-center"
        >
          <div className="w-full">
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              placeholder="giga@example.com"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-400 outline-none"
              required
            />
          </div>

          <div className="w-full">
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-400 outline-none"
              required
            />
          </div>

          <div className="w-full flex justify-center">
            <button className="flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full text-lg font-semibold hover:opacity-80 transition-all shadow-md shadow-pink-500/50">
              Sign In <FaArrowRight className="ml-2" />
            </button>
          </div>
        </form>

        <div className="mt-6 flex justify-between text-sm relative z-20 w-full">
          <a
            href="#"
            className="text-pink-400 hover:text-pink-300 transition-all underline"
          >
            Sign up
          </a>
          <a
            href="#"
            className="text-purple-400 hover:text-purple-300 transition-all underline"
          >
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
