export default function ProductCard({ product }) {
  return (
    <div className="border rounded-lg p-2 shadow hover:shadow-lg transition">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
      <h3 className="text-sm font-semibold mt-2 line-clamp-2">{product.name}</h3>
      <p className="text-red-600 font-bold mt-1">{product.price.toLocaleString()}₫</p>
      <button className="bg-orange-500 text-white w-full py-1 mt-2 rounded hover:bg-orange-600">
        Xem chi tiết
      </button>
    </div>
  );
}
