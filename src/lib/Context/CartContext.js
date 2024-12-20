"use client";

import React, { createContext, useContext, useState } from "react";

// Cart Context
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    setCart((prevCart) => {
      // Check if the item with the same id (ignoring variants) already exists in the cart
      const existingItem = prevCart.find(
        (cartItem) => cartItem.id === item.id && !cartItem.variant_id
      );

      if (existingItem) {
        // Update quantity if the same product without a variant is already in the cart
        return prevCart.map((cartItem) =>
          cartItem.id === item.id && !cartItem.variant_id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // If the product does not exist, add it as a new item (without any variant)
        const { variants, ...other } = item;
        return [...prevCart, { ...other, quantity: 1 }];
      }
    });
  };

  const addQuantity = (item) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) => {
        // Check if the item has a variant
        if (item.variant_id) {
          // Increment quantity only if both id and variant_id match
          return cartItem.id === item.id &&
            cartItem.variant_id === item.variant_id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem;
        } else {
          if (cartItem.variant_id) {
            return cartItem;
          }
          // If no variant, increment quantity based on id only
          return cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem;
        }
      })
    );
  };

  const removeItem = (id, variant_id = null) => {
    setCart((prevCart) =>
      prevCart.filter((item) => {
        // If a variant_id is provided, check for both id and variant_id
        if (variant_id) {
          return !(item.id === id && item.variant_id === variant_id);
        }
        // If no variant_id, only remove items without variants that match the id
        return !(item.id === id && !item.variant_id);
      })
    );
  };

  const updateCart = (item) => {
    setCart(item);
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        addQuantity,
        removeItem,
        updateCart,
        clearCart,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
