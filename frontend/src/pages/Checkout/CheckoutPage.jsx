import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../../context/CartContext";

export default function CheckoutPage() {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [address, setAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const navigate = useNavigate();

  // 🔹 Giả lập địa chỉ người nhận (sẽ thay bằng API sau)
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.address) {
      setAddress({
        full_name: storedUser.full_name,
        phone: storedUser.phone,
        line1: storedUser.address,
        city: "Việt Nam",
    });
    } else {
      setAddress(null);
    }

  }, []);

  // ✅ Xử lý khi người dùng xác nhận thanh toán
  const handleConfirmPayment = () => {
    if (cartItems.length === 0) {
      toast.warning("🛒 Giỏ hàng trống, không thể thanh toán!");
      return;
    }

    toast.success("🎉 Thanh toán thành công!");
    clearCart();
    setTimeout(() => navigate("/user/home"), 1500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <motion.h2
        className="text-3xl font-bold text-gray-800 mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        💳 Thanh toán
      </motion.h2>

      {/* 🏠 Địa chỉ nhận hàng */}
      <motion.div
        className="bg-white rounded-xl shadow-md p-6 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Địa chỉ nhận hàng
        </h3>
        {address ? (
          <div className="text-gray-600">
            <p>
              <strong>{address.full_name}</strong> | {address.phone}
            </p>
            <p>
              {address.line1}, {address.city}
            </p>
          </div>
        ) : (
          <p className="text-gray-500">Chưa có địa chỉ nhận hàng.</p>
        )}
      </motion.div>

      {/* 🛍️ Sản phẩm trong giỏ hàng */}
      <motion.div
        className="bg-white rounded-xl shadow-md p-6 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Sản phẩm trong giỏ hàng
        </h3>
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center">
            Không có sản phẩm nào trong giỏ hàng.
          </p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={`${item.id}-${item.selectedColor}-${item.selectedSize}-${index}`}
                className="flex justify-between items-center border-b pb-3"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg border object-contain bg-gray-50"
                  />
                  <div>
                    <h4 className="font-medium text-gray-800">{item.name}</h4>
                    <p className="text-sm text-gray-500">
                      Màu: <span className="font-medium">{item.selectedColor}</span> | Size:{" "}
                      <span className="font-medium">{item.selectedSize}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Số lượng: <span className="font-medium">{item.quantity}</span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-600 text-sm">Thành tiền:</p>
                  <p className="font-semibold text-orange-600">
                    ₫{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* 💰 Phương thức thanh toán */}
      <motion.div
        className="bg-white rounded-xl shadow-md p-6 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Phương thức thanh toán
        </h3>
        <div className="space-y-3">
          {["cod", "momo", "bank"].map((method) => (
            <label key={method} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value={method}
                checked={paymentMethod === method}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>
                {method === "cod"
                  ? "Thanh toán khi nhận hàng (COD)"
                  : method === "momo"
                  ? "Ví điện tử Momo"
                  : "Thẻ ngân hàng / ATM"}
              </span>
            </label>
          ))}
        </div>
      </motion.div>

      {/* 🧾 Tổng cộng + nút xác nhận */}
      <motion.div
        className="bg-white rounded-xl shadow-md p-6 text-right"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h3 className="text-lg font-semibold text-gray-700">
          Tổng cộng:{" "}
          <span className="text-orange-600 text-2xl font-bold">
            ₫{getTotalPrice().toLocaleString()}
          </span>
        </h3>

        <button
          onClick={handleConfirmPayment}
          className="mt-4 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-green-600 hover:shadow-lg transition"
        >
          Xác nhận thanh toán
        </button>
      </motion.div>
    </div>
  );
}
