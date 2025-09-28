import { useState } from "react";
import axios from "axios";

export default function VerifyCodeForm({ email, onSuccess }) {
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await axios.get("/sanctum/csrf-cookie");
            const res = await axios.post("/verify-otp", { email, code });

            setLoading(false);
            if (res.data.success) {
                onSuccess(); // هدایت به فرم ریست پسورد
            } else {
                setError("کد وارد شده اشتباه است.");
            }
        } catch (err) {
            setLoading(false);
            setError("خطایی رخ داد. دوباره تلاش کنید.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                placeholder="کد تأیید را وارد کنید"
                className="w-full px-4 py-2 border rounded mb-2 focus:ring focus:ring-purple-400"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
            >
                {loading ? "در حال بررسی..." : "تأیید کد"}
            </button>
        </form>
    );
}