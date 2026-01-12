import React from "react";
import { PlusCircle, List, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="w-64 min-h-screen bg-[#FFF7F0] border-r">
      <div className="p-6 space-y-6">

        {/* Add Items */}
        <button
          onClick={() => navigate("/add")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-text hover:bg-accent hover:text-white transition"
        >
          <PlusCircle className="w-5 h-5" />
          <span className="font-brand">Add Items</span>
        </button>

        {/* List Items */}
        <button
          onClick={() => navigate("/list")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-text hover:bg-accent hover:text-white transition"
        >
          <List className="w-5 h-5" />
          <span className="font-brand">List Items</span>
        </button>

        {/* Orders */}
        <button
          onClick={() => navigate("/orders")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-text hover:bg-accent hover:text-white transition"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="font-brand">Orders</span>
        </button>

      </div>
    </aside>
  );
};

export default Sidebar;
