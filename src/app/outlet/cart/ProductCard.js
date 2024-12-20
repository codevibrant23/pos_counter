import React from "react";

const ProductCard = ({ data, onClick }) => {
  const { id, name, price, image_url, description } = data;

  return (
    <div
      className="flex flex-col items-center justify-center cursor-pointer flex-shrink-0 w-48 sm:w-52 md:w-60 xl:w-64 bg-gradient-to-b from-primary-50 to-primary-100 rounded-3xl shadow-inset-custom p-4 md:py-5 px-2 text-center"
      onClick={onClick}
    >
      <div className="text-primary font-bold text-md md:text-lg">{name}</div>
      {/* <div className="text-sm md:text-base text-gray-600 mb-3 flex-grow line-clamp-2">
        {description}
      </div> */}

      <div className="flex justify-between mt-2 text-sm md:text-base font-medium">
        <div>Rs. {price}/-</div>
      </div>
    </div>
  );
};

export default ProductCard;
