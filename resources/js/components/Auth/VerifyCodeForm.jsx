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
            await axios.post("http://messenger.local/api/verify-otp", {
                email,
                code,
            });

            setLoading(false);
            if (onSuccess) onSuccess();
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || "کد نامعتبر است");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                name="code"
                placeholder="کد ارسال‌شده"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:ring focus:ring-indigo-400 mb-2"
                required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
                {loading ? "در حال بررسی..." : "تایید کد"}
            </button>
        </form>
    );
}