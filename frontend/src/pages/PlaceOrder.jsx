import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router";
const PlaceOrder = () => {

  const { getTotalAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    // 1️⃣ Build order items SAFELY
    const orderItems = [];

    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({
          _id: item._id,
          name: item.name,
          price: item.price,
          quantity: cartItems[item._id],
        });
      }
    });

    // 2️⃣ Order payload
    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalAmount() + 300, // ✅ correct
    };

    try {
      const response = await axios.post(
        `${url}/api/order/place`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ correct
          },
        }
      );

      // 3️⃣ Redirect to Stripe Checkout
      if (response.data.success) {
        window.location.href = response.data.session_url;
      }
    } catch (error) {
      console.error("Order failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const navigate= useNavigate();

useEffect(() => {
  // If user is not logged in → go to cart
  if (!token) {
    navigate("/cart");
    return;
  }

  // If cart is empty → go to cart
  if (getTotalAmount() === 0) {
    navigate("/cart");
    return;
  }
}, [token, cartItems]);


  const subtotal = getTotalAmount();
  const deliveryFee = subtotal > 0 ? 300 : 0;
  const total = subtotal + deliveryFee;

  return (
    <form onSubmit={handlePlaceOrder} className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
      <h1 className="text-3xl font-brand text-accent mb-10">
        Place Order
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT – Delivery Information */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-brand font-semibold text-text">
            Delivery Information
          </h2>

          {/* Line 1 – Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              onChange={onChangeHandler}
              name="firstName"
              value={data.firstName}
              type="text"
              placeholder="First Name"
              className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
            <input
              name="lastName"
              onChange={onChangeHandler}
              value={data.lastName}
              type="text"
              placeholder="Last Name"
              className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>

          {/* Line 2 – Email */}
          <input
              name="email"
              onChange={onChangeHandler}
              value={data.email}
            type="email"
            placeholder="Email"
            className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent w-full"
            required
          />

          {/* Line 3 – Street */}
          <input
            name="street"
              onChange={onChangeHandler}
              value={data.street}
            type="text"
            placeholder="Street Address"
            className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent w-full"
            required
          />

          {/* Line 4 – City | State */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
            name="city"
              onChange={onChangeHandler}
              value={data.city}
              type="text"
              placeholder="City"
              className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
            <input
            name="state"
              onChange={onChangeHandler}
              value={data.state}
              type="text"
              placeholder="State / Province"
              className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>

          {/* Line 5 – ZIP / Country */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
            name="zipcode"
              onChange={onChangeHandler}
              value={data.zipcode}
              type="text"
              placeholder="Postal Code / ZIP"
              className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
            <input
            name="country"
              onChange={onChangeHandler}
              value={data.country}
              type="text"
              placeholder="Country"
              className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>

          {/* Line 6 – Phone */}
          <input
          name="phone"
              onChange={onChangeHandler}
              value={data.phone}
            type="tel"
            placeholder="Phone Number"
            className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent w-full"
            required
          />
        </div>

        {/* RIGHT – Cart Summary */}
        <div className="bg-[#FFF7F0] p-6 rounded-2xl shadow-sm h-fit">
          <h2 className="text-xl font-brand font-semibold text-text mb-6">
            Order Summary
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

            type="submit"
            className={`w-full mt-6 py-2 rounded-full font-brand
              bg-accent text-white hover:opacity-90 transition`}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
