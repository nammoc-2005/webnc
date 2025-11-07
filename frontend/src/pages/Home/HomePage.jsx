import { motion } from "framer-motion";
import Banner from "../../components/layout/Banner";
import { categories } from "../../utils/mockData";
import { useSearch } from "../../context/SearchContext";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function HomePage() {
  const { searchTerm } = useSearch();
  const [activeCategory, setActiveCategory] = useState(null);
  const [activePriceRange, setActivePriceRange] = useState("all");
  const [products, setProducts] = useState([]);

  // 🧩 Danh sách sản phẩm mẫu giống UserHomePage
  const mockProducts = [
    // 📱 Điện thoại
    { id: 1, name: "iPhone 17", price: 24990000, image: "/images/iphone17.jpg", color: "Đen, Xanh titan", size: "6.1 inch", category_id: 1, description: "iPhone 17 với chip A19 Bionic, màn hình ProMotion 120Hz, camera 48MP." },
    { id: 2, name: "iPhone 17 Pro Max", price: 32990000, image: "/images/iphone17promax.jpg", color: "Titan tự nhiên, Xanh, Trắng", size: "6.7 inch", category_id: 1, description: "Phiên bản cao cấp nhất của iPhone 17, hiệu năng và camera vượt trội." },

    // 💻 Laptop
    { id: 3, name: "MacBook Pro M3 2024", price: 48990000, image: "/images/macbookprom3.jpg", color: "Xám, Bạc", size: "14 inch", category_id: 2, description: "MacBook Pro M3 2024 – Hiệu năng đỉnh cao cho dân lập trình & thiết kế." },
    { id: 4, name: "MacBook Air M2 2023", price: 28990000, image: "/images/macbookairm2.jpg", color: "Bạc, Vàng nhạt", size: "13 inch", category_id: 2, description: "Thiết kế siêu mỏng, pin lâu, hiệu năng mạnh mẽ từ chip M2." },

    // 👕 Thời trang nam
    { id: 5, name: "Áo sơ mi trắng nam", price: 199000, image: "/images/somi.jpg", color: "Trắng", size: "M, L, XL", category_id: 3, description: "Áo sơ mi công sở trắng tinh tế, phù hợp đi làm và sự kiện." },
    { id: 6, name: "Quần âu nam đen", price: 259000, image: "/images/quanau.jpg", color: "Đen", size: "29-34", category_id: 3, description: "Quần tây nam chất liệu cotton co giãn, chuẩn form sang trọng." },
    { id: 7, name: "Giày da nam công sở", price: 499000, image: "/images/giayda.jpg", color: "Nâu, Đen", size: "39-43", category_id: 3, description: "Giày da cao cấp, bền đẹp, tạo phong cách lịch lãm." },

    // 👗 Thời trang nữ
    { id: 8, name: "Váy công sở nữ", price: 349000, image: "/images/vay.jpg", color: "Đen, Hồng pastel", size: "S, M, L", category_id: 4, description: "Váy công sở hiện đại, phù hợp với môi trường làm việc thanh lịch." },
    { id: 9, name: "Đầm tiệc nữ thanh lịch", price: 429000, image: "/images/dam.jpg", color: "Đỏ, Tím, Xanh biển", size: "S, M, L", category_id: 4, description: "Đầm dự tiệc thiết kế quyến rũ, tôn dáng và thời thượng." },

    // 💄 Mỹ phẩm
    { id: 10, name: "Son môi 3CE Velvet Lip Tint", price: 299000, image: "/images/son.jpg", color: "Đỏ cam, Hồng đất", size: "5g", category_id: 5, description: "Son lì mịn môi, lâu trôi, màu sắc tự nhiên, không khô môi." },
    { id: 11, name: "Phấn má hồng Innisfree", price: 199000, image: "/images/phan.jpg", color: "Hồng nhạt, Cam đào", size: "10g", category_id: 5, description: "Phấn má dạng nén mịn, giúp khuôn mặt rạng rỡ tự nhiên." },
    { id: 12, name: "Kem chống nắng Anessa", price: 499000, image: "/images/kcn.jpg", color: "Vàng", size: "60ml", category_id: 5, description: "Chống nắng SPF50+, chống nước, dưỡng ẩm nhẹ cho da." },

    // 🏠 Đồ gia dụng
    { id: 13, name: "Smart TV Samsung 50 inch 4K", price: 8490000, image: "/images/tv.jpg", color: "Đen", size: "50 inch", category_id: 6, description: "Smart TV Samsung 50” UHD 4K, hỗ trợ Netflix, YouTube, Bluetooth 5.0." },
    { id: 14, name: "Quạt đứng Panasonic", price: 1290000, image: "/images/quat.jpg", color: "Trắng", size: "1m2", category_id: 6, description: "Quạt Panasonic gió mạnh, 3 tốc độ, tiết kiệm điện năng." },

    // 🍖 Thực phẩm
    { id: 15, name: "Thịt bò Mỹ cắt lát 500g", price: 225000, image: "/images/thitbo.jpg", color: "Đỏ tươi", size: "500g", category_id: 7, description: "Thịt bò Mỹ tươi sạch, thích hợp nướng, lẩu, chiên, xào." },
    { id: 16, name: "Thịt gà ta thả vườn 1kg", price: 169000, image: "/images/thitga.jpg", color: "Vàng", size: "1kg", category_id: 7, description: "Gà ta thả vườn thịt chắc, ngọt, được kiểm định an toàn thực phẩm." },

    // 📚 Sách
    { id: 17, name: "Truyện Doraemon tập 1", price: 25000, image: "/images/truyen.jpg", color: "Xanh lam", size: "A5", category_id: 8, description: "Tập đầu tiên của bộ truyện tranh huyền thoại Doraemon." },
    { id: 18, name: "Sách giáo khoa Toán lớp 12", price: 39000, image: "/images/sach.jpg", color: "Xanh lá", size: "A4", category_id: 8, description: "Sách giáo khoa Toán lớp 12 do NXB Giáo Dục phát hành." },
  ];

  useEffect(() => setProducts(mockProducts), []);

  // 🧮 Lọc danh mục & giá
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filterByPrice = (product) => {
    switch (activePriceRange) {
      case "under500":
        return product.price < 500000;
      case "500to2m":
        return product.price >= 500000 && product.price <= 2000000;
      case "2to10m":
        return product.price > 2000000 && product.price <= 10000000;
      case "above10m":
        return product.price > 10000000;
      default:
        return true;
    }
  };

const filteredProducts = products.filter((p) => {
  const matchCategory = activeCategory ? p.category_id === activeCategory : true;
  const matchPrice = filterByPrice(p);
  const matchSearch =
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase());

  return matchCategory && matchPrice && matchSearch;
});


  // ⚠️ Khi ấn "Thêm vào giỏ hàng" mà chưa đăng nhập
  const handleAddToCart = () => {
    toast.warning("⚠️ Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Banner />

      <div className="max-w-7xl mx-auto mt-6 px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          👋 Chào mừng bạn đến với Shopee Clone!
        </h2>
        <p className="text-gray-600">Khám phá hàng ngàn sản phẩm hấp dẫn!</p>
      </div>

      {/* Danh mục */}
      <div className="max-w-7xl mx-auto mt-4 px-4">
        <div className="flex flex-wrap items-center gap-3 pb-3 border-b border-gray-200">
          {filteredCategories.map((cat) => (
            <motion.button
              key={cat.category_id}
              onClick={() =>
                setActiveCategory(
                  activeCategory === cat.category_id ? null : cat.category_id
                )
              }
              className={`px-5 py-2 rounded-full font-medium border shadow-sm transition ${
                activeCategory === cat.category_id
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-orange-100 hover:text-orange-600"
              }`}
            >
              {cat.name}
            </motion.button>
          ))}
        </div>

        {/* Bộ lọc giá */}
        <div className="mt-4 flex flex-wrap gap-3">
          {[
            { id: "all", label: "Tất cả" },
            { id: "under500", label: "Dưới 500K" },
            { id: "500to2m", label: "500K - 2 Triệu" },
            { id: "2to10m", label: "2 - 10 Triệu" },
            { id: "above10m", label: "Trên 10 Triệu" },
          ].map((range) => (
            <button
              key={range.id}
              onClick={() => setActivePriceRange(range.id)}
              className={`px-4 py-1.5 rounded-full border font-medium text-sm transition ${
                activePriceRange === range.id
                  ? "bg-green-500 text-white border-green-500"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-green-100"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sản phẩm */}
      <motion.div
        className="max-w-7xl mx-auto mt-8 px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        initial="hidden"
        animate="visible"
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <motion.div
              key={p.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg overflow-hidden cursor-pointer"
              whileHover={{ y: -5 }}
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-40 object-contain bg-white p-2 rounded-xl transition-transform duration-300 hover:scale-105"
                onError={(e) => (e.target.src = "/images/default-product.jpg")}
              />
              <div className="p-4 text-left">
                <h3 className="font-semibold text-gray-800 truncate">{p.name}</h3>
                <p className="text-orange-600 font-bold mb-2">
                  ₫{p.price.toLocaleString()}
                </p>
                <motion.button
                  onClick={handleAddToCart}
                  className="w-full bg-gray-400 text-white py-2 rounded-lg font-semibold hover:bg-gray-500 transition"
                >
                  🛒 Thêm vào giỏ
                </motion.button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            Không có sản phẩm nào phù hợp với bộ lọc.
          </p>
        )}
      </motion.div>
    </div>
  );
}
