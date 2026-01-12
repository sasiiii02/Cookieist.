import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { Package } from "lucide-react";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeOrderId, setActiveOrderId] = useState(null); // Track order expanded
  const [orderStatuses, setOrderStatuses] = useState({}); // Dynamic status tracking

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${url}/api/order/userorders`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setOrders(response.data.data);
        // Initialize orderStatuses state
        const statuses = {};
        response.data.data.forEach(order => {
          statuses[order._id] = order.status;
        });
        setOrderStatuses(statuses);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  // Function to toggle track order UI
  const toggleTrack = (orderId) => {
    setActiveOrderId(prev => (prev === orderId ? null : orderId));
  };

  // Optional: Poll order status every 10 seconds (simulate live update)
  useEffect(() => {
    const interval = setInterval(async () => {
      if (activeOrderId) {
        try {
          const response = await axios.post(
            `${url}/api/order/userorders`,
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (response.data.success) {
            const updatedStatuses = {};
            response.data.data.forEach(order => {
              updatedStatuses[order._id] = order.status;
            });
            setOrderStatuses(updatedStatuses);
          }
        } catch (error) {
          console.error("Error updating order statuses:", error);
        }
      }
    }, 10000); // every 10 seconds

    return () => clearInterval(interval);
  }, [activeOrderId, token, url]);

  const getStatusStep = (status) => {
    const steps = ["Order Placed", "Food Processing", "Out for Delivery", "Delivered"];
    return steps.indexOf(status);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-60 text-gray-500">
        Loading your orders...
      </div>
    );

  if (orders.length === 0)
    return (
      <div className="text-center mt-20 text-gray-500">
        You have no orders yet 🍪
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-brand text-accent mb-8">My Orders</h2>

      {/* Header (Desktop only) */}
      <div className="hidden md:grid grid-cols-7 gap-4 text-sm text-gray-500 font-semibold mb-3 px-4">
        <span></span>
        <span>Items</span>
        <span>Amount</span>
        <span>Qty</span>
        <span>Status</span>
        <span>Date</span>
        <span></span>
      </div>

      <div className="space-y-4">
        {orders.map((order) => {
          const totalQty = order.items.reduce((sum, item) => sum + item.quantity, 0);
          const currentStep = getStatusStep(orderStatuses[order._id] || order.status);

          return (
            <div key={order._id} className="space-y-2">
              {/* Order row */}
              <div
                className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center
                           bg-[#FFF7F0] rounded-2xl p-5 shadow-sm"
              >
                {/* Icon */}
                <div className="flex justify-center md:justify-start">
                  <Package className="w-8 h-8 text-accent" />
                </div>

                {/* Items */}
                <div className="text-sm">
                  {order.items.map((item, index) => (
                    <p key={index}>
                      {item.name} × {item.quantity}
                    </p>
                  ))}
                </div>

                {/* Amount */}
                <div className="font-semibold">LKR {order.amount}</div>

                {/* Quantity */}
                <div>{totalQty} items</div>

                {/* Status */}
                <div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                    {orderStatuses[order._id] || order.status}
                  </span>
                </div>

                {/* Date */}
                <div className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </div>

                {/* Track button */}
                <div>
                  <button
                    onClick={() => toggleTrack(order._id)}
                    className="px-4 py-1.5 rounded-full text-sm font-brand
                               border border-accent text-accent
                               hover:bg-accent hover:text-white transition"
                  >
                    {activeOrderId === order._id ? "Hide" : "Track Order"}
                  </button>
                </div>
              </div>

              {/* Track status */}
              {activeOrderId === order._id && (
                <div className="md:col-span-7 mt-2 bg-white rounded-xl p-4 border">
                  <p className="text-sm font-semibold mb-3 text-gray-700">Order Tracking</p>

                  <div className="flex items-center gap-4">
                    {["Order Placed", "Food Processing", "Out for Delivery", "Delivered"].map(
                      (step, index) => {
                        const isActive = index <= currentStep;
                        return (
                          <div key={step} className="flex items-center gap-2">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                isActive ? "bg-green-500" : "bg-gray-300"
                              }`}
                            ></div>
                            <span className={`text-xs ${isActive ? "text-green-600" : "text-gray-400"}`}>
                              {step}
                            </span>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
