// src/components/layout/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-orange-600 text-white mt-12">
      <div className="max-w-7xl mx-auto text-center py-6 text-sm">
        <p className="mb-2 font-medium">
          © {new Date().getFullYear()} <strong>Shopee Clone</strong> — All rights reserved.
        </p>
        <div className="flex justify-center gap-4 text-orange-200">
          <a href="#" className="hover:text-white">Về chúng tôi</a>
          <a href="#" className="hover:text-white">Chính sách bảo mật</a>
          <a href="#" className="hover:text-white">Liên hệ</a>
        </div>
      </div>
    </footer>
  );
}
