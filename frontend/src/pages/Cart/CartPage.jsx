import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getTotalPrice,
  } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.info("🛒 Bạn chưa có sản phẩm nào trong giỏ hàng.");
      return;
    }
    navigate("/checkout");
  };

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
          <div className="mt-4 flex flex-col items-center gap-4">
            <Link
              to="/user/home"
              className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        </motion.div>
      ) : (
        <>
          {/* Danh sách sản phẩm */}
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <motion.div
                key={`${item.id}-${item.selectedColor}-${item.selectedSize}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between bg-white rounded-xl shadow-md p-4 border border-gray-100 hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-contain rounded-lg border"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-500 text-sm">
                      Màu: <span className="font-medium">{item.selectedColor}</span> | Size:{" "}
                      <span className="font-medium">{item.selectedSize}</span>
                    </p>
                    <p className="text-orange-600 font-bold">
                      ₫{item.price.toLocaleString()}
                    </p>

                    {/* Tăng/giảm số lượng */}
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => {
                          if (item.quantity === 1) {
                            if (
                              window.confirm(
                                "Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?"
                              )
                            ) {
                              removeFromCart(item.id, item.selectedColor, item.selectedSize);
                            }
                          } else {
                            decreaseQuantity(item.id, item.selectedColor, item.selectedSize);
                          }
                        }}
                        className="px-3 py-1 bg-gray-100 rounded-l-lg hover:bg-gray-200"
                      >
                        −
                      </button>
                      <span className="px-4 font-semibold">{item.quantity}</span>
                      <button
                        onClick={() =>
                          increaseQuantity(item.id, item.selectedColor, item.selectedSize)
                        }
                        className="px-3 py-1 bg-gray-100 rounded-r-lg hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-gray-600 text-sm">Thành tiền:</p>
                  <p className="text-lg font-bold text-green-600">
                    ₫{(item.price * item.quantity).toLocaleString()}
                  </p>
                  <button
                    onClick={() =>
                      removeFromCart(item.id, item.selectedColor, item.selectedSize)
                    }
                    className="mt-2 text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    ✕ Xóa
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tổng cộng */}
          <div className="mt-8 bg-white rounded-xl shadow-md p-6 text-right">
            <h3 className="text-lg font-semibold text-gray-700">
              Tổng cộng:{" "}
              <span className="text-orange-600 text-2xl font-bold">
                ₫{getTotalPrice().toLocaleString()}
              </span>
            </h3>

            <button
              onClick={handleCheckout}
              className="inline-block mt-4 bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              Tiến hành thanh toán →
            </button>
          </div>
        </>
      )}
    </div>
  );
}
