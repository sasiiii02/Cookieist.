import React, { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { X } from "lucide-react";
import { useNavigate } from "react-router";

const Cart = () => {
  const {
    food_list,
    cartItems,
    removeFromCart,
    getTotalAmount,
    url
  } = useContext(StoreContext);
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState("");

  // ✅ Get subtotal from context
  const subtotal = getTotalAmount();
  const deliveryFee = subtotal > 0 ? 300 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">

      <h1 className="text-3xl font-brand text-accent mb-10">
        Your Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT – Cart Items */}
        <div className="lg:col-span-2">

          {/* Header */}
          <div className="hidden md:grid grid-cols-6 gap-4 text-sm font-semibold text-text border-b pb-4">
            <p>Item</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p className="text-center">Remove</p>
          </div>

          {/* Items */}
          {food_list.map((item) => {
            if (cartItems[item._id] > 0) {
              return (
                <div
                  key={item._id}
                  className="grid grid-cols-2 md:grid-cols-6 gap-4 items-center py-6 border-b"
                >
                  <img
                    src={url+"/images/"+item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl"
                  />

                  <p className="font-brand text-text">
                    {item.name}
                  </p>

                  <p className="text-text">
                    Rs. {item.price}
                  </p>

                  <p className="text-text">
                    {cartItems[item._id]}
                  </p>

                  <p className="font-semibold text-text">
                    Rs. {item.price * cartItems[item._id]}
                  </p>

                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="flex justify-center text-red-500 hover:text-red-700 transition"
                  >
                    <X />
                  </button>
                </div>
              );
            }
            return null;
          })}

          {/* Empty Cart */}
          {subtotal === 0 && (
            <p className="text-center text-text mt-12">
              Your cart is empty 🍪
            </p>
          )}
        </div>

        {/* RIGHT – Summary */}
        <div className="bg-[#FFF7F0] p-6 rounded-2xl shadow-sm h-fit">

          <h2 className="text-xl font-brand font-semibold text-text mb-6">
            Cart Totals
          </h2>

          <div className="space-y-4 text-sm">

            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>Rs. {subtotal}</p>
            </div>

            <div className="flex justify-between">
              <p>Delivery Fee</p>
              <p>Rs. {deliveryFee}</p>
            </div>

            <hr />

            <div className="flex justify-between font-semibold text-base">
              <p>Total</p>
              <p>Rs. {total}</p>
            </div>

          </div>

          <button
            onClick={()=>navigate("/order")}
            disabled={subtotal === 0}
            className={`w-full mt-6 py-2 rounded-full font-brand transition
              ${subtotal === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-accent text-white hover:opacity-90"}`}
          >
            Proceed to Checkout
          </button>

          {/* Promo Code */}
          <div className="mt-6">
            <p className="text-sm text-text mb-2">
              Have a promo code?
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter code"
                className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                disabled={subtotal === 0}
                className="bg-accent text-white px-4 rounded-lg text-sm hover:opacity-90 transition disabled:bg-gray-300"
              >
                Apply
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;
