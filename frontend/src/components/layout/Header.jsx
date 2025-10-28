import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { cartCount } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <header className="bg-primary text-white sticky top-0 z-50 shadow-md">
      {/* Top bar */}
      <div className="bg-gradient-to-r from-primary to-secondary py-2 text-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-4">
            <Link to="/seller" className="hover:text-gray-200">
              Kênh Người Bán
            </Link>
            <span className="border-l border-white/30"></span>
            <Link to="/download" className="hover:text-gray-200">
              Tải ứng dụng
            </Link>
          </div>
          
          <div className="flex gap-4 items-center">
            <Link to="/notifications" className="hover:text-gray-200 flex items-center gap-1">
              <i className="fas fa-bell"></i>
              Thông báo
            </Link>
            <Link to="/support" className="hover:text-gray-200 flex items-center gap-1">
              <i className="fas fa-question-circle"></i>
              Hỗ trợ
            </Link>
            
            <span className="border-l border-white/30 h-4"></span>
            
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="hover:text-gray-200 flex items-center gap-2">
                  <i className="fas fa-user-circle"></i>
                  {user?.full_name || 'Tài khoản'}
                </Link>
                <button 
                  onClick={logout}
                  className="hover:text-gray-200"
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link to="/register" className="hover:text-gray-200">
                  Đăng ký
                </Link>
                <span className="border-l border-white/30 h-4"></span>
                <Link to="/login" className="hover:text-gray-200">
                  Đăng nhập
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <i className="fas fa-shopping-bag text-3xl"></i>
            <span className="text-2xl font-bold hidden md:block">SHOPEE</span>
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="flex bg-white rounded-sm overflow-hidden">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm sản phẩm..."
                className="flex-1 px-4 py-2 text-gray-800 outline-none"
              />
              <button 
                type="submit"
                className="bg-secondary px-6 py-2 hover:bg-opacity-90 transition-colors"
              >
                <i className="fas fa-search"></i>
              </button>
            </div>
          </form>

          {/* Cart */}
          <Link to="/cart" className="relative hover:opacity-80 transition-opacity">
            <i className="fas fa-shopping-cart text-3xl"></i>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-primary rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold border-2 border-primary">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;