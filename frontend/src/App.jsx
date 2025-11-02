// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Layout
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// Trang chính (khách)
import HomePage from "./pages/Home/HomePage";

// Trang người dùng sau đăng nhập
import UserHomePage from "./pages/Home/UserHomePage";


// Trang đăng nhập / đăng ký
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";

// Trang profile
import ProfilePage from "./pages/Profile/ProfilePage";

//Trang giỏ hàng
import CartPage from "./pages/Cart/CartPage";


function AnimatedRoutes() {
  const location = useLocation();

  const pageTransition = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
    transition: { duration: 0.4, ease: "easeOut" },
  };

  const isAuthPage =
    location.pathname.startsWith("/auth/login") ||
    location.pathname.startsWith("/auth/register");

  return (
    <>
      {/* Header và Footer chỉ hiện khi không ở trang auth */}
      {!isAuthPage && <Header />}

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Trang chủ cho khách */}
            <Route
              path="/"
              element={
                <motion.div {...pageTransition}>
                  <HomePage />
                </motion.div>
              }
            />

            {/* Trang chủ cho người dùng đã đăng nhập */}
            <Route
              path="/user/home"
              element={
                <motion.div {...pageTransition}>
                  <UserHomePage />
                </motion.div>
              }
            />

            {/* Trang đăng nhập */}
            <Route
              path="/auth/login"
              element={
                <motion.div {...pageTransition}>
                  <LoginPage />
                </motion.div>
              }
            />

            {/* Trang đăng ký */}
            <Route
              path="/auth/register"
              element={
                <motion.div {...pageTransition}>
                  <RegisterPage />
                </motion.div>
              }
            />
            {/* Trang Profile */}
            <Route
              path="/profile"
              element={
                <motion.div {...pageTransition}>
                  <ProfilePage />
                </motion.div>
              }
            />
            {/* Trang cart*/}
            <Route
              path="/cart"
              element={
                <motion.div {...pageTransition}>
                  <CartPage />
                </motion.div>
  }
/>



          </Routes>
        </AnimatePresence>
      </main>

      {!isAuthPage && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <AnimatedRoutes />
      </div>
    </Router>
  );
}
