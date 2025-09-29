import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import MainMessanger from "./MainMessanger";
import { AuthProvider, useAuth } from "./AuthContext/AuthContext";

// مسیرها با محافظت
function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Auth defaultTab="login" />} />
      <Route path="/register" element={<Auth defaultTab="register" />} />
      <Route path="/forgot-password" element={<Auth defaultTab="forgot" />} />

      {/* مسیر محافظت‌شده */}
      <Route
        path="/messenger"
        element={user ? <MainMessanger /> : <Navigate to="/login" />}
      />

      {/* مسیر پیش‌فرض */}
      <Route path="/" element={user ? <Navigate to="/messenger" /> : <Navigate to="/login" />} />

      {/* مسیر نامعتبر → هدایت به لاگین */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);