"use client"
import Header from "@/components/Header";
import { Search } from "@mui/icons-material";
import Image from "next/image";
import React, { useState } from "react";

const orders = [
  { id: "123456", date: "17 May 24", status: "Completed" },
  { id: "789012", date: "17 May 24", status: "Pending" },
  { id: "345678", date: "17 May 24", status: "Completed" },
  { id: "901234", date: "17 May 24", status: "Completed" },
  { id: "567890", date: "17 May 24", status: "Completed" },
  { id: "234567", date: "17 May 24", status: "Completed" },
  { id: "890123", date: "17 May 24", status: "Completed" },
];

const OrderTable = () => {
  // Step 1: Add state to manage search input
  const [searchQuery, setSearchQuery] = useState("");

  // Step 2: Filter orders based on the search input (case-insensitive)
  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="w-full max-w-4xl mx-auto my-5 p-4 bg-[#fff9f2] border border-[#FF6600] rounded-lg">
      <div className="w-full max-w-4xl flex justify-end mb-5">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-[#FF6600]" />
          </div>
          {/* Step 3: Update the input to handle the search */}
          <input
            type="text"
            placeholder="Search order no."
            value={searchQuery} // Bind the search input to state
            onChange={(e) => setSearchQuery(e.target.value)} // Update the state on input change
            className="w-full pl-10 pr-4 py-2 border border-[#FF6600] rounded-full bg-white text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent"
          />
        </div>
      </div>
        <table className="min-w-full text-center">
          <thead className="border-b border-[#FF6600] last:border-b-0">
            <tr>
              <th className="text-center text-[#FF6600] font-bold py-2">
                Order ID
              </th>
              <th className="text-center text-[#FF6600] font-bold py-2">
                Order Date
              </th>
              <th className="text-center text-[#FF6600] font-bold py-2">
                Order Status
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Step 4: Map the filtered orders to display them */}
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, index) => (
                <tr key={index} className="border-0">
                  <td className="py-4 font-semibold">{order.id}</td>
                  <td className="py-4 font-semibold">{order.date}</td>
                  <td className="py-4 flex align-center justify-center">
                    <button
                      className={`${
                        order.status === "Completed"
                          ? "bg-green-200 text-green-900"
                          : "bg-orange-200 text-orange-900"
                      } rounded-full p-3 text-sm font-semibold flex flex-row gap-3  w-[120px] justify-between`}
                    >
                      {order.status}
                      <Image
                        src={"/media/right.svg"}
                        width={20}
                        height={20}
                        alt="arrow"
                      />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              // Step 5: Show message if no orders match the search
              <tr>
                <td colSpan="3" className="py-4 font-semibold text-red-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderTable;
