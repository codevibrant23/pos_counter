import { Button, Divider } from "@nextui-org/react";
import Image from "next/image";
import { BiMinus, BiPlus } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";

const CartItem = ({ data, onAdd, onRemove, itemDelete }) => {
  const { id, name, image_url, price, quantity } = data;
  return (
    <div
      key={id}
      className="flex justify-between items-center gap-2 mb-2 p-1 rounded-lg"
    >
      {/* Product Image */}
      <div className="flex items-center gap-4 flex-grow ">
        {!!image_url && (
          <div className="w-14 h-14 relative">
            <Image
              src={process.env.NEXT_PUBLIC_API_BASE_URL + image_url}
              alt={name}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        )}

        <div className="flex flex-col justify-center">
          {data.variant_name ? (
            <>
              <span className="font-medium">{data.variant_name}</span>
              <span className="text-sm mb-1">{data.name}</span>
            </>
          ) : (
            <span className="font-medium">{data.name}</span>
          )}
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
          <BiPlus size={18} />
        </Button>
        <div className="text-md font-medium rounded-full bg-background h-7 w-7 flex items-center justify-center">
          {quantity}
        </div>
        <Button
          color="primary"
          size="sm"
          radius="sm"
          isIconOnly
          onClick={onRemove}
        >
          <BiMinus size={18} />
        </Button>
      </div>
      <Divider orientation="vertical" style={{ height: "20px" }} />
      {/* Remove Button */}
      <Button
        Button
        isIconOnly
        variant="light"
        color="danger"
        onClick={itemDelete}
      >
        <RiDeleteBin6Line size={18} />
      </Button>
    </div>
  );
};

export default CartItem;
