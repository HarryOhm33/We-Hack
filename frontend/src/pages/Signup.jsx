import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Background from "../BackgroundAnimation";
import { useAuth } from "../context/AuthContext";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
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
    <div className="min-h-screen relative flex items-center justify-center p-4">
      <Background />

      <div className="relative z-10 bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full shadow-xl border border-gray-800">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Toggle */}
          <div className="flex gap-4 mb-6">
            <button
              type="button"
              onClick={() => toggleRole("candidate")}
              className={`flex-1 py-2 rounded-lg transition-colors ${
                formData.role === "candidate"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              Candidate
            </button>
            <button
              type="button"
              onClick={() => toggleRole("recruiter")}
              className={`flex-1 py-2 rounded-lg transition-colors ${
                formData.role === "recruiter"
                  ? "bg-purple-600 text-white"
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
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 focus:outline-none text-gray-100 transition-all"
              placeholder="Enter your full name"
              required
              minLength="3"
            />
          </div>

          {/* Organization Field (Conditional) */}
          {formData.role === "recruiter" && (
            <div>
              <label className="block text-gray-300 mb-2 text-sm">
                Organization Name
              </label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 focus:outline-none text-gray-100 transition-all"
                placeholder="Enter organization name"
                required
              />
            </div>
          )}

          {/* Email Field */}
          <div>
            <label className="block text-gray-300 mb-2 text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 focus:outline-none text-gray-100 transition-all"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Fields */}
          <div>
            <label className="block text-gray-300 mb-2 text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 focus:outline-none text-gray-100 transition-all"
              placeholder="••••••••"
              required
              minLength="6"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2 text-sm">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 focus:outline-none text-gray-100 transition-all"
              placeholder="••••••••"
              required
              minLength="6"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-semibold rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed relative"
          >
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              </div>
            )}
            <span className={loading ? "invisible" : "visible"}>Sign Up</span>
          </button>
        </form>

        <div className="mt-6 text-center text-gray-400 text-sm">
          <p>
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-400 hover:text-blue-300 transition-colors cursor-pointer font-medium"
              disabled={loading}
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
