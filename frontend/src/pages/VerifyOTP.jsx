import React, { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import Background from "../components/BackgroundAnimation";
import { useAuth } from "../context/AuthContext";

const VerifyOTP = () => {
  const { verifyOTP } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("No email associated with this verification");
      navigate("/signup");
      return;
    }

    if (!otp || otp.length !== 6) {
      toast.error("Please enter a 6-digit OTP");
      return;
    }

    try {
      setLoading(true);
      const response = await verifyOTP(email, otp);

      if (response.status === 200) {
        toast.success(response.message || "Account verified successfully!");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    navigate("/signup");
    return null;
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      <Background />

      <div className="relative z-10 bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full shadow-xl border border-gray-800">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Verify OTP
        </h2>

        <p className="text-gray-300 text-center mb-6">
          We've sent a 6-digit code to{" "}
          <span className="text-blue-400">{email}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2 text-sm">OTP Code</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="one-time-code"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              className="w-full px-4 py-3 text-center text-2xl tracking-[0.5em] rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 focus:outline-none text-gray-100 transition-all"
              placeholder="••••••"
              required
              autoFocus
            />
          </div>

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
            <span className={loading ? "invisible" : "visible"}>
              Verify Account
            </span>
          </button>
        </form>

        <div className="mt-6 text-center text-gray-400 text-sm">
          <p>
            Didn't receive code?{" "}
            <button
              onClick={() =>
                toast.error("Resend functionality not implemented yet")
              }
              className="text-blue-400 hover:text-blue-300 transition-colors cursor-pointer font-medium"
              disabled={loading}
            >
              Resend OTP
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
