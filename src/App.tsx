import React, { useState, useEffect, JSX } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Landing from "./pages/Landing/landing";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/Sign-Up/SignUp";
import { useSelector } from "react-redux";
import Footer from "./components/Footer/footer";
import Membership from "./pages/Membership/membership";
import VerifyEmail from "./pages/Verify-Email/VerifyEmail";
import Settings from "./pages/Settings/settings";
import ForgotPassword from "./pages/Forgot-Password/forgot-password";
const getCurrentUser = () => {
  const user = useSelector((state: any) => state.global.user);
  return user ? true : false;
};

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const isAuthenticated = getCurrentUser();

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(getCurrentUser());

  useEffect(() => {
    // Listen for auth changes if needed
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/memberships"
          element={
            <ProtectedRoute>
              <Membership />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
