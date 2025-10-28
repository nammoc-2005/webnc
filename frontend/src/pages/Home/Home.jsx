import { useState, useEffect } from 'react';
import { productAPI, categoryAPI } from '../../services/api';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        productAPI.getAll({ limit: 24 }),
        categoryAPI.getAll()
      ]);
      
      setProducts(productsRes.data);
      setCategories(categoriesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-primary mb-4"></i>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Banner */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            SHOPEE SALE SHOCK
          </h1>
          <p className="text-xl md:text-2xl mb-6">
            Giảm giá đến 50% - Miễn phí vận chuyển toàn quốc
          </p>
          <button className="bg-white text-primary px-8 py-3 rounded-md font-bold hover:bg-gray-100 transition-colors">
            Mua Ngay
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Categories */}
        {categories.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Danh Mục</h2>
            <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10 gap-4">
              {categories.slice(0, 10).map((category) => (
                <Link
                  key={category.category_id}
                  to={`/category/${category.category_id}`}
                  className="flex flex-col items-center p-4 bg-white rounded-lg hover:shadow-lg transition-shadow"
                >
                  <div className="w-16 h-16 bg-gray-200 rounded-full mb-2 flex items-center justify-center">
                    <i className="fas fa-tag text-2xl text-primary"></i>
                  </div>
                  <span className="text-sm text-center text-gray-700 line-clamp-2">
                    {category.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Flash Sale */}
        <div className="mb-12 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <i className="fas fa-bolt text-3xl text-yellow-500"></i>
              <h2