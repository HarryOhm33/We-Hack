import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import VerifyOTP from "./pages/VerifyOTP";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify" element={<VerifyOTP />} />
          {/* Add other routes */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
