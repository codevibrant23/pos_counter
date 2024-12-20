"use client";

import React, { useState } from "react";
import ProductCard from "./ProductCard";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  RadioGroup,
  Radio,
  VisuallyHidden,
  useRadio,
  cn,
} from "@nextui-org/react";
import { useCart } from "@/lib/Context/CartContext";

export default function Products({ productData }) {
  const { addItem } = useCart();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState();

  const handleItem = (data) => {
    if (data.variants && data.variants.length > 0) {
      setSelectedItem(data);
      onOpen();
    } else {
      addItem(data);
    }
  };
  return (
    <>
      <VariantsDialog
        isOpen={isOpen}
        data={selectedItem}
        onOpenChange={onOpenChange}
      />
      {productData.length > 0 ? (
        productData.map((d, i) => (
          <ProductCard data={d} key={i} onClick={() => handleItem(d)} />
        ))
      ) : (
        <div>No products available</div>
      )}
    </>
  );
}

const VariantsDialog = ({ isOpen, onOpenChange, data }) => {
  const { cart, addItem, addQuantity, updateCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState();

  if (!data) return;

  const handleAddToCart = () => {
    if (selectedVariant === "none") {
      addItem(data);
    } else {
      const existingCartItem = cart.find(
        (i) => i.id === data.id && i.variant_id === selectedVariant.id
      );
      if (existingCartItem) {
        addQuantity(existingCartItem);
      } else {
        const cartItem = {
          id: data.id,
          name: data.name,
          category: data.category,
          gst_percent: data.gst_percent,
          image: data.image_url,
          quantity: 1,
          variant_id: selectedVariant.id,
          variant_name: selectedVariant.name,
          gst_inclusive: selectedVariant.is_gst_inclusive,
          price: selectedVariant.price,
        };
        updateCart([...cart, cartItem]);
      }
      setSelectedVariant();
    }
    onOpenChange();
  };
  return (
    <Modal
      isOpen={isOpen}
      placement="top-center"
      onOpenChange={onOpenChange}
      size="lg"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {data?.name}
            </ModalHeader>
            <ModalBody className="min-h-64">
              <RadioGroup
                color="warning"
                label="Select Variant"
                onValueChange={(value) => setSelectedVariant(value)}
              >
                {data?.variants?.map((v, index) => (
                  <CustomRadio key={index} description={v.price} value={v}>
                    {v.name}
                  </CustomRadio>
                ))}
              </RadioGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose} size="lg">
                Cancel
              </Button>
              <Button
                size="lg"
                color="primary"
                onPress={handleAddToCart}
                isDisabled={!selectedVariant}
              >
                Continue
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export const CustomRadio = (props) => {
  const {
    Component,
    children,
    description,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
    getControlProps,
  } = useRadio(props);

  return (
    <Component
      {...getBaseProps()}
      className={cn(
        "group inline-flex items-center hover:opacity-80 active:opacity-50 justify-between flex-row-reverse tap-highlight-transparent",
        "cursor-pointer border border-default rounded-lg gap-4 p-4",
        "data-[selected=true]:border-primary"
      )}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <span {...getWrapperProps()}>
        <span {...getControlProps()} />
      </span>
      <div {...getLabelWrapperProps()}>
        {children && <span {...getLabelProps()}>{children}</span>}
        {description && (
          <span className="text-small text-foreground opacity-70">
            {description}
          </span>
        )}
      </div>
    </Component>
  );
};
