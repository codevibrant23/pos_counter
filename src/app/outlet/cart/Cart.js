"use client";

import React, { useRef, useState } from "react";
import {
  Button,
  Card,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spacer,
  useDisclosure,
} from "@nextui-org/react";
import { IoReceiptOutline } from "react-icons/io5";
import CartItem from "./CartItem";
import { useCart } from "@/lib/Context/CartContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import { postOrder, printKOT } from "@/lib/actions";
import usePrintJS from "@/lib/Hooks/PrintHook";
import EmptyCartIcon from "./EmptyCartIcon";
import { useRouter } from "next/navigation";

const modeBtnStyles =
  "bg-primary-100 text-white font-bold hover:text-black active:text-black hover:bg-primary active:bg-primary border border-primary rounded-lg";

export default function Cart() {
  const handlePrint = usePrintJS();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const formInit = {
    name: "",
    phone_number: "",
    payment_mode: "coupon",
  };
  const [formValues, setFormValues] = useState(formInit);
  const payment_modes = [{ key: "coupon", label: "Coupon" }];

  // const {
  //   cart: cartItems,
  //   addToCart,
  //   totalAmount,
  //   removeFromCart,
  //   clearCart,
  // } = useCart();

  const {
    cart: cartItems,
    removeItem,
    addQuantity,
    updateCart,
    totalAmount,
    clearCart,
  } = useCart();

  const handleRemove = (item) => {
    const { id, variant_id } = item;
    removeItem(id, variant_id);
  };

  const decrementQuantity = (item) => {
    const { id, variant_id, quantity } = item;
    const newQuantity = quantity - 1;
    updateCart(
      cartItems.map((cartItem) => {
        // Case 1: If there's a variant, match both id and variant_id
        if (variant_id !== null) {
          return cartItem.id === id && cartItem.variant_id === variant_id
            ? { ...cartItem, quantity: Math.max(0, newQuantity) }
            : cartItem;
        }

        // Case 2: No variant, match only by id
        return cartItem.id === id && !cartItem.variant_id
          ? { ...cartItem, quantity: Math.max(0, newQuantity) }
          : cartItem;
      })
    );
  };

  const incrementQuantity = (item) => {
    addQuantity(item);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderData = {
      customer: {
        name: formValues.name || "Heritage",
        phone_number: formValues.phone_number || "9999999999",
      },
      mode: formValues.payment_mode,
      address: "Heritage School Sec-62, Gurugram, Haryana",
      items: cartItems.map((item) => {
        if (item.variant_id) {
          return { product_variant: item.variant_id, quantity: item.quantity };
        } else return { product: item.id, quantity: item.quantity };
      }),
    };

    try {
      await postOrder(orderData).then((res) => {
        // console.log(res);
        if (res?.error) {
          console.error("Order failed:", res.detail);
          alert(`Order failed: ${res.detail}`);
        } else {
          handlePrint(res)
            .then(() => {
              return printKOT();
            })
            .then((res) => {
              // console.log(res);
              if (res?.error) {
                console.error("KOT Post failed:", res.detail);
                alert(`KOT Post failed: ${res.detail}`);
              } else {
                handlePrint(res).then(() => {
                  handleClear();
                });
              }
            });
        }
        setError(null);
        setLoading(false);
      });
    } catch (error) {
      console.error("Error placing order:", error);
      alert(
        "An unexpected error occurred while placing the order. Please try again."
      );
    }
  };
  const handleClear = () => {
    setFormValues(formInit);
    setError(false);
    setLoading(false);
    clearCart();
    const { origin, pathname } = window.location;
    router.push(pathname);
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4 text-white flex justify-between align-center w-full">
        Cart
        {cartItems.length > 0 && (
          <Button Button variant="ghost" color="danger" onClick={clearCart}>
            Clear <RiDeleteBin6Line />
          </Button>
        )}
      </h2>

      {/* <div className="flex gap-2 py-2 flex-wrap">
        {["Dine-In", "Takeaway", "Delivery"].map((mode) => (
          <Button
            key={mode}
            onClick={() => setSelectedMode(mode)}
            className={`${
              selectedMode === mode
                ? "bg-primary text-black font-semibold"
                : modeBtnStyles
            }`}
          >
            {mode}
          </Button>
        ))}
      </div> */}

      <div
        className="my-2 overflow-y-auto flex-grow"
        style={{ maxHeight: "calc(100vh - 300px)" }}
      >
        {cartItems.length > 0 ? (
          cartItems.map((cartItem, i) => (
            <CartItem
              data={cartItem}
              key={i}
              onAdd={() => incrementQuantity(cartItem)}
              onRemove={() => decrementQuantity(cartItem)}
              itemDelete={() => handleRemove(cartItem)}
            />
          ))
        ) : (
          <div className="flex w-full h-72 items-center justify-center flex-col text-center text-gray-500">
            <EmptyCartIcon className="w-12 h-12" />
            <p className="text-lg font-medium mt-10">No Items in Cart !</p>
            <p className="text-sm mt-2">
              The cart is empty. Add items to see them here.
            </p>
          </div>
        )}
      </div>

      <div className="text-black font-bold text-xl flex justify-between items-center mb-2">
        <div className="flex gap-4 items-center">
          <IoReceiptOutline size={32} />
          <div>Total</div>
        </div>
        <div>Rs. {totalAmount.toFixed(2)}</div>
      </div>
      <Divider className="border-gray-300" />
      <Spacer y={2} />

      <Card className="px-6 py-4">
        <Select
          label="Payment Mode"
          items={payment_modes}
          // value={formValues.mode}
          // defaultSelectedKeys={["coupon"]}
          // onChange={(e) =>
          //   setFormValues({ ...formValues, payment_mode: e.target.value })
          // }
          // fullWidth
          variant="bordered"
          // aria-label="payment_mode"
          classNames={{
            mainWrapper:
              "border-primary rounded-lg placeholder:text-gray-400 text-gray-800 shadow-sm focus:ring-2 focus:ring-primary focus:border-primary",
          }}
        >
          {(m) => <SelectItem>{m.label}</SelectItem>}
        </Select>
      </Card>
      <Spacer y={2} />

      <form
        onSubmit={handleSubmit}
        className="space-y-2 p-6 bg-white rounded-2xl shadow-lg border border-gray-200"
      >
        {/* <div className="flex justify-center gap-4 px-4 items-center mb-6">
          <PersonIcon strokeWidth={0.1} size={20} className="text-primary" />
          <h2 className="text-2xl font-semibold text-gray-800">
            Personal Details
          </h2>
        </div> */}
        {/* Name Field */}
        <div className="form-group">
          <label htmlFor="name" className="text-base font-medium text-gray-800">
            Name
          </label>
          <Input
            id="name"
            name="name"
            value={formValues.name}
            onChange={(e) =>
              setFormValues({ ...formValues, name: e.target.value })
            }
            placeholder="Enter your name"
            fullWidth
            variant="bordered"
            aria-label="name"
            classNames={{
              inputWrapper:
                "py-4 px-4 border-primary rounded-lg placeholder:text-gray-400 text-gray-800 shadow-sm focus:ring-2 focus:ring-primary focus:border-primary",
            }}
          />
        </div>

        {/* Phone Number Field */}
        <div className="form-group">
          <label
            htmlFor="phone_number"
            className="text-base font-medium text-gray-800"
          >
            Phone Number
          </label>
          <Input
            id="phone_number"
            type="number"
            name="phone_number"
            value={formValues.phone_number}
            onChange={(e) =>
              setFormValues({ ...formValues, phone_number: e.target.value })
            }
            placeholder="Enter your phone number"
            fullWidth
            variant="bordered"
            aria-label="phone_number"
            classNames={{
              inputWrapper:
                "py-4 px-4 border-primary rounded-lg placeholder:text-gray-400 text-gray-800 shadow-sm focus:ring-2 focus:ring-primary focus:border-primary",
            }}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            type="submit"
            auto
            color="primary"
            className="w-full py-3 text-lg font-semibold text-white bg-primary rounded-lg shadow-md focus:ring-2 focus:ring-primary focus:outline-none transition-colors duration-150 disabled:opacity-50"
            isLoading={loading}
            isDisabled={cartItems.length === 0}
          >
            Place Order
          </Button>
          <Button
            type="button"
            auto
            color="primary"
            variant="bordered"
            className="w-full py-3 text-lg font-semibold text-primary border-primary bg-white rounded-lg shadow-md hover:bg-primary-50 focus:ring-2 focus:ring-primary focus:outline-none transition-colors duration-150"
            onClick={handleClear}
            isDisabled={loading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
}

// const ConfirmModal = ({
//   isOpen,
//   onOpenChange,
//   amount,
//   placeOrder,
//   cancelOrder,
//   loading,
// }) => {
//   const [paymentMethod, setPaymentMethod] = useState("coupon"); // Default to 'coupon'
//   return (
//     <Modal
//       isOpen={isOpen}
//       placement="top-center"
//       onOpenChange={onOpenChange}
//       size="lg"
//       isDismissable={false}
//       isKeyboardDismissDisabled={true}
//       onClose={cancelOrder}
//     >
//       <ModalContent>
//         {(onClose) => (
//           <>
//             <ModalHeader className="flex flex-col gap-2 text-center">
//               <h2 className="text-2xl font-bold text-gray-800">Place Order</h2>
//             </ModalHeader>
//             <ModalBody className="min-h-64 p-6">
//               {/* Payment Method Section */}
//               <div className="mb-3">
//                 <div className="text-lg font-semibold text-gray-700 mb-3">
//                   Payment Method
//                 </div>
//                 <div className="flex gap-4">
//                   <div
//                     className={`cursor-pointer border rounded-lg h-14 w-44 flex items-center justify-center text-base font-medium ${
//                       paymentMethod === "coupon"
//                         ? "bg-primary text-white border-primary"
//                         : "bg-white text-gray-700 border-gray-300 hover:border-primary"
//                     }`}
//                     onClick={() => setPaymentMethod("coupon")}
//                   >
//                     Coupon
//                   </div>
//                   {/* <div
//                     className={`cursor-pointer border rounded-lg h-14 w-44 flex items-center justify-center text-base font-medium ${
//                       paymentMethod === "card"
//                         ? "bg-primary text-white border-primary"
//                         : "bg-white text-gray-700 border-gray-300 hover:border-primary"
//                     }`}
//                     onClick={() => setPaymentMethod("card")}
//                   >
//                     Card
//                   </div>
//                   <div
//                     className={`cursor-pointer border rounded-lg h-14 w-44 flex items-center justify-center text-base font-medium ${
//                       paymentMethod === "cash"
//                         ? "bg-primary text-white border-primary"
//                         : "bg-white text-gray-700 border-gray-300 hover:border-primary"
//                     }`}
//                     onClick={() => setPaymentMethod("cash")}
//                   >
//                     Cash
//                   </div> */}
//                 </div>
//                 <div className="text-gray-500 text-sm my-2">
//                   *Only Coupon Payment mode available
//                 </div>
//               </div>

//               {/* Order Total Section */}
//               <div className="mb-4">
//                 <div className="text-lg font-semibold text-gray-700 mb-2">
//                   Order Total
//                 </div>
//                 <div className="text-3xl font-bold text-gray-800">
//                   Rs. {amount}
//                 </div>
//               </div>
//             </ModalBody>
//             <ModalFooter className="flex justify-end gap-4">
//               <Button
//                 size="lg"
//                 color="danger"
//                 variant="bordered"
//                 onPress={onClose}
//                 className="py-2 px-4 text-lg font-medium"
//               >
//                 Cancel Order
//               </Button>
//               <Button
//                 size="lg"
//                 color="primary"
//                 onPress={placeOrder}
//                 className="py-2 px-4 text-lg font-medium"
//                 loading={loading}
//               >
//                 Confirm Order
//               </Button>
//             </ModalFooter>
//           </>
//         )}
//       </ModalContent>
//     </Modal>
//   );
// };
