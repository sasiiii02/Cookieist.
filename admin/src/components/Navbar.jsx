import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../../../frontend/src/assets/assets";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-white border-b shadow-sm">
      <div className="px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <button onClick={() => navigate("/")}>
          <span className="font-logo text-2xl sm:text-3xl text-accent tracking-wide">
            Cookieist
          </span>
        </button>

        {/* Profile Icon */}
        <img
          src={assets.cookieicon}
          alt="Admin Profile"
          className="w-10 h-10 rounded-full object-cover cursor-pointer border"
        />

      </div>
    </nav>
  );
};

export default Navbar;
