import React, { Suspense } from "react";
import { Card, ScrollShadow, Skeleton } from "@nextui-org/react";
import ProductCard from "./ProductCard";
import { getCategories, getProducts } from "@/lib/fetch";
import Cart from "./Cart";
import Products from "./Products";
import Link from "next/link";
import styles from "@/styles/cart.module.css";
import AllCategory from "./CategoryCard";

export default async function Page({ searchParams }) {
  return (
    <div className="px-6 flex gap-3 h-[90vh]">
      <div className="w-1/2 md:w-2/3 xl:w-3/4 mt-6 mr-2 overflow-auto">
        <div className="text-3xl">Categories</div>
        <ScrollShadow
          className="w-full h-36"
          hideScrollBar
          orientation="horizontal"
        >
          <Suspense fallback={<CategorySkeleton />}>
            <Categories activeCategory={searchParams.s} />
          </Suspense>
        </ScrollShadow>

        <Suspense fallback={<ProductSkeleton />}>
          <ProductSection category={searchParams.s} />
        </Suspense>
      </div>
      <div className="w-1/2 md:w-1/3 xl:w-1/4 p-5 bg-secondary rounded-3xl flex flex-col h-full">
        <Cart />
      </div>
    </div>
  );
}

const Categories = async ({ activeCategory }) => {
  const categoriesData = await getCategories();
  return (
    <div className="py-6 flex gap-3">
      <AllCategory isActive={!activeCategory} />
      {categoriesData?.length > 0 ? (
        categoriesData?.map((category, index) => (
          <Link
            href={`?s=${category}`}
            className={`${styles.categoryCard} ${
              activeCategory == category ? styles.activeCategory : ""
            }`}
            key={index}
          >
            <div className="text-lg font-medium">{category}</div>
          </Link>
        ))
      ) : (
        <div>No categories available</div>
      )}
    </div>
  );
};

const ProductSection = async () => {
  const productData = await getProducts();

  return (
    <ScrollShadow className="w-full flex-grow" hideScrollBar>
      <Products productData={productData} />
    </ScrollShadow>
  );
};

const CategorySkeleton = () => (
  <div className="py-6 flex gap-3">
    {[...Array(5)].map((_, index) => (
      <div
        key={index}
        className="w-24 h-24 bg-gray-200 animate-pulse rounded-md"
      ></div>
    ))}
  </div>
);

export const ProductSkeleton = () => (
  <div className="flex flex-wrap gap-3 w-full flex-grow">
    {[...Array(5)].map((_, index) => (
      <Card key={index}>
        <div
          className="w-[250px] space-y-6 p-4 flex flex-col items-center shadow-none"
          radius="lg"
          key={index}
        >
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-3 w-2/5 rounded-lg bg-default-300" />
          </Skeleton>
        </div>
      </Card>
    ))}
  </div>
);
