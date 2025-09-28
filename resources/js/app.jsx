import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainMessanger from "./MainMessanger";
/* import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";
import ForgotPasswordPage from "./auth/ForgotPasswordPage"; */
import Auth from './pages/Auth'

function App() {
  return (
    <Router>
      <Routes>
        {/* صفحه ورود */}
        <Route path="/login" element={<Auth />} />

        {/* صفحه ثبت‌نام */}
        <Route path="/register" element={<Auth />} />

        {/* فراموشی رمز عبور */}
        <Route path="/forgot-password" element={<Auth />} />

        {/* پیام‌رسان (بعد از لاگین) */}
        <Route path="/messenger" element={<MainMessanger />} />

        {/* پیش‌فرض → هدایت به لاگین */}
        <Route path="*" element={<Auth />} />
      </Routes>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);