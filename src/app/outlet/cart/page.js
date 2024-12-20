"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Input,
  ScrollShadow,
  Spacer,
} from "@nextui-org/react";
import { IoReceiptOutline } from "react-icons/io5";
import axios from "axios";
import ProductCard from "./ProductCard";
import PersonIcon from "./PersonIcon";
import CartItem from "./CartItem";
import CategoryCard from "./CategoryCard";

const modeBtnStyles =
  "bg-primary-100 text-white font-bold hover:text-black active:text-black hover:bg-primary active:bg-primary border border-primary rounded-lg";

export default function Page() {
  const [categoriesData, setCategoriesData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [selectedMode, setSelectedMode] = useState(""); // Track the selected mode

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/counter/api/get-categories/`
        );
        if (!res.data.error) {
          setCategoriesData(res.data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/counter/api/products/`
        );
        if (!res.data.error) {
          setProductData(res.data.products);
        }
      } catch (error) {
        console.error("Error fetching Products:", error);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="px-6 flex gap-3 h-screen">
      <div className="w-1/2 md:w-2/3 xl:w-3/4 mt-10 mr-2">
        <div className="text-3xl">Categories</div>
        <ScrollShadow
          className="w-full h-36"
          hideScrollBar
          orientation="horizontal"
        >
          <div className="py-6 flex gap-3">
            {categoriesData.length > 0 ? (
              categoriesData.map((category, index) => (
                <CategoryCard data={category} key={index} />
              ))
            ) : (
              <div>No categories available</div>
            )}
          </div>
        </ScrollShadow>

        <div className="text-3xl mb-6">Burger</div>
        <ScrollShadow className="w-full flex-grow" hideScrollBar>
          <div className="flex flex-wrap gap-3">
            {productData.length > 0 ? (
              productData.map((d, i) => (
                <ProductCard data={d} key={i} onClick={() => addToCart(d)} />
              ))
            ) : (
              <div>No products available</div>
            )}
          </div>
        </ScrollShadow>
      </div>

      <div className="w-1/2 md:w-1/3 xl:w-1/4 p-5 py-7 bg-secondary rounded-3xl flex flex-col h-full">
        <h2 className="text-2xl font-semibold mb-4 text-white">Cart</h2>

        <div className="flex gap-2 py-2 flex-wrap">
          {["Dine-In", "Takeaway", "Delivery"].map((mode) => (
            <Button
              key={mode}
              onClick={() => setSelectedMode(mode)}
              className={`${
                selectedMode === mode ? "bg-primary text-black font-semibold" : modeBtnStyles
              }`}
            >
              {mode}
            </Button>
          ))}
        </div>

        <div
          className="my-4 overflow-y-auto flex-grow"
          style={{ maxHeight: "calc(100vh - 300px)" }}
        >
          {cartItems.length > 0 ? (
            cartItems.map((cartItem, i) => (
              <CartItem
                data={cartItem}
                key={i}
                onAdd={() => addToCart(cartItem)}
                onRemove={() => removeFromCart(cartItem.id)}
              />
            ))
          ) : (
            <div>No items in the cart</div>
          )}
        </div>

        <div className="text-black font-bold text-xl flex justify-between items-center mb-4">
          <div className="flex gap-3 items-center">
            <IoReceiptOutline size={30} />
            <div>Total</div>
          </div>
          <div>Rs. {totalAmount.toFixed(2)}</div>
        </div>
        <Divider />
        <Spacer y={5} />

        <div className="flex justify-center gap-4 px-3 items-center mb-4">
          <PersonIcon strokeWidth={0.1} />
          <h2 className="text-xl font-bold">Personal Details</h2>
        </div>

        <form>
          <div className="form-group">
            <Input
              label="Name"
              labelPlacement="outside"
              placeholder="Enter your name"
              fullWidth
              variant="bordered"
              aria-label="name"
              classNames={{
                inputWrapper: "py-5 border-black placeholder:text-gray-900",
              }}
            />
          </div>

          <Spacer y={2} />

          <div className="form-group">
            <Input
              label="Phone Number"
              labelPlacement="outside"
              placeholder="Enter your phone number"
              fullWidth
              variant="bordered"
              aria-label="table-number"
              classNames={{
                inputWrapper: "py-5 border-black placeholder:text-gray-900",
              }}
            />
          </div>

          <Spacer y={1.5} />

          <div className="flex gap-2 pt-4">
            <Button
              type="submit"
              auto
              color="primary"
              className="text-xl font-medium flex-grow"
            >
              Place order
            </Button>
            <Button
              type="button"
              auto
              color="primary"
              variant="bordered"
              className="text-white text-xl font-medium flex-grow"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

const dummyData = Array.from({ length: 15 }, (_, index) => ({
  id: index + 1,
  name: `Item ${index + 1}`,
  count: Math.floor(Math.random() * 50) + 1, // Random number between 1 and 50
}));
const cartItems = [
  {
    id: 1,
    name: "Product 1",
    price: 25.99,
    quantity: 2,
    image: "https://via.placeholder.com/150", // Replace with actual image URL
  },
  {
    id: 2,
    name: "Product 2",
    price: 15.49,
    quantity: 1,
    image: "https://via.placeholder.com/150", // Replace with actual image URL
  },
  {
    id: 3,
    name: "Product 3",
    price: 45.0,
    quantity: 3,
    image: "https://via.placeholder.com/150", // Replace with actual image URL
  },
];

const dummyProductData = Array.from({ length: 35 }, (_, index) => ({
  id: index + 1,
  name: `Dish ${index + 1}`,
  price: (Math.random() * 50 + 10).toFixed(2), // Random price between $10 and $60
  preparationTime: `${Math.floor(Math.random() * 60) + 10} mins`, // Random time between 10 to 70 mins
  isVeg: Math.random() < 0.5, // Randomly assign true or false
  available: Math.random() < 0.8, // 80% chance of being available
}));
