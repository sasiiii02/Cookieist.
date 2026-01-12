import React from "react";
import { assets } from "../assets/assets.js";

const Header = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 mt-20">
      {/* Header container */}
      <div
        className="relative rounded-2xl overflow-hidden bg-no-repeat bg-center bg-cover min-h-[calc(100vh-80px)] flex items-center"
        style={{ backgroundImage: `url(${assets.background})` }}
      >

        {/* Content container - positioned on the left */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-8 md:px-12 lg:px-16">
          <div className="max-w-2xl">
            <h2 className="font-brand text-5xl sm:text-6xl lg:text-7xl text-accent mb-6 leading-tight">
              Welcome to Cookieist
            </h2>
            <p className="font-brand text-text text-lg sm:text-xl lg:text-2xl mb-8 leading-relaxed">
              Freshly baked cookies delivered with love
            </p>
            <button className="bg-accent text-white px-8 py-4 rounded-full font-brand text-base sm:text-lg hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              View Menu
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;