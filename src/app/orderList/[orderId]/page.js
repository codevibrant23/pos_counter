"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Access the dynamic route parameter (orderId)
  const { orderId } = useParams();

  // Fetch order details using useEffect
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setIsLoading(true);
        // Make the API call with the orderId
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/counter/api/orders/${orderId}`
        );
        setOrder(response.data); // Assuming the API returns the order data directly
      } catch (err) {
        console.error("Error fetching order details:", err);
        setError("Failed to load order details.");
      } finally {
        setIsLoading(false);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  // Conditional rendering based on loading and error states
  if (isLoading) {
    return (
      <div className="text-center text-gray-500 font-semibold">
        Loading order details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 font-semibold">{error}</div>
    );
  }

  if (!order) {
    return (
      <div className="text-center text-gray-500 font-semibold">
        Order not found.
      </div>
    );
  }

  // Determine the border color based on the status
  const borderColor =
    order.status === "Completed" ? "border-green-500" : "border-[#FF6600]";
  const buttonBgColor =
    order.status === "Completed"
      ? "bg-green-200 text-green-900"
      : "bg-orange-200 text-orange-900";

  return (
    <div
      className={`max-w-4xl mx-auto bg-[#fff9f2] border ${borderColor} rounded-lg p-6`}
    >
      {/* Order Info Section */}
      <div className="grid grid-cols-3 gap-4 text-center pb-4 mb-6">
        <div>
          <h3 className="text-[#FF6600] font-bold">Order ID</h3>
          <p className="font-semibold">{order.id}</p>
        </div>
        <div>
          <h3 className="text-[#FF6600] font-bold">Order Date</h3>
          <p className="font-semibold">{order.date}</p>
        </div>
        <div>
          <h3 className="text-[#FF6600] font-bold">Order Status</h3>
          <button
            className={`${buttonBgColor} rounded-full px-6 py-2 font-semibold flex items-center justify-center w-full max-w-[150px] mx-auto`}
          >
            {order.status}
            <Image
              src="/media/right.svg"
              width={20}
              height={20}
              alt={order.status}
            />
          </button>
        </div>
      </div>

      {/* Customer Info Section */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h4 className="text-[#FF6600] font-semibold mb-1">Name</h4>
          <input
            type="text"
            value={order.customerName}
            className={`w-full px-4 py-2 border ${borderColor} rounded-md focus:outline-none`}
            readOnly
          />
        </div>
        <div>
          <h4 className="text-[#FF6600] font-semibold mb-1">Contact No.</h4>
          <input
            type="text"
            value={order.contactNumber}
            className={`w-full px-4 py-2 border ${borderColor} rounded-md focus:outline-none`}
            readOnly
          />
        </div>
      </div>

      {/* Order Items Section */}
      <div className={`border ${borderColor} rounded-md p-4 bg-white`}>
        <table className="min-w-full text-center">
          <thead>
            <tr className="border-b border-[#FF6600]">
              <th className="text-[#FF6600] font-semibold py-2">Quantity</th>
              <th className="text-[#FF6600] font-semibold py-2">Items</th>
              <th className="text-[#FF6600] font-semibold py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={index}>
                <td className="py-2">{item.quantity}</td>
                <td className="py-2">{item.name}</td>
                <td className="py-2">Rs {item.price}/-</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-4 pr-4 gap-3">
          <h4 className="text-green-600 font-semibold text-lg">Subtotal:</h4>
          <h4 className="text-green-600 font-semibold text-lg">
            Rs. {order.subtotal}/-
          </h4>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
