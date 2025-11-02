import axios from "axios";

const USE_MOCK_API = true; // 🔸 đổi sang false khi có backend thật
const API_BASE_URL = "http://localhost:5000/api"; // URL backend

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor thêm token (nếu có)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// =========================
// MOCK API (nếu chưa có backend)
// =========================
if (USE_MOCK_API) {
  console.warn("⚠️ Mock API đang được sử dụng thay vì backend thật.");

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  // Mock user data
  const mockUsers = [
    { id: 1, email: "admin@gmail.com", password: "123456", name: "Admin" },
    { id: 2, email: "user@gmail.com", password: "123456", name: "User" },
  ];

  // Mock product data
  const mockProducts = [
    { id: 1, name: "Áo thun", price: 120000, category: "Thời trang" },
    { id: 2, name: "Điện thoại", price: 5000000, category: "Công nghệ" },
    { id: 3, name: "Giày thể thao", price: 800000, category: "Thời trang" },
  ];

  // Giả lập auth API
  var authAPI = {
    login: async (data) => {
      await delay(400);
      const user = mockUsers.find(
        (u) => u.email === data.email && u.password === data.password
      );
      if (user) {
        localStorage.setItem("token", "fake-token");
        localStorage.setItem("user", JSON.stringify(user));
        return { data: { success: true, user } };
      } else {
        throw { response: { data: { message: "Sai email hoặc mật khẩu" } } };
      }
    },

    register: async (data) => {
      await delay(400);
      const exists = mockUsers.some((u) => u.email === data.email);
      if (exists) {
        throw { response: { data: { message: "Email đã tồn tại" } } };
      }
      const newUser = { id: mockUsers.length + 1, ...data };
      mockUsers.push(newUser);
      return { data: { success: true, user: newUser } };
    },

    getProfile: async () => {
      await delay(300);
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) return { data: user };
      throw { response: { status: 401, data: { message: "Chưa đăng nhập" } } };
    },
  };

  // Giả lập products
  var productAPI = {
    getAll: async () => {
      await delay(200);
      return { data: mockProducts };
    },
    getById: async (id) => {
      await delay(200);
      const product = mockProducts.find((p) => p.id === Number(id));
      return { data: product || null };
    },
    getByCategory: async (cat) => {
      await delay(200);
      const filtered = mockProducts.filter((p) => p.category === cat);
      return { data: filtered };
    },
  };

  // Giỏ hàng tạm
  var cartAPI = {
    get: async () => ({ data: [] }),
    add: async (data) => ({ data: { success: true, item: data } }),
    update: async () => ({ data: { success: true } }),
    remove: async () => ({ data: { success: true } }),
  };

  var orderAPI = {
    create: async () => ({ data: { success: true, orderId: Date.now() } }),
    getAll: async () => ({ data: [] }),
    getById: async () => ({ data: {} }),
  };
} else {
  // =========================
  // DÙNG BACKEND THẬT (khi có API)
  // =========================
  var authAPI = {
    login: (data) => api.post("/auth/login", data),
    register: (data) => api.post("/auth/register", data),
    getProfile: () => api.get("/auth/profile"),
  };

  var productAPI = {
    getAll: (params) => api.get("/products", { params }),
    getById: (id) => api.get(`/products/${id}`),
    getByCategory: (categoryId) => api.get(`/products/category/${categoryId}`),
  };

  var cartAPI = {
    get: () => api.get("/cart"),
    add: (data) => api.post("/cart/add", data),
    update: (itemId, data) => api.put(`/cart/${itemId}`, data),
    remove: (itemId) => api.delete(`/cart/${itemId}`),
  };

  var orderAPI = {
    create: (data) => api.post("/orders", data),
    getAll: () => api.get("/orders"),
    getById: (id) => api.get(`/orders/${id}`),
  };
}

export { authAPI, productAPI, cartAPI, orderAPI };
export default api;
