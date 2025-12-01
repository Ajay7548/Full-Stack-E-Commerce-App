import React, { useEffect, useState } from "react";
import axios from "axios";
import { useShop } from "../context/ShopContext";
import Title from "../components/Title";

const Order = () => {
  const { token, currency } = useShop();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get("/api/order/userorders?t=" + new Date().getTime(),
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (err) {
      console.log("Error loading orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]); // Added dependencies to fix refresh issue

  // Poll for updates every 10 seconds to check for status changes
  useEffect(() => {
    if (!token) return;

    const interval = setInterval(() => {
      fetchOrders();
    }, 10000); // Refresh every 10 seconds

    return () => clearInterval(interval);
  }, [token]);

  console.log(orders);

  if (loading) {
    return (
      <div className="pt-28 text-center">
        <p className="text-gray-500">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="pt-28">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              className="py-3 border-b text-gray-500 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-start gap-6 text-sm">
                {/* Show first product image */}
                <img
                  className="w-16 sm:w-20"
                  src={order.items[0].image}
                  alt={order.items[0].name}
                />

                <div>
                  <p className="sm:text-base font-medium dark:text-white text-black">
                    {order.items[0].name}
                    {order.items.length > 1 && (
                      <span className="text-gray-400 ml-2">
                        +{order.items.length - 1} more
                      </span>
                    )}
                  </p>

                  <div className="text-base text-gray-500">
                    <div className="flex gap-4">
                      <p>Size: {order.items[0].size}</p>
                      <p>Qty: {order.items[0].quantity}</p>
                    </div>
                    <p>Amount: {currency}{order.amount}</p>
                    <p>Payment: {order.paymentMethod.toUpperCase()}</p>
                    <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p 
                    className={`min-w-2 h-2 rounded-full ${
                      order.status === "Delivered" 
                        ? "bg-green-500" 
                        : order.status === "Shipped" || order.status === "Out for delivery"
                        ? "bg-blue-500"
                        : order.status === "Packing"
                        ? "bg-yellow-500"
                        : "bg-gray-400"
                    }`}
                  ></p>
                  <p className="text-sm md:text-base font-medium">{order.status}</p>
                </div>

                <button 
                  onClick={fetchOrders}
                  className="border px-4 py-2 dark:text-white text-black font-medium rounded-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  Refresh
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-6">No orders placed yet.</p>
        )}
      </div>
    </div>
  );
};

export default Order;