import React, { Suspense } from "react";
import { ScrollShadow } from "@nextui-org/react";
import ProductCard from "./ProductCard";
import { getCategories, getProducts } from "@/lib/fetch";
import Cart from "./Cart";
import CategoryCard, { AllCategory } from "./CategoryCard";
import Products from "./Products";

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
        <div className="mb-6">
          <div className="text-3xl">Menu</div>
          {!!searchParams.s && (
            <span className="text-lg text-gray-500">{searchParams.s}</span>
          )}
        </div>

        <Suspense fallback={<ProductSkeleton />}>
          <ProductSection category={searchParams.s} />
        </Suspense>
      </div>
      <div className="w-1/2 md:w-1/3 xl:w-1/4 p-5 py-7 bg-secondary rounded-3xl flex flex-col h-full">
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
          <CategoryCard
            category={category}
            isActive={activeCategory == category}
            key={index}
          />
        ))
      ) : (
        <div>No categories available</div>
      )}
    </div>
  );
};

const ProductSection = async ({ category }) => {
  const productData = await getProducts(category);
  return (
    <ScrollShadow className="w-full flex-grow" hideScrollBar>
      <div className="flex flex-wrap gap-3">
        <Products productData={productData} />
      </div>
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

const ProductSkeleton = () => (
  <ScrollShadow className="w-full flex-grow" hideScrollBar>
    <div className="flex flex-wrap gap-3">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="w-32 h-40 bg-gray-200 animate-pulse rounded-md"
        ></div>
      ))}
    </div>
  </ScrollShadow>
);
