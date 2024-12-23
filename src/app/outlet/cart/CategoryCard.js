"use client";

import { useRouter } from "next/navigation";
import React from "react";
import styles from "@/styles/cart.module.css";

export default function AllCategory({ isActive }) {
  const router = useRouter();
  const handleAll = () => {
    const { origin, pathname } = window.location;
    router.push(pathname);
  };
  return (
    <div
      className={`${styles.categoryCard} ${
        isActive ? styles.activeCategory : ""
      }`}
      onClick={handleAll}
    >
      <div className="text-lg font-medium">All</div>
    </div>
  );
}
