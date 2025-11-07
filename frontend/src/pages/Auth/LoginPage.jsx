import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { authAPI } from "../../services/api"; // 🔥 import từ file api.js

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState(""); // ✅ thêm state cho thông báo thành công
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await authAPI.login({ email, password });
      console.log("✅ Login success:", res.data);

      // ✅ Hiển thị thông báo ngắn gọn thay vì alert
      setSuccessMsg("Đăng nhập thành công!");

      // ⏳ Sau 1.5 giây thì chuyển trang
      setTimeout(() => {
        setSuccessMsg("");
        navigate("/user/home");
      }, 1500);
    } catch (err) {
      console.error("❌ Login error:", err);
      const msg =
        err?.response?.data?.message ||
        "Đăng nhập thất bại, vui lòng kiểm tra lại.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-orange-400 to-orange-600 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* ✅ Thông báo đăng nhập thành công (hiện chớp nhoáng) */}
      {successMsg && (
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded-lg shadow-md text-sm font-medium">
          {successMsg}
        </div>
      )}

      <motion.div
        className="bg-white shadow-2xl rounded-2xl px-8 py-10 w-[90%] max-w-md"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Đăng nhập
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
              placeholder="Nhập email..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Mật khẩu
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
              placeholder="Nhập mật khẩu..."
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-gray-400" : "bg-orange-500 hover:bg-orange-600"
            } text-white py-2 rounded-lg font-semibold transition`}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Chưa có tài khoản?{" "}
            <Link
              to="/auth/register"
              className="text-orange-600 hover:underline font-semibold"
            >
              Đăng ký ngay
            </Link>
          </p>
        </form>
      </motion.div>
    </motion.div>
  );
}
