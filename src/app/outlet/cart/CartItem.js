import { Button } from "@nextui-org/react";
import Image from "next/image";
import { BiMinus, BiPlus } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";

const CartItem = ({ data, onAdd, onRemove }) => {
  const { id, name, image_url, price, quantity } = data;
  console.log(data);
  return (
    <div
      key={id}
      className="flex justify-between items-center gap-4 mb-2 p-2 rounded-lg"
    >
      {/* Product Image */}
      <div className="flex items-center gap-4 flex-grow ">
        <div className="w-14 h-14 relative">
          <Image
            src={process.env.NEXT_PUBLIC_API_BASE_URL + image_url}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
        <div className="flex flex-col justify-center">
          <span className="font-medium">{name}</span>
          <span className=" text-gray-600">Rs. {price}</span>
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <Button
          color="primary"
          size="sm"
          radius="sm"
          isIconOnly
          onClick={onAdd}
        >
          <BiPlus />
        </Button>
        <span className="text-sm font-medium">{quantity}</span>
        <Button
          color="primary"
          size="sm"
          radius="sm"
          isIconOnly
          onClick={onRemove}
        >
          <BiMinus />
        </Button>
      </div>

      {/* Remove Button */}
      <Button Button isIconOnly variant="light" color="danger">
        <RiDeleteBin6Line />
      </Button>
    </div>
  );
};

export default CartItem;
