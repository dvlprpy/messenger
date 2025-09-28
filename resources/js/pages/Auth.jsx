import { useState } from "react";
import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";
import ForgotPasswordForm from "../components/Auth/ForgotPasswordForm";
import VerifyCodeForm from "../components/Auth/VerifyCodeForm";
import ResetPasswordForm from "../components/Auth/ResetPasswordForm";

export default function Auth() {
    const [activeTab, setActiveTab] = useState("login");
    const [step, setStep] = useState("forgot"); // برای مدیریت مراحل بازیابی رمز
    const [email, setEmail] = useState(""); // ایمیل کاربر برای فراموشی رمز

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-6">
                {/* تب‌ها فقط برای Login / Register / Forgot */}
                <div className="flex justify-around mb-6">
                    <button
                        onClick={() => { setActiveTab("login"); setStep("forgot"); }}
                        className={`w-1/3 py-2 font-semibold rounded-lg transition ${
                            activeTab === "login"
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                        ورود
                    </button>
                    <button
                        onClick={() => { setActiveTab("register"); setStep("forgot"); }}
                        className={`w-1/3 py-2 font-semibold rounded-lg transition ${
                            activeTab === "register"
                                ? "bg-green-600 text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                        ثبت نام
                    </button>
                    <button
                        onClick={() => { setActiveTab("forgot"); setStep("forgot"); }}
                        className={`w-1/3 py-2 font-semibold rounded-lg transition ${
                            activeTab === "forgot"
                                ? "bg-yellow-500 text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                        فراموشی رمز
                    </button>
                </div>

                {/* فرم‌ها */}
                {activeTab === "login" && (
                    <LoginForm onSuccess={() => (window.location.href = "/")} />
                )}

                {activeTab === "register" && (
                    <RegisterForm onSuccess={() => setActiveTab("login")} />
                )}

                {activeTab === "forgot" && (
                    <>
                        {step === "forgot" && (
                            <ForgotPasswordForm
                                onSuccess={(userEmail) => {
                                    setEmail(userEmail);
                                    setStep("verify");
                                }}
                            />
                        )}
                        {step === "verify" && (
                            <VerifyCodeForm
                                email={email}
                                onSuccess={() => setStep("reset")}
                            />
                        )}
                        {step === "reset" && (
                            <ResetPasswordForm
                                email={email}
                                onSuccess={() => {
                                    alert("رمز عبور با موفقیت تغییر کرد.");
                                    setActiveTab("login");
                                    setStep("forgot");
                                }}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
