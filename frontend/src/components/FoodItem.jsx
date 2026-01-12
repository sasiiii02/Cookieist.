import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

const FoodItem = ({ item }) => {
  const { addToCart, removeFromCart, getQuantity,url } =
    useContext(StoreContext);

  const quantity = getQuantity(item._id);

  return (
    <div className="bg-bg rounded-2xl shadow-md overflow-hidden mb-16 mt-16">
      <img src={url+"/images/"+item.image} alt={item.name} className="w-full h-70 object-cover" />

      <div className="p-4">
        <h3 className="font-brand text-lg text-text mb-1">
          {item.name}
        </h3>

        <p className="text-accent font-semibold mb-4">
          Rs. {item.price}
        </p>

        {quantity === 0 ? (
          <button
            onClick={() => addToCart(item._id)}
            className="w-full bg-accent text-white py-2 rounded-full text-sm"
          >
            Add to Cart
          </button>
        ) : (
          <div className="flex items-center justify-between">
            <button
              onClick={() => removeFromCart(item._id)}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              -
            </button>

            <span className="font-semibold">{quantity}</span>

            <button
              onClick={() => addToCart(item._id)}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodItem;
