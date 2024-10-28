import Header from "@/components/Header";
import Image from "next/image";
import React from "react";
import OutletList from "./OutletList";

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
      <section>
        <OutletList outlets={outlets} />
      </section>
    </>
  );
}
