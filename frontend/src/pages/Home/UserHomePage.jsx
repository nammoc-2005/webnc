// src/components/Home/UserHomePage.jsx
import { motion } from "framer-motion";
import Banner from "../../components/layout/Banner";
import { categories } from "../../utils/mockData";
import { useSearch } from "../../context/SearchContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserHomePage() {
  const { searchTerm } = useSearch();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Kiểm tra user đăng nhập


  // Lọc danh mục theo search
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Animation presets
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Banner />
      </motion.div>

      {/* Lời chào user */}
      <motion.div
        className="max-w-7xl mx-auto mt-6 px-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          👋 Xin chào, {user?.name || "người dùng"}!
        </h2>
        <p className="text-gray-600">
          Dưới đây là các sản phẩm được gợi ý cho bạn hôm nay:
        </p>
      </motion.div>

      {/* Thanh danh mục */}
      <motion.div
        className="max-w-7xl mx-auto mt-4 px-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
      >
        <div className="flex items-center overflow-x-auto space-x-3 pb-3 border-b border-gray-200 scrollbar-hide">
          {filteredCategories.map((cat, i) => (
            <motion.button
              key={cat.category_id}
              className="flex-shrink-0 px-5 py-2 bg-white border border-gray-200 rounded-full text-gray-700 font-medium hover:bg-orange-100 hover:text-orange-600 shadow-sm hover:shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              {cat.name}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Danh sách sản phẩm */}
      <motion.div
        className="max-w-7xl mx-auto mt-8 px-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-5">Gợi ý cho bạn</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {[...Array(8)].map((_, index) => (
            <motion.div
              key={index}
              className="bg-white p-4 rounded-2xl shadow-soft hover:shadow-lg cursor-pointer"
              variants={fadeInUp}
              whileHover={{
                y: -5,
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                transition: { duration: 0.2 },
              }}
            >
              <div className="w-full h-40 bg-gray-200 rounded-xl mb-3 flex items-center justify-center text-gray-400 text-4xl">
                🛒
              </div>
              <h3 className="font-semibold text-gray-700 mb-1 truncate">
                Sản phẩm {index + 1}
              </h3>
              <p className="text-orange-600 font-bold mb-2">
                ₫{(index + 1) * 10000}
              </p>
              <motion.button
                className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Thêm vào giỏ
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
