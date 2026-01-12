import React, { useContext, useState } from "react";
import { Search, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { assets } from "../assets/assets";

const Navbar = ({ setShowLogin }) => {
  const [active, setActive] = useState("Home");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navItems = ["Home", "Menu", "About", "Contact"];
  const navigate = useNavigate();

  const { cartItems, token, setToken } = useContext(StoreContext);

  const cartCount = Object.values(cartItems).reduce(
    (total, qty) => total + qty,
    0
  );

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setShowProfileMenu(false);
    navigate("/");
  };

  return (
    <nav className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="py-4 sm:py-6 flex justify-between items-center">

        {/* Logo */}
        <button onClick={() => navigate("/")}>
          <span className="font-logo text-2xl sm:text-3xl lg:text-4xl text-accent tracking-wide">
            Cookieist
          </span>
        </button>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-8 font-brand text-text font-medium">
          {navItems.map((item) => (
            <li key={item}>
              <button
                onClick={() => setActive(item)}
                className={`
                  relative transition-colors
                  after:content-[''] after:absolute after:left-0 after:-bottom-1
                  after:h-[2px] after:bg-accent after:transition-all
                  ${
                    active === item
                      ? "text-accent after:w-full"
                      : "after:w-0 hover:text-accent hover:after:w-full"
                  }
                `}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="flex items-center gap-4 sm:gap-5">

          {/* Search */}
          <button className="text-text hover:text-accent transition">
            <Search className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Cart */}
          <button
            onClick={() => navigate("/cart")}
            className="relative text-text hover:text-accent transition"
          >
            <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
            {cartCount > 0 && (
              <span
                className="absolute -top-2 -right-2 bg-accent text-white
                text-[10px] sm:text-xs w-4 h-4 sm:w-5 sm:h-5
                flex items-center justify-center rounded-full font-brand"
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* Auth Section */}
          {!token ? (
            <button
              onClick={() => setShowLogin(true)}
              className="hidden sm:block font-brand bg-accent text-white
                px-4 sm:px-5 py-2 rounded-full hover:opacity-90 transition"
            >
              Sign In
            </button>
          ) : (
            <div className="relative">

              {/* Profile Icon */}
              <button
                onClick={() => setShowProfileMenu((prev) => !prev)}
                className="w-10 h-10 rounded-full overflow-hidden border
                  border-accent hover:opacity-90 transition"
              >
                <img
                  src={assets.cookieicon}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </button>

              {/* Dropdown */}
              {showProfileMenu && (
                <ul
                  className="absolute right-0 mt-3 w-36 bg-white
                  border rounded-xl shadow-lg overflow-hidden text-sm font-brand"
                >
                  <li
                    onClick={() => {
                      navigate("/myorders");
                      setShowProfileMenu(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Orders
                  </li>
                  <li
                    onClick={logout}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                  >
                    Logout
                  </li>
                </ul>
              )}

            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
