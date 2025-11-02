// src/pages/Cart/CartPage.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cartAPI } from "../../services/api";
import { Link } from "react-router-dom";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Giả lập fetch API (khi chưa có backend)
  useEffect(() => {
    const fetchCart = async () => {
      try {
        // Khi có backend thật, bật dòng này:
        // const res = await cartAPI.get();
        // setCartItems(res.data);

        // Tạm thời để trống để hiển thị "Không có sản phẩm nào"
        setCartItems([]);
      } catch (error) {
        console.error("Lỗi khi tải giỏ hàng:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  // Xóa sản phẩm
  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    // Khi có backend: await cartAPI.remove(id)
  };

  // Tính tổng giá
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-gray-500 text-lg">
        Đang tải giỏ hàng...
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        🛒 Giỏ hàng của bạn
      </h2>

      {cartItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500 text-lg py-20"
        >
          Chưa có sản phẩm nào trong giỏ hàng.
          <div className="mt-4">
            <Link
              to="/"
              className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        </motion.div>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between bg-white rounded-xl shadow-md p-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image || "/images/placeholder.jpg"}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-orange-600 font-bold">
                      ₫{item.price.toLocaleString()}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Số lượng: {item.quantity}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  ✕ Xóa
                </button>
              </motion.div>
            ))}
          </div>

          {/* Tổng cộng */}
          <div className="mt-8 bg-white rounded-xl shadow-md p-6 text-right">
            <h3 className="text-lg font-semibold text-gray-700">
              Tổng cộng:{" "}
              <span className="text-orange-600 text-2xl font-bold">
                ₫{totalPrice.toLocaleString()}
              </span>
            </h3>

            <Link
              to="/checkout"
              className="inline-block mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
            >
              Tiến hành thanh toán →
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
