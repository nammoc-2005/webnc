// src/components/layout/Header.jsx
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSearch } from "../../context/SearchContext";
import { useState, useEffect } from "react";

export default function Header() {
  const { searchTerm, setSearchTerm } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [hideTimer, setHideTimer] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const handleMouseEnter = () => {
    if (hideTimer) clearTimeout(hideTimer);
    setShowMenu(true);
  };

  const handleMouseLeave = () => {
    const timer = setTimeout(() => setShowMenu(false), 250);
    setHideTimer(timer);
  };

  return (
    <motion.header
      className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 shadow-lg sticky top-0 z-50"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
        {/* Logo */}
        <motion.div
          className="text-3xl font-bold tracking-wide cursor-pointer flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate(user ? "/user/home" : "/")}
        >
          🛍️ <span>Shopee Clone</span>
        </motion.div>

        {/* Thanh tìm kiếm */}
        <div className="relative flex-1 w-full md:w-2/3">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm, danh mục..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-2 rounded-full bg-white text-gray-800 placeholder-gray-500 shadow-md focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-full font-semibold shadow-md cursor-pointer"
          >
            🔍
          </motion.button>
        </div>

        {/* Khu vực người dùng */}
        <div className="flex items-center gap-5 relative">
          {!user ? (
            <>
              <Link to="/auth/login">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="font-semibold cursor-pointer hover:text-orange-200 transition-transform duration-200"
                >
                  Đăng nhập
                </motion.button>
              </Link>

              <Link to="/auth/register">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="font-semibold cursor-pointer hover:text-orange-200 transition-transform duration-200"
                >
                  Đăng ký
                </motion.button>
              </Link>
            </>
          ) : (
            // Đã đăng nhập
            <div
              className="relative cursor-pointer"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center gap-2">
                <img
                  src={user.avatar || "https://i.pravatar.cc/40"}
                  alt="Avatar"
                  className="w-9 h-9 rounded-full border-2 border-white hover:shadow-lg transition-all cursor-pointer"
                />
                <span className="font-semibold">{user.name || "Người dùng"}</span>
              </div>

              {/* Dropdown menu */}
              {showMenu && (
                <motion.div
                  className="absolute top-12 right-0 bg-white text-gray-700 shadow-xl rounded-lg overflow-hidden w-48 origin-top-right cursor-pointer"
                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  transition={{ duration: 0.2 }}
                  onMouseEnter={() => setShowMenu(true)} // Giữ menu mở khi di chuột trong
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      navigate("/profile");
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition cursor-pointer"
                  >
                    👤 Thông tin cá nhân
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition text-red-600 cursor-pointer"
                  >
                    🚪 Đăng xuất
                  </button>
                </motion.div>
              )}
            </div>
          )}

          {/* Giỏ hàng */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <span className="text-2xl">🛒</span>
            <span className="absolute -top-2 -right-2 bg-red-600 text-xs font-bold px-1.5 py-0.5 rounded-full"></span>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
