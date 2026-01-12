import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import FoodItem from "./FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 mt-20">

      <h2 className="font-brand text-2xl lg:text-2xl text-text mb-3 font-bold">
        Top Flavors Near You
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {food_list
          .filter(
            (item) => category === "All" || item.category === category
          )
          .map((item) => (
            <FoodItem key={item._id} item={item} />
          ))}
      </div>

    </section>
  );
};

export default FoodDisplay;
