import { useState } from "react";
import axios from "axios";

export default function ResetPasswordForm({ email, onSuccess }) {
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirm) {
            setError("رمز عبور و تکرار آن یکسان نیست!");
            return;
        }

        setLoading(true);
        setError("");

        try {
            await axios.get("/sanctum/csrf-cookie");
            await axios.post("/reset-password", { email, password });

            setLoading(false);
            onSuccess();
        } catch (err) {
            setLoading(false);
            setError("خطا در تغییر رمز عبور. دوباره تلاش کنید.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="password"
                placeholder="رمز عبور جدید"
                className="w-full px-4 py-2 border rounded focus:ring focus:ring-green-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="تکرار رمز عبور جدید"
                className="w-full px-4 py-2 border rounded focus:ring focus:ring-green-400"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
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