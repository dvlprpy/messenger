import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function RegisterForm({ onSuccess }) {
  const [form, setForm] = useState({ fullname: "", username: "", email: "", password: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.get("/sanctum/csrf-cookie");
      const res = await axios.post("http://messenger.local/api/register", form);

      Swal.fire({ title: res.data.message, icon: "success", confirmButtonText: "باشه!" });
      
      onSuccess();
    } catch (err) {
      setError("خطا در ثبت نام. لطفاً اطلاعات را بررسی کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* fullname */}
      <input
        type="text"
        name="fullname"
        placeholder="نام کامل"
        className="w-full px-4 py-2 border rounded mb-2 focus:ring focus:ring-green-400"
        value={form.fullname}
        onChange={handleChange}
        required
      />
      {/* username */}
      <input
        type="text"
        name="username"
        placeholder="نام کاربری"
        className="w-full px-4 py-2 border rounded mb-2 focus:ring focus:ring-green-400"
        value={form.username}
        onChange={handleChange}
        required
      />
      {/* email */}
      <input
        type="email"
        name="email"
        placeholder="ایمیل"
        className="w-full px-4 py-2 border rounded mb-2 focus:ring focus:ring-green-400"
        value={form.email}
        onChange={handleChange}
        required
      />  
      {/* phone */}
      <input
        type="text"
        name="phone"
        placeholder="شماره تلفن همراه"
        className="w-full px-4 py-2 border rounded mb-2 focus:ring focus:ring-green-400"
        value={form.phone}
        onChange={handleChange}
        required
      />  
      {/* password */}
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
        className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        {loading ? "در حال ثبت نام..." : "ثبت نام"}
      </button>
    </form>
  );
}
