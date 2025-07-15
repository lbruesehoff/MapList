import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/Sign-Up/SignUp";

function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        {/* Add more routes here as needed */}
      </Routes>
    </div>
  );
}

export default App;
