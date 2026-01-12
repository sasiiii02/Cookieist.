import React from "react";
import { menu_list } from "../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 mt-20">

      {/* Title */}
      <h1 className="font-brand text-2xl lg:text-2xl text-text mb-3 font-bold">
        Explore our menu
      </h1>

      {/* Subtitle */}
      <p className="font-brand text-text text-base lg:text-lg mb-10">
        Choose from our delicious selection of cookies
      </p>

      {/* Menu Items */}
      <div className="flex gap-6 lg:gap-8 overflow-x-auto pb-2 scrollbar-hide">
        {menu_list.map((item, index) => {
          const isActive = category === item.menu_name;

          return (
            <div
              key={index}
              onClick={() => setCategory(item.menu_name)}
              className="flex flex-col items-center cursor-pointer"
            >
              {/* Image Circle */}
              <div
                className={`
                  w-28 h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden border-2 transition
                  ${isActive ? "border-accent" : "border-transparent"}
                `}
              >
                <img
                  src={item.menu_image}
                  alt={item.menu_name}
                  className="w-full h-full object-cover hover:scale-110 transition duration-300"
                />
              </div>

              {/* Label */}
              <p
                className={`
                  mt-3 font-brand text-sm lg:text-base transition
                  ${isActive ? "text-accent font-semibold" : "text-text"}
                `}
              >
                {item.menu_name}
              </p>
            </div>
          );
        })}
      </div>

      <hr className="mt-16 mb-16 h-0.5 bg-accent border-none" />
    </section>
  );
};

export default ExploreMenu;
