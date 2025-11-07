import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ProductDetailPage() {
  const { state: product } = useLocation();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (!product)
    return (
      <div className="text-center py-20 text-gray-500">
        Không tìm thấy sản phẩm.{" "}
        <button
          onClick={() => navigate("/user/home")}
          className="text-orange-500 underline"
        >
          Quay lại trang chủ
        </button>
      </div>
    );

  const colors = product.color ? product.color.split(",").map((c) => c.trim()) : [];
  const sizes = product.size ? product.size.split(",").map((s) => s.trim()) : [];

  const [selectedColor, setSelectedColor] = useState(colors[0] || "");
  const [selectedSize, setSelectedSize] = useState(sizes[0] || "");
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.warning("Vui lòng chọn màu sắc và kích thước!");
      return;
    }

    addToCart({ ...product, selectedColor, selectedSize, quantity });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <motion.div
        className="bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Hình ảnh */}
        <div className="flex items-center justify-center bg-gray-50 rounded-xl h-80">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full max-w-full object-contain p-2"
            onError={(e) => (e.target.src = "/images/default-product.jpg")}
          />
        </div>

        {/* Thông tin */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">{product.name}</h2>
          <p className="text-orange-600 text-2xl font-bold mb-4">
            ₫{product.price.toLocaleString()}
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>

          {/* Màu sắc */}
          <div className="mb-4">
            <strong className="block mb-1 text-gray-700">Màu sắc:</strong>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-3 py-1.5 rounded-full border text-sm font-medium transition ${
                    selectedColor === color
                      ? "bg-green-500 text-white border-green-500"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-green-100"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Kích thước */}
          <div className="mb-4">
            <strong className="block mb-1 text-gray-700">Kích thước:</strong>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1.5 rounded-full border text-sm font-medium transition ${
                    selectedSize === size
                      ? "bg-green-500 text-white border-green-500"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-green-100"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Chọn số lượng */}
          <div className="mb-6 flex items-center gap-4">
            <strong className="text-gray-700">Số lượng:</strong>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
              >
                −
              </button>
              <span className="px-4 font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
              >
                +
              </button>
            </div>
          </div>

          {/* Thêm vào giỏ */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition w-full"
          >
            🛒 Thêm vào giỏ hàng
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
