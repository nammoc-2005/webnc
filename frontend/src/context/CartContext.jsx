import { createContext, useState, useContext, useEffect } from 'react';
import { cartAPI } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      // Load cart từ localStorage cho guest
      loadGuestCart();
    }
  }, [isAuthenticated]);

  const loadGuestCart = () => {
    const guestCart = localStorage.getItem('guestCart');
    if (guestCart) {
      setCart(JSON.parse(guestCart));
    }
  };

  const saveGuestCart = (cartData) => {
    localStorage.setItem('guestCart', JSON.stringify(cartData));
  };

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await cartAPI.get();
      setCart(response.data.items || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (variantId, quantity = 1) => {
    try {
      if (isAuthenticated) {
        await cartAPI.add({ variant_id: variantId, quantity });
        await fetchCart();
      } else {
        // Xử lý guest cart
        const existingItem = cart.find(item => item.variant_id === variantId);
        let newCart;
        if (existingItem) {
          newCart = cart.map(item =>
            item.variant_id === variantId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          newCart = [...cart, { variant_id: variantId, quantity }];
        }
        setCart(newCart);
        saveGuestCart(newCart);
      }
      return { success: true };
    } catch (error) {
      console.error('Error adding to cart:', error);
      return { success: false, message: 'Không thể thêm vào giỏ hàng' };
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      if (isAuthenticated) {
        await cartAPI.remove(itemId);
        await fetchCart();
      } else {
        const newCart = cart.filter(item => item.variant_id !== itemId);
        setCart(newCart);
        saveGuestCart(newCart);
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    if (quantity < 1) return;
    
    try {
      if (isAuthenticated) {
        await cartAPI.update(itemId, { quantity });
        await fetchCart();
      } else {
        const newCart = cart.map(item =>
          item.variant_id === itemId ? { ...item, quantity } : item
        );
        setCart(newCart);
        saveGuestCart(newCart);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const clearCart = async () => {
    try {
      if (isAuthenticated) {
        await cartAPI.clear();
      } else {
        localStorage.removeItem('guestCart');
      }
      setCart([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const cartTotal = cart.reduce((total, item) => {
    return total + (item.price_snapshot || 0) * item.quantity;
  }, 0);

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const value = {
    cart,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    fetchCart,
    cartTotal,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};