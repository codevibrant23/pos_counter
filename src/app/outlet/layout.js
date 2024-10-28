import Header from "@/components/Header";
import React from "react";

export default function LAYOUT({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
