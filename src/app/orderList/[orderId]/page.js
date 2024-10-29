import React from "react";
import Image from "next/image";
import Header from "@/components/Header";

const OrderDetails = ({ order }) => {
  // Determine the border color based on the status
  const borderColor =
    order.status === "Completed" ? "border-green-500" : "border-[#FF6600]";
  const buttonBgColor =
    order.status === "Completed"
      ? "bg-green-200 text-green-900"
      : "bg-orange-200 text-orange-900";

  return (
    <>
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
              value="Agasthya Verma"
              className={`w-full px-4 py-2 border ${borderColor} rounded-md focus:outline-none`}
              readOnly
            />
          </div>
          <div>
            <h4 className="text-[#FF6600] font-semibold mb-1">Contact No.</h4>
            <input
              type="text"
              value="+91 1234567890"
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
              <tr>
                <td className="py-2">01</td>
                <td className="py-2">Cheese Burger</td>
                <td className="py-2">Rs 120/-</td>
              </tr>
              <tr>
                <td className="py-2">01</td>
                <td className="py-2">Cheese Burger</td>
                <td className="py-2">Rs 120/-</td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-end mt-4 pr-4 gap-3">
            <h4 className="text-green-600 font-semibold text-lg">Subtotal:</h4>
            <h4 className="text-green-600 font-semibold text-lg">Rs. 240/-</h4>
          </div>
        </div>
      </div>
    </>
  );
};

// Example order object to pass to the component
const order = {
  id: "123456",
  date: "17 May 24",
  status: "Completed", // Change this to 'Completed' to see the different border color
};

export default function App() {
  return <OrderDetails order={order} />;
}
