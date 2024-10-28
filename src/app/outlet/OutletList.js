"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function OutletList({ outlets }) {
  const router = useRouter();
  return (
    <div className="flex flex-wrap justify-center w-full gap-10 my-10 items-center min-h-[85vh] p-6">
      {outlets.map((outlet, index) => (
        <div
          key={index}
          onClick={() => router.push("/outlet/cart")}
          className="p-5 shadow-sm flex flex-col justify-end bg-[#FFF] w-[130px] md:w-[180px] lg:w-[250px] h-[120px] md:h-[200px] lg:h-[180px] relative rounded-[30px] mx-1 my-2 hover:border border-primary cursor-pointer"
        >
          <Image
            className="w-[80px] md:w-[150px] lg:w-[160px] absolute top-[-15%] left-[-10%]"
            src={outlet.logo} 
            width={500}
            height={500}
            alt={outlet.title}
          />
          <p className="text-[#FF6600] font-bold text-xl">{outlet.title}</p>{" "}
        </div>
      ))}
    </div>
  );
}
