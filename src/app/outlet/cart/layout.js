import { CartProvider } from "@/lib/Context/CartContext";
import React from "react";

export default function layout({ children }) {
  return <CartProvider>{children} </CartProvider>;
}
