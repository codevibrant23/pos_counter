"use client"; // Important for Next.js App Router and Next UI

import React, { useState, useEffect } from "react";
import axios from "axios";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { IoMdClose } from "react-icons/io";
import { BiChevronDown } from "react-icons/bi";

export default function RequestStock() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState("");
  const [productList, setProductList] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [viewMode, setViewMode] = useState("list"); // "list" or "cards"

  // Fetch products from API
  useEffect(() => {
    if (searchQuery) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/counter/api/products?search=${searchQuery}`) // Replace with your API endpoint
        .then((response) => {
          if (!response.data.error) {
            const formattedProducts = response.data.products.flatMap((product) =>
              product.variants.length > 0
                ? product.variants.map((variant) => ({
                  id: variant.id,
                  name: variant.name,
                }))
                : [{ id: product.id, name: product.name }]
            );
            setProductList(formattedProducts);
          }
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }
  }, [searchQuery]);

  // Handle adding a product
  const handleAddProduct = (product) => {
    setSelectedProducts((prev) =>
      prev.some((p) => p.id === product.id)
        ? prev
        : [...prev, product]
    );
  };

  // Handle removing a product
  const handleRemoveProduct = (productId) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  // Handle submitting selected products (POST request)
  const handleRequestStock = () => {
    axios
      .post("/api/request-stock", { products: selectedProducts }) // Replace with your API endpoint
      .then((response) => {
        console.log("Stock requested successfully:", response.data);
        onOpenChange(false);
      })
      .catch((error) => {
        console.error("Error requesting stock:", error);
      });
  };

  return (
    <>
      <Button
        className="flex justify-between items-center w-full bg-white hover:bg-[var(--background)] text-black border-2 border-[#FF6600] rounded-[10px] px-0 pl-6 py-3 text-lg font-medium"
        onPress={onOpen}
        endContent={
          <div className="bg-[#FAAE62] rounded p-2">
            <ArrowCircleRightOutlinedIcon className="text-white" size={24} />
          </div>
        }
      >
        Request Stock
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton size="5xl" radius="sm">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-end gap-1">
                <Button color="primary" isIconOnly onClick={onClose}>
                  <IoMdClose size={20} strokeWidth={8} />
                </Button>
              </ModalHeader>
              <ModalBody className="flex flex-col gap-1">
                <div className="text-primary text-xl font-semibold">
                  Products
                </div>
                <Input
                  name="products"
                  radius="sm"
                  type="text"
                  color="primary"
                  size="lg"
                  variant="bordered"
                  placeholder="Search for products"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                  classNames={{
                    label: "text-lg",
                    inputWrapper: "py-8 border-primary placeholder:text-gray-900",
                  }}
                  endContent={<BiChevronDown className=" text-primary" size={40} />}
                />

                {/* View toggle */}
                <div className="flex justify-end mt-4">
                  <Button
                    size="sm"
                    onPress={() => setViewMode(viewMode === "list" ? "cards" : "list")}
                    className="rounded-md bg-primary-500 text-white"
                  >
                    {viewMode === "list" ? "Show Cards" : "Show List"}
                  </Button>
                </div>

                {/* Product display */}
                <div className="flex-grow w-full rounded-md min-h-72 mt-3">
                  {viewMode === "list" ? (
                    <ul className="list-disc ml-5">
                      {productList.map((product) => (
                        <span
                          key={product.id}
                          className="cursor-pointer flex"
                          onClick={() => handleAddProduct(product)}
                        >
                          {product.name}
                        </span>
                      ))}
                    </ul>
                  ) : (
                    <div className="flex flex-wrap gap-3">
                      {productList.map((product) => (
                        <div
                          key={product.id}
                          className="bg-white w-32 h-20 text-sm rounded-xl text-black border border-gray-300 flex justify-center items-center p-2 cursor-pointer"
                          onClick={() => handleAddProduct(product)}
                        >
                          {product.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Selected products */}
                <div className="mt-4 flex flex-wrap gap-4">
                  {selectedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white w-32 h-20 rounded-xl text-white bg-gradient-to-t from-primary-500 to-primary-100 flex justify-between items-center p-2"
                    >
                      <div className="text-sm font-medium leading-tight">
                        {product.name}
                      </div>
                      <Button
                        className="bg-white"
                        isIconOnly
                        size="sm"
                        onClick={() => handleRemoveProduct(product.id)}
                      >
                        <IoMdClose size={15} strokeWidth={8} />
                      </Button>
                    </div>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-center">
                <Button
                  color="primary"
                  onPress={handleRequestStock}
                  className="w-64 rounded-2xl font-bold text-2xl"
                >
                  Request Stock
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
