import React from "react";
import styles from "@/styles/cart.module.css";
import {
  Button,
  Divider,
  input,
  Input,
  ScrollShadow,
  Spacer,
} from "@nextui-org/react";
import { BiMinus, BiPlus } from "react-icons/bi";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoReceiptOutline } from "react-icons/io5";

const modeBtnStyles =
  "bg-primary-100 text-white font-bold hover:text-black active:text-black hover:bg-primary active:bg-primary border border-primary rounded-lg";

export default function page() {
  return (
    <div className="px-6 flex">
      <div className="w-3/4 mt-10 mr-2">
        <div className="text-3xl">Categories</div>
        <ScrollShadow
          className="w-full h-36"
          hideScrollBar
          orientation="horizontal"
        >
          {/* Adjust height as needed */}
          <div className="py-6 flex gap-3">
            {dummyData.map((d, i) => (
              <CategoryCard data={d} key={i} />
            ))}
          </div>
        </ScrollShadow>

        <div className="text-3xl mb-6">Burger</div>
        {/* Product Cards Container */}
        <div
          className=" flex flex-wrap gap-3 overflow-y-auto flex-grow"
          style={{ maxHeight: "calc(100vh - 380px)", minHeight: "300px" }}
        >
          {/* Set max height and overflow */}
          {dummyProductData.map((d, i) => (
            <ProductCard data={d} key={i} />
          ))}
        </div>
      </div>

      <div className="w-1/4 p-5 py-7 bg-secondary rounded-3xl flex flex-col">
        <h2 className="text-2xl font-semibold mb-4 text-white">Cart</h2>

        <div className="flex gap-2 py-2">
          <Button className={modeBtnStyles}>Dine-In</Button>
          <Button className={modeBtnStyles}>Takeaway</Button>
          <Button className={modeBtnStyles}>Delivery</Button>
        </div>
        {/* Cart Items Container */}
        <div
          className="my-4 overflow-y-auto flex-grow"
          style={{ maxHeight: "calc(100vh - 300px)" }}
        >
          {/* Adjust max-height as needed */}
          {cartItems.length > 0 ? (
            cartItems.map((cartItem,i) => <CartItem data={cartItem} key={i} />)
          ) : (
            <div>No items in the cart</div> // Show message if cart is empty
          )}
        </div>
        <div className="text-black font-bold text-xl flex justify-between items-center mb-4">
          <div className="flex gap-3 items-center">
            <IoReceiptOutline size={30} />
            <div>Total</div>
          </div>
          <div>Rs. 220</div>
        </div>
        <Divider />
        <Spacer y={5} />
        <div className="flex justify-center gap-4 px-3 items-center mb-4">
          <PersonIcon strokeWidth={0.1} />
          <h2 className="text-xl font-bold ">Personal Details</h2>
        </div>
        <form>
          <div className="form-group">
            <Input
              // color="primary"
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
              // color="primary"
              label="Table Number"
              labelPlacement="outside"
              placeholder="Enter your table number"
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
              type="submit"
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
const CategoryCard = ({ data }) => {
  const { name, count } = data;
  return (
    <div className={styles.categoryCard}>
      <div className="text-lg font-medium">{name}</div>
      <div>{count} items</div>
    </div>
  );
};
const ProductCard = ({ data }) => {
  const { name, price, isVeg, available, preparationTime } = data;
  return (
    <div className="w-52 sm:w-56 md:w-60 lg:w-62 h-auto bg-gradient-to-b from-primary-50 to-primary-100 rounded-3xl shadow-inset-custom p-5 text-center">
      <div className="text-primary font-bold text-xl">{name}</div>
      <div className="flex justify-between mt-2">
        <div>{isVeg ? "Veg" : "Non-veg"}</div>
        <div>{available ? "Available" : "Not-available"}</div>
      </div>
      <div className="flex justify-between mt-2">
        <div>{preparationTime}</div>
        <div>Rs. {price}/-</div>
      </div>
    </div>
  );
};
const CartItem = ({ data }) => {
  const { id, name, image, price, quantity } = data;
  return (
    <div
      key={id}
      className="flex justify-between mb-4 text-black font-bold items-center"
    >
      <div className="flex gap-4">
        <div className="rounded-xl relative overflow-hidden w-24 h-24">
          <Image src={image} fill />
        </div>
        <div className="flex flex-col justify-between py-1">
          <div>
            <div>{name}</div>
            <div>${price}</div>
          </div>
          <div className="flex gap-4 items-center ">
            <Button color="primary" size="sm" radius="sm" isIconOnly>
              <BiPlus size={20} color="black" />
            </Button>
            <div>{quantity}</div>
            <Button color="primary" size="sm" radius="sm" isIconOnly>
              <BiMinus size={15} color="black" />
            </Button>
          </div>
        </div>
      </div>
      <div>
        <Button isIconOnly variant="light" color="danger">
          <RiDeleteBin6Line
            size={25}
            className="text-primary-700"
            strokeWidth={0.1}
          />
        </Button>
      </div>
    </div>
  );
};

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

const dummyProductData = Array.from({ length: 25 }, (_, index) => ({
  id: index + 1,
  name: `Dish ${index + 1}`,
  price: (Math.random() * 50 + 10).toFixed(2), // Random price between $10 and $60
  preparationTime: `${Math.floor(Math.random() * 60) + 10} mins`, // Random time between 10 to 70 mins
  isVeg: Math.random() < 0.5, // Randomly assign true or false
  available: Math.random() < 0.8, // 80% chance of being available
}));

const PersonIcon = ({
  size = 25,
  strokeColor = "#000",
  strokeWidth = 1,
  fillColor = "#1A160D",
}) => (
  <svg
    width={size}
    height={(size * 29) / 25} // Keeps aspect ratio based on original dimensions
    viewBox="0 0 25 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke={strokeColor}
    strokeWidth={strokeWidth}
  >
    <path
      d="M14.8125 0.625C10.5737 0.625 7.35931 1.62169 5.20059 3.66016C3.04419 5.69863 2.09375 8.67019 2.09375 12.1875V13.2351C1.43237 13.8641 0.9375 14.6734 0.9375 15.6562C0.9375 17.1131 1.96656 18.1468 3.25 18.6556C3.67781 20.0049 4.14378 21.4225 4.66063 22.6296C5.22141 23.95 5.729 24.9976 6.42969 25.7399C7.20754 26.5707 8.14764 27.233 9.19179 27.6857C10.2359 28.1385 11.3619 28.3721 12.5 28.3721C13.6381 28.3721 14.7641 28.1385 15.8082 27.6857C16.8524 27.233 17.7925 26.5707 18.5703 25.7399C19.271 24.9976 19.7416 23.95 20.3047 22.6296C20.8204 21.4225 21.3222 20.0049 21.75 18.6567C23.0334 18.148 24.0625 17.1143 24.0625 15.6574C24.0625 14.6792 23.5653 13.8687 22.9062 13.2362V12.1875C22.9062 8.92225 22.1628 6.59819 20.8481 5.06962C19.7312 3.77462 18.2408 3.24275 16.7642 3.08088L15.8601 1.27713L15.5363 0.625H14.8125ZM14.1257 3.01034L14.9212 4.60019C15.3062 5.37025 15.4565 5.91831 15.4623 6.15303C15.4693 6.38891 15.4773 6.29178 15.4276 6.33572C15.327 6.42013 14.3523 6.67103 13.1498 6.73231C11.9473 6.79475 10.5321 6.76469 9.21163 7.27575C7.8935 7.78681 6.73378 9.15697 6.71875 11.0336H9.03125C9.0405 9.8935 9.30528 9.72931 10.043 9.44372C10.7807 9.15812 12.0525 9.07372 13.2955 9.01013C14.5373 8.94653 15.8196 9.02169 16.9088 8.10825C17.4522 7.64922 17.7991 6.8595 17.776 6.08481C17.7702 5.91369 17.7297 5.7495 17.7031 5.57606C18.233 5.80314 18.7032 6.14982 19.0767 6.58894C19.915 7.5625 20.5938 9.27606 20.5938 12.1875V14.3196L21.1719 14.6434C21.5234 14.848 21.75 15.2169 21.75 15.6562C21.7567 15.9465 21.6518 16.2282 21.4569 16.4434C21.262 16.6585 20.9919 16.7907 20.7024 16.8125L19.9069 16.8472L19.6907 17.6068C19.2651 18.992 18.7704 20.355 18.2084 21.6907C17.6881 22.9117 17.0903 23.9523 16.9076 24.1466C14.4448 26.7482 10.5517 26.7482 8.09122 24.1466C7.90622 23.9523 7.31075 22.9117 6.78928 21.6896C6.22867 20.3536 5.73473 18.9906 5.30928 17.6057L5.09191 16.846L4.29641 16.8113C4.00733 16.7892 3.73772 16.6571 3.54307 16.4423C3.34842 16.2274 3.24353 15.9461 3.25 15.6562C3.25 15.2238 3.47316 14.8492 3.82812 14.6445L4.40625 14.3208V12.1875C4.40625 9.06909 5.19712 6.82713 6.79159 5.32169C8.27159 3.92263 10.6882 3.12481 14.1257 3.00919V3.01034ZM9.03125 14.5C8.72459 14.5 8.4305 14.6218 8.21366 14.8387C7.99682 15.0555 7.875 15.3496 7.875 15.6562C7.875 15.9629 7.99682 16.257 8.21366 16.4738C8.4305 16.6907 8.72459 16.8125 9.03125 16.8125C9.33791 16.8125 9.632 16.6907 9.84884 16.4738C10.0657 16.257 10.1875 15.9629 10.1875 15.6562C10.1875 15.3496 10.0657 15.0555 9.84884 14.8387C9.632 14.6218 9.33791 14.5 9.03125 14.5ZM15.9688 14.5C15.6621 14.5 15.368 14.6218 15.1512 14.8387C14.9343 15.0555 14.8125 15.3496 14.8125 15.6562C14.8125 15.9629 14.9343 16.257 15.1512 16.4738C15.368 16.6907 15.6621 16.8125 15.9688 16.8125C16.2754 16.8125 16.5695 16.6907 16.7863 16.4738C17.0032 16.257 17.125 15.9629 17.125 15.6562C17.125 15.3496 17.0032 15.0555 16.7863 14.8387C16.5695 14.6218 16.2754 14.5 15.9688 14.5Z"
      fill={fillColor}
    />
  </svg>
);
