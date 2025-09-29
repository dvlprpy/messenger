import { useState } from "react";
import axios from "axios";

export default function ForgotPasswordForm({ onSuccess }) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");

        try {
            await axios.get("/sanctum/csrf-cookie");
            await axios.post("http://messenger.local/api/forgot-password", { email });

            setLoading(false);
            setMessage("کد تأیید به ایمیل شما ارسال شد.");
            if (onSuccess) onSuccess(email);
        } catch (err) {
            setLoading(false);
            setError("ایمیل وارد شده معتبر نیست یا ثبت نشده است.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                className="w-full px-4 py-2 border rounded mb-2 focus:ring focus:ring-yellow-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {message && <p className="text-green-500 text-sm">{message}</p>}
            <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
            >
                {loading ? "در حال ارسال..." : "ارسال کد تایید"}
            </button>
        </form>
    );
}