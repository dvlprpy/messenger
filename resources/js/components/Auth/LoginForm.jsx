import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext/AuthContext";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.get("/sanctum/csrf-cookie");
      const res = await axios.post("http://messenger.local/api/login", form);

      login(res.data); // استفاده از context
      navigate("/messenger");
    } catch (err) {
      setError("ایمیل یا رمز عبور اشتباه است.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        name="email"
        placeholder="ایمیل"
        className="w-full px-4 py-2 border rounded mb-2 focus:ring focus:ring-green-400"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="رمز عبور"
        className="w-full px-4 py-2 border rounded mb-2 focus:ring focus:ring-green-400"
        value={form.password}
        onChange={handleChange}
        required
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        {loading ? "در حال ورود..." : "ورود"}
      </button>
    </form>
  );
}