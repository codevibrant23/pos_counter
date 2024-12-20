"use client";

import { useRouter } from "next/navigation";
import React from "react";
import styles from "@/styles/cart.module.css";

export default function CategoryCard({ isActive, category }) {
  const router = useRouter();
  const handleCategoryClick = () => {
    // Update query parameter in the URL
    router.push(`?s=${category}`);
  };

  return (
    <div
      className={`${styles.categoryCard} ${
        isActive ? styles.activeCategory : ""
      }`}
      onClick={handleCategoryClick}
    >
      <div className="text-lg font-medium">{category}</div>
    </div>
  );
}
export function AllCategory({ isActive }) {
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
