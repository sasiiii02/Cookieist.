import React, { useEffect, useState } from "react";
import API from "../config/axios.JS";
import { toast } from "react-toastify";
import { Package } from "lucide-react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const statusOptions = [
    "Order Placed",
    "Food Processing",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
  ];

  // Fetch all orders
  const fetchAllOrders = async () => {
    try {
      const response = await API.get("/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      toast.error("Server error");
      console.error(error);
    }
  };

  // Update order status
  const statusHandler = async (orderId, newStatus) => {
    try {
      const response = await API.post("/order/status", { orderId, status: newStatus });

      if (response.data.success) {
        toast.success("Order status updated");

        // Update only the changed order in state
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        toast.error(response.data.message || "Failed to update status");
      }
    } catch (error) {
      toast.error("Error updating order status");
      console.error(error);
    }
  };

  // Proper useEffect wrapper for async
  useEffect(() => {
    const loadOrders = async () => {
      await fetchAllOrders();
    };
    loadOrders();
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold mb-8">Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found</p>
      ) : (
        <>
          {/* Header */}
          <div className="hidden md:grid grid-cols-7 gap-4 px-5 mb-3 text-sm text-gray-500 font-semibold">
            <span></span>
            <span>Order</span>
            <span>Items</span>
            <span>Customer</span>
            <span>Address</span>
            <span>Payment</span>
            <span>Status</span>
          </div>

          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="grid grid-cols-1 md:grid-cols-7 gap-4 items-start
                           bg-white border rounded-2xl p-5 shadow-sm"
              >
                {/* Icon */}
                <div className="flex justify-center md:justify-start">
                  <Package className="w-8 h-8 text-orange-500" />
                </div>

                {/* Order */}
                <div className="text-sm space-y-1">
                  <p className="font-semibold">#{order._id.slice(-6)}</p>
                  <p className="text-gray-500">
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>

                {/* Items */}
                <div className="text-sm space-y-1">
                  {order.items.map((item, index) => (
                    <p key={index}>
                      {item.name} × {item.quantity}
                    </p>
                  ))}
                </div>

                {/* Customer */}
                <div className="text-sm space-y-1">
                  <p className="font-semibold">
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p className="text-gray-500">{order.address.email}</p>
                  <p className="text-gray-500">{order.address.phone}</p>
                </div>

                {/* Address */}
                <div className="text-sm text-gray-600 leading-relaxed">
                  <p>{order.address.street}</p>
                  <p>
                    {order.address.city}, {order.address.zipcode}
                  </p>
                  <p>{order.address.state}</p>
                  <p>{order.address.country}</p>
                </div>

                {/* Payment */}
                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        order.payment
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {order.payment ? "Paid" : "Pending"}
                  </span>
                </div>

                {/* Status Dropdown */}
                <div>
                  <select
                    value={order.status}
                    onChange={(e) => statusHandler(order._id, e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-sm
                               focus:outline-none focus:ring-2 focus:ring-orange-400
                               bg-white"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Orders;
