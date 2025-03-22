import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Background from "../components/BackgroundAnimation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

const Signup = () => {
  const { signup, loading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "candidate",
    organization: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (formData.role === "recruiter" && !formData.organization.trim()) {
      toast.error("Organization name is required for recruiters");
      return;
    }

    try {
      const signupData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: formData.role,
        ...(formData.role === "recruiter" && {
          organization: formData.organization.trim(),
        }),
      };

      const response = await signup(signupData);

      if (response.status === 200) {
        toast.success(response.message);
        navigate("/verify", { state: { email: formData.email } });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleRole = (role) => {
    setFormData((prev) => ({
      ...prev,
      role,
      organization: role === "recruiter" ? prev.organization : "",
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Background />
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-16"
      >
        <div className="max-w-md mx-auto">
          <div className="relative z-10 bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-800">
            <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Create Account
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role Toggle */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => toggleRole("candidate")}
                  className={`flex-1 py-3 rounded-lg transition-all ${
                    formData.role === "candidate"
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  Candidate
                </button>
                <button
                  type="button"
                  onClick={() => toggleRole("recruiter")}
                  className={`flex-1 py-3 rounded-lg transition-all ${
                    formData.role === "recruiter"
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  Recruiter
                </button>
              </div>

              {/* Name Field */}
              <div>
                <label className="block text-gray-300 mb-2 text-sm">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 focus:outline-none text-gray-100 transition-all"
                  placeholder="John Doe"
                  required
                  minLength="3"
                />
              </div>

              {/* Organization Field */}
              {formData.role === "recruiter" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="block text-gray-300 mb-2 text-sm">
                    Organization
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 focus:outline-none text-gray-100 transition-all"
                    placeholder="Tech Corp Inc."
                    required
                  />
                </motion.div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-gray-300 mb-2 text-sm">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 focus:outline-none text-gray-100 transition-all"
                  placeholder="john@example.com"
                  required
                />
              </div>

              {/* Password Fields */}
              <div>
                <label className="block text-gray-300 mb-2 text-sm">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 focus:outline-none text-gray-100 transition-all pr-12"
                    placeholder="••••••••"
                    required
                    minLength="6"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 focus:outline-none text-gray-100 transition-all pr-12"
                    placeholder="••••••••"
                    required
                    minLength="6"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-lg transition-all relative"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  </div>
                ) : (
                  "Sign Up"
                )}
              </motion.button>
            </form>

            <div className="mt-6 text-center text-gray-400 text-sm">
              <p>
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
                  disabled={loading}
                >
                  Log in
                </button>
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default Signup;
