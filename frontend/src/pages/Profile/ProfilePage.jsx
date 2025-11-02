import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    username: "",
    full_name: "",
    email: "",
    phone: "",
    address: "",
    avatar: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setForm(storedUser);
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setUser(form);
    localStorage.setItem("user", JSON.stringify(form));
    setEditMode(false);
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-xl">
        Không tìm thấy thông tin người dùng 😢
      </div>
    );
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center py-12 px-4 min-h-screen bg-gradient-to-br from-orange-50 to-orange-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-4xl border-t-4 border-orange-500"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <motion.img
              src={form.avatar || "https://i.pravatar.cc/150"}
              alt="Avatar"
              className="w-32 h-32 rounded-full border-4 border-orange-400 shadow-md object-cover"
              whileHover={{ scale: 1.05 }}
            />
            {editMode && (
              <motion.label
                whileHover={{ scale: 1.1 }}
                className="absolute bottom-0 right-0 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full cursor-pointer shadow-md transition"
              >
                📷
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                />
              </motion.label>
            )}
          </div>

          <div className="flex-1 space-y-4 w-full">
            {editMode ? (
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: "Tên tài khoản", name: "username", placeholder: "Tên tài khoản" },
                    { label: "Họ và tên", name: "full_name", placeholder: "Họ và tên" },
                    { label: "Email", name: "email", placeholder: "Email" },
                    { label: "Số điện thoại", name: "phone", placeholder: "Số điện thoại" },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-gray-700 text-sm font-semibold mb-1">
                        {field.label}
                      </label>
                      <input
                        name={field.name}
                        value={form[field.name]}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                        placeholder={field.placeholder}
                      />
                    </div>
                  ))}

                  <div className="md:col-span-2">
                    <label className="block text-gray-700 text-sm font-semibold mb-1">
                      Địa chỉ
                    </label>
                    <input
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                      placeholder="Địa chỉ"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                  >
                    ❌ Hủy
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition cursor-pointer"
                  >
                    💾 Lưu thay đổi
                  </motion.button>
                </div>
              </form>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-gray-800">
                  {user.full_name || "Người dùng"}
                </h2>
                <p className="text-gray-700">
                  <span className="font-semibold">Tên tài khoản:</span> {user.username}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Email:</span> {user.email}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Số điện thoại:</span>{" "}
                  {user.phone || "Chưa cập nhật"}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Địa chỉ:</span>{" "}
                  {user.address || "Chưa cập nhật"}
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setEditMode(true)}
                  className="mt-4 bg-orange-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-orange-600 transition cursor-pointer"
                >
                  ✏️ Chỉnh sửa thông tin
                </motion.button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
