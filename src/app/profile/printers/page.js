"use client";

import React from "react";

const printers = Array(12)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    name: "Printer 1",
    ipAddress: "192.168.1.100",
    type: "Laser",
    form: "Single-sided",
  }));

export default function Component() {
  return (
    <div className="p-10 bg-white m-10 border-2 border-orange-500 rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 ">
        {printers.map((printer) => (
          <div
            key={printer.id}
            className="border-2 border-orange-500 rounded-lg p-4"
          >
            <h2 className="text-2xl font-bold text-orange-500 mb-4 text-center">
              {printer.name}
            </h2>
            <div className="space-y-2 font-bold">
            <div className="flex justify-between">
                <span className="text-orange-500">IP Address</span>
                <span>{printer.ipAddress}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-orange-500">Type</span>
                <span>{printer.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-orange-500">Form</span>
                <span>{printer.form}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
