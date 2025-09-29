import { useState } from "react";
import axios from "axios";

export default function ResetPasswordForm({ email, onSuccess }) {
    const [form, setForm] = useState({
        password: "",
        password_confirmation: "",
        code: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await axios.post("http://messenger.local/api/reset-password", {
                email,
                code: form.code,
                password: form.password,
                password_confirmation: form.password_confirmation,
            });

            setLoading(false);
            if (onSuccess) onSuccess();
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || "خطا در تغییر رمز عبور");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                name="code"
                placeholder="کد ارسال‌شده"
                value={form.code}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:ring focus:ring-indigo-400 mb-2"
                required
            />
            <input
                type="password"
                name="password"
                placeholder="رمز عبور جدید"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:ring focus:ring-indigo-400 mb-2"
                required
            />
            <input
                type="password"
                name="password_confirmation"
                placeholder="تکرار رمز عبور جدید"
                value={form.password_confirmation}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:ring focus:ring-indigo-400 mb-2"
                required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
                {loading ? "در حال تغییر رمز..." : "تغییر رمز عبور"}
            </button>
        </form>
    );
}