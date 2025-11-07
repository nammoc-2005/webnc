import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cartItems");
    return stored ? JSON.parse(stored) : [];
  });

  // 🔁 Lưu vào localStorage mỗi khi giỏ hàng thay đổi
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ➕ Thêm sản phẩm (phân biệt theo ID + size + màu)
  const addToCart = (product, showToast = true) => {
    if (!product?.id || !product?.price) {
      console.warn("⚠️ Sản phẩm không hợp lệ:", product);
      return;
    }

    setCartItems((prev) => {
      const exist = prev.find(
        (item) =>
          item.id === product.id &&
          item.selectedColor === product.selectedColor &&
          item.selectedSize === product.selectedSize
      );

      if (exist) {
        // Nếu trùng ID + màu + size → cộng thêm số lượng
        const updated = prev.map((item) =>
          item.id === product.id &&
          item.selectedColor === product.selectedColor &&
          item.selectedSize === product.selectedSize
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
        if (showToast) toast.info("🔁 Đã cập nhật số lượng trong giỏ hàng");
        return updated;
      }

      if (showToast) toast.success("✅ Đã thêm vào giỏ hàng!");
      return [...prev, { ...product, quantity: product.quantity || 1 }];
    });
  };

  // ❌ Xóa sản phẩm (theo id + màu + size)
  const removeFromCart = (id, color, size) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.id === id &&
            item.selectedColor === color &&
            item.selectedSize === size
          )
      )
    );
    toast.success("🗑️ Đã xóa sản phẩm khỏi giỏ hàng");
  };

  // 🔼 Tăng số lượng
  const increaseQuantity = (id, color, size) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id &&
        item.selectedColor === color &&
        item.selectedSize === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // 🔽 Giảm số lượng (và xóa nếu = 0)
  const decreaseQuantity = (id, color, size) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id &&
          item.selectedColor === color &&
          item.selectedSize === size
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // 💳 Xóa toàn bộ giỏ hàng (sau thanh toán)
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  // 💰 Tổng tiền
  const getTotalPrice = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // 🔢 Tổng số lượng
  const getTotalQuantity = () =>
    cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        getTotalPrice,
        getTotalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
