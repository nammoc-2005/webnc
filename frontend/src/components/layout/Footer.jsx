import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Chăm sóc khách hàng */}
          <div>
            <h3 className="font-bold text-lg mb-4">CHĂM SÓC KHÁCH HÀNG</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/help" className="hover:text-white">Trung Tâm Trợ Giúp</Link></li>
              <li><Link to="/guide" className="hover:text-white">Hướng Dẫn Mua Hàng</Link></li>
              <li><Link to="/payment" className="hover:text-white">Thanh Toán</Link></li>
              <li><Link to="/shipping" className="hover:text-white">Vận Chuyển</Link></li>
              <li><Link to="/return" className="hover:text-white">Trả Hàng & Hoàn Tiền</Link></li>
            </ul>
          </div>

          {/* Về Shopee */}
          <div>
            <h3 className="font-bold text-lg mb-4">VỀ SHOPEE</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/about" className="hover:text-white">Giới Thiệu</Link></li>
              <li><Link to="/careers" className="hover:text-white">Tuyển Dụng</Link></li>
              <li><Link to="/terms" className="hover:text-white">Điều Khoản</Link></li>
              <li><Link to="/privacy" className="hover:text-white">Chính Sách Bảo Mật</Link></li>
              <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
            </ul>
          </div>

          {/* Thanh toán */}
          <div>
            <h3 className="font-bold text-lg mb-4">THANH TOÁN</h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white rounded p-2 flex items-center justify-center">
                <img src="/payment/visa.png" alt="Visa" className="h-6" />
              </div>
              <div className="bg-white rounded p-2 flex items-center justify-center">
                <img src="/payment/mastercard.png" alt="Mastercard" className="h-6" />
              </div>
              <div className="bg-white rounded p-2 flex items-center justify-center">
                <img src="/payment/momo.png" alt="MoMo" className="h-6" />
              </div>
            </div>
          </div>

          {/* Theo dõi */}
          <div>
            <h3 className="font-bold text-lg mb-4">THEO DÕI CHÚNG TÔI</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-white flex items-center gap-2">
                  <i className="fab fa-facebook"></i> Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white flex items-center gap-2">
                  <i className="fab fa-instagram"></i> Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white flex items-center gap-2">
                  <i className="fab fa-youtube"></i> YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© 2025 Shopee. Tất cả các quyền được bảo lưu.</p>
          <p className="mt-2">Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Thành phố Hà Nội, Việt Nam</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;