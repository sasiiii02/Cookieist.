import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import List  from "./pages/List";
import Orders from "./pages/Orders";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Top Navbar */}
      <Navbar />

      {/* Main layout */}
      <div className="flex flex-1">

        {/* Sidebar */}
        <Sidebar />

        {/* Page content */}
        <main className="flex-1 p-6 bg-gray-50">
          <Routes>
            <Route path="/add" element={<Add />} />
            <Route path="/list" element={<List />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </main>

      </div>
    </div>
  );
};

export default App;
