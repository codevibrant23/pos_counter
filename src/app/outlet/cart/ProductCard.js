import React from "react";

const ProductCard = ({ data, onClick }) => {
  const { id, name, price, image_url, description } = data;

  return (
    <div
      className="cursor-pointer flex-shrink-0 w-48 sm:w-52 md:w-60 xl:w-64 bg-gradient-to-b from-primary-50 to-primary-100 rounded-3xl shadow-inset-custom p-4 md:p-5 text-center"
      onClick={onClick}
    >
      {/* Product Image */}
      {/* {image_url ? (
        <div className="mb-4">
          <img
            src={image_url}
            alt={name}
            className="mx-auto rounded-xl object-cover w-24 h-24 md:w-28 md:h-28"
          />
        </div>
      ) : (
        <div className="mb-4 bg-gray-200 w-24 h-24 md:w-28 md:h-28 rounded-xl mx-auto flex items-center justify-center">
          <span className="text-gray-400 text-xs">No Image</span>
        </div>
      )} */}

      {/* Product Details */}
      <div className="text-primary font-bold text-lg md:text-xl">{name}</div>
      <div className="text-sm md:text-base text-gray-600 mb-3">
        {description}
      </div>

      {/* Price */}
      <div className="flex justify-between mt-2 text-sm md:text-base font-medium">
        <div>Rs. {price}/-</div>
      </div>
    </div>
  );
};

export default ProductCard;
