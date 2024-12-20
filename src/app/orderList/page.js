"use client";

import { Search } from "@mui/icons-material";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const OrderTable = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const [outletId, setOutletId] = useState();
  const [orders, setOrders] = useState([]);

  // Step 2: Filter orders based on the search input (case-insensitive)
  const filteredOrders =
    orders.length > 0
      ? orders.filter((order) =>
          order.id.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Retrieve outlet ID from cookies
        const userDetails = Cookies.get("userDetails");
        console.log(userDetails, "sfsd");
        // Parse the user details and extract outlet ID
        const parsedUserDetails = userDetails ? JSON.parse(userDetails) : null;
        const outletId = parsedUserDetails?.outletId;
        // Check if outletId exists before making the API call
        if (outletId) {
          setOutletId(outletId);

          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/counter/api/orders/${outletId}/get-orders/`
          );

          if (!res.data.error) {
            setOrders(res.data.orders);
          }
        }
      } catch (error) {
        console.error("Error fetching Orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;

    // Update URL with search query
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (searchValue) {
      current.set("search", searchValue);
    } else {
      current.delete("search");
    }

    // Update the URL without causing a full page reload
    const search = current.toString();
    const queryString = search ? `?${search}` : "";
    router.push(`${window.location.pathname}${queryString}`);
  };

  return (
    <>
      <div className="w-full max-w-6xl mx-auto my-5 p-4 bg-[#fff9f2] border border-[#FF6600] rounded-lg">
        <div className="w-full max-w-6xl flex justify-end mb-5">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-[#FF6600]" />
            </div>
            {/* Step 3: Update the input to handle the search */}
            <input
              type="text"
              placeholder="Search order no."
              value={searchQuery} // Bind the search input to state
              onChange={handleSearchChange} // Update the URL with search query
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
                <tr
                  key={index}
                  className="border-0 cursor-pointer"
                  onClick={() =>
                    (window.location = `/orderList/order-${order.id}`)
                  }
                >
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
                  {orders.length === 0
                    ? "Loading orders..."
                    : "No orders found"}
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
