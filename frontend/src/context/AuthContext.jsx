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

        // Only run if there's a stored user and the user state hasn't been set yet in this session
        if (storedUser && user === null) {
          const response = await fetch(
            "http://localhost:9001/api/auth/verify",
            {
              method: "GET",
              credentials: "include",
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
  }, [user]); // Depend on the user state

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
      const response = await fetch(url, {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
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
    const data = await authRequest("http://localhost:9001/api/auth/login", {
      email,
      password,
    });

    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
    setUser(data.user);
    return data;
  };

  // 🔹 Signup function
  const signup = async (formData) => {
    const data = await authRequest(
      "http://localhost:9001/api/auth/signup",
      formData
    );
    return data;
  };

  // 🔹 OTP Verification function
  // AuthContext.jsx - Updated verifyOTP function
  const verifyOTP = async (email, otp) => {
    setIsAuthenticating(true);
    try {
      const data = await authRequest(
        "http://localhost:9001/api/auth/verify-otp",
        { email, otp }
      );
      return data; // Just return success, don't store credentials
    } finally {
      setIsAuthenticating(false);
    }
  };

  // 🔹 Logout function
  const logout = async () => {
    try {
      await fetch("http://localhost:9001/api/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
