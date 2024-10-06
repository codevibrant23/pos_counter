import Header from "@/components/Header";
import Image from "next/image";
import React from "react";

const outlets = [
  {
    logo: "/media/img.png",
    title: "Mumbai",
  },
  {
    logo: "/media/img.png",
    title: "Delhi",
  },
  {
    logo: "/media/img.png",
    title: "Bangalore",
  },
  {
    logo: "/media/img.png",
    title: "Mumbai",
  },
  {
    logo: "/media/img.png",
    title: "Delhi",
  },
  {
    logo: "/media/img.png",
    title: "Bangalore",
  },
  {
    logo: "/media/img.png",
    title: "Mumbai",
  },
  {
    logo: "/media/img.png",
    title: "Delhi",
  },
  {
    logo: "/media/img.png",
    title: "Bangalore",
  },
  {
    logo: "/media/img.png",
    title: "Mumbai",
  },
  {
    logo: "/media/img.png",
    title: "Delhi",
  },
  {
    logo: "/media/img.png",
    title: "Bangalore",
  },
];

export default function Page() {
  return (
    <>
      {/* <div>Select Outlets</div> */}
      <Header />
      <section className="flex justify-center">
        <div
          style={{ width: "90%" }}
          className="flex flex-wrap justify-center gap-10 md:gap-10 lg:gap-20 my-10"
        >
          {" "}
          {outlets.map((outlet, index) => (
            <div
              key={index}
              className="p-5 flex flex-col justify-end bg-[#FFF] w-[130px] md:w-[180px] lg:w-[250px] h-[120px] md:h-[200px] lg:h-[180px] relative rounded-[30px] mx-1 my-2"
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
      </section>
    </>
  );
}
