import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  // 🔹 Load user & verify token on app start
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (storedUser && token) {
          const response = await fetch(
            "https://we-hack-cc7h.onrender.com/api/auth/verify",
            {
              method: "GET",
              credentials: "include",
              headers: {
                Authorization: `Bearer ${token}`, // ✅ Send token in header
              },
            }
          );

          if (response.ok) {
            setUser(JSON.parse(storedUser));
          } else {
            console.warn("Token verification failed, logging out...");
            clearAuthStorage();
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        clearAuthStorage();
      } finally {
        setIsAuthenticating(false);
      }
    };

    initializeAuth();
  }, []);

  // 🔹 Clear user authentication storage
  const clearAuthStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  // 🔹 Generic API request function (used for login, signup, etc.)
  const authRequest = async (url, body, method = "POST") => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token"); // ✅ Get token

      const response = await fetch(url, {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "", // ✅ Send token
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Request failed");
      }

      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Login function
  const login = async (email, password) => {
    const data = await authRequest(
      "https://we-hack-cc7h.onrender.com/api/auth/login",
      {
        email,
        password,
      }
    );

    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
    setUser(data.user);
    return data;
  };

  // 🔹 Signup function
  const signup = async (formData) => {
    const data = await authRequest(
      "https://we-hack-cc7h.onrender.com/api/auth/signup",
      formData
    );
    return data;
  };

  // 🔹 OTP Verification function
  const verifyOTP = async (email, otp) => {
    setIsAuthenticating(true);
    try {
      const data = await authRequest(
        "https://we-hack-cc7h.onrender.com/api/auth/verify-otp",
        { email, otp }
      );
      return data;
    } finally {
      setIsAuthenticating(false);
    }
  };

  // 🔹 Logout function
  const logout = async () => {
    try {
      const token = localStorage.getItem("token"); // ✅ Fetch token

      await fetch("https://we-hack-cc7h.onrender.com/api/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: token ? `Bearer ${token}` : "", // ✅ Send token
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.warn("Logout request failed, but clearing storage anyway.");
    } finally {
      clearAuthStorage();
      navigate("/"); // Redirect to home after logout
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        error,
        loading,
        isAuthenticating,
        login,
        signup,
        logout,
        verifyOTP,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// 🔹 Custom hook to use AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
