import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import LocationList from "./pages/Location-List/Location-List";
import Login from "./pages/Login/Login";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/location-list" element={<LocationList />} />
        {/* Add more routes here as needed */}
      </Routes>
    </div>
  );
}

export default App;
