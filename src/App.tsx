import React, { useState, useEffect, JSX } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/Sign-Up/SignUp";
import { useSelector } from "react-redux";

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
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
