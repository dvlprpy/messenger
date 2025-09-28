import { useState } from "react";
import axios from "axios";

export default function LoginForm({ onSuccess }) {
    const [form, setForm] = useState({ email: "", password: "" });
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
            await axios.get("/sanctum/csrf-cookie");
            await axios.post("http://messenger.local/api/login", form)
            .then(function (response) { 
                console.log(response)
            }).catch(function (error) {
                console.log(error)
            });

            setLoading(false);
            // if (onSuccess) onSuccess();
        } catch (err) {
            setLoading(false);
            setError("ایمیل یا رمز عبور اشتباه است.");
        }
    };

    return (
        <div className="">
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    name="email"
                    placeholder="ایمیل"
                    className="w-full px-4 py-2 border rounded focus:ring focus:ring-indigo-400 mb-2"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="رمز عبور"
                    className="w-full px-4 py-2 border rounded focus:ring focus:ring-indigo-400 mb-2"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 bg-sky-400 text-white rounded hover:bg-sky-500 transition"
                >
                    {loading ? "در حال ورود..." : "ورود"}
                </button>
            </form>
        </div>
    );
}