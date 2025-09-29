import { useState } from "react";
import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";
import ForgotPasswordForm from "../components/Auth/ForgotPasswordForm";
import VerifyCodeForm from "../components/Auth/VerifyCodeForm";
import ResetPasswordForm from "../components/Auth/ResetPasswordForm";

export default function Auth({ defaultTab = "login" }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [step, setStep] = useState("forgot");
  const [email, setEmail] = useState("");

  const switchTab = (tab) => { setActiveTab(tab); setStep("forgot"); };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-6">
        <div className="flex justify-around mb-6">
          <button onClick={() => switchTab("login")} className={`w-1/3 py-2 font-semibold rounded-lg ${activeTab==="login"?"bg-blue-500 text-white":"bg-gray-100 text-gray-600"}`}>ورود</button>
          <button onClick={() => switchTab("register")} className={`w-1/3 py-2 font-semibold rounded-lg ${activeTab==="register"?"bg-green-600 text-white":"bg-gray-100 text-gray-600"}`}>ثبت‌نام</button>
          <button onClick={() => switchTab("forgot")} className={`w-1/3 py-2 font-semibold rounded-lg ${activeTab==="forgot"?"bg-yellow-500 text-white":"bg-gray-100 text-gray-600"}`}>فراموشی رمز</button>
        </div>

        {activeTab === "login" && <LoginForm />}
        {activeTab === "register" && <RegisterForm onSuccess={() => switchTab("login")} />}
        {activeTab === "forgot" && (
          <>
            {step==="forgot" && <ForgotPasswordForm onSuccess={(userEmail)=>{setEmail(userEmail); setStep("verify");}} />}
            {step==="verify" && <VerifyCodeForm email={email} onSuccess={()=>setStep("reset")} />}
            {step==="reset" && <ResetPasswordForm email={email} onSuccess={()=>switchTab("login")} />}
          </>
        )}
      </div>
    </div>
  );
}