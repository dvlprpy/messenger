import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import MainMessanger from "./MainMessanger";
import { AuthProvider, useAuth } from "./AuthContext/AuthContext";
import { SettingsProvider } from "./SettingContext/SettingsContext";

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* صفحات ورود و ثبت‌نام */}
      <Route path="/login" element={<Auth defaultTab="login" />} />
      <Route path="/register" element={<Auth defaultTab="register" />} />
      <Route path="/forgot-password" element={<Auth defaultTab="forgot" />} />

      {/* مسیر محافظت‌شده */}
      <Route
        path="/messenger"
        element={
          user ? (
            <SettingsProvider>
              <MainMessanger />
            </SettingsProvider>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* مسیر پیش‌فرض */}
      <Route path="/" element={<Navigate to={user ? "/messenger" : "/login"} />} />
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
