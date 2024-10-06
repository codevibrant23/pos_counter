// RaiseTicketModal.js
"use client"; // Important for Next.js App Router and Next UI

import React from "react";
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

export default function StockOut() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
        Stock Out
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        // closeButton={false}
        hideCloseButton
        isDismissable
        // backdrop={<div className="custom-backdrop" />}
        // base={<div className="custom-modal" />}
        size="5xl"
        radius="sm"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-end gap-1">
                <Button color="primary" isIconOnly onClick={onClose}>
                  <IoMdClose size={20} strokeWidth={8} />
                </Button>
              </ModalHeader>
              <ModalBody className="flex flex-col">
                <Input
                  type="text"
                  color="primary"
                  variant="bordered"
                  label="Subject"
                  labelPlacement="outside"
                  placeholder="Select product"
                  defaultValue="junior@nextui.org"
                  className="w-full"
                  classNames={{
                    label: "text-lg",
                    inputWrapper:
                      "py-8 border-primary placeholder:text-gray-900",
                  }}
                  endContent={
                    <BiChevronDown className=" text-primary" size={40} />
                  }
                />

                <div className="flex-grow w-full rounded-md min-h-72 flex flex-wrap gap-3">
                  <div className="bg-white  w-32 h-20 rounded-xl text-white bg-gradient-to-t from-primary-500 to-primary-100 flex justify-between items-center p-2">
                    <div className="text-lg font-medium leading-tight">
                      {" "}
                      Cheese Burger
                    </div>
                    <Button
                      className="bg-white"
                      isIconOnly
                      onClick={onClose}
                      size="sm"
                    >
                      <IoMdClose size={15} strokeWidth={8} />
                    </Button>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-center">
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={onClose}
                  className="w-52 rounded-2xl font-bold text-xl"
                >
                  Stock Out
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
