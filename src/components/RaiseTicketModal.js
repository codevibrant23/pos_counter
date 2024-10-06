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

export default function RaiseTicketModal() {
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
        Raise Ticket
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
                {/* Raise Ticket */}
                <Button color="primary" isIconOnly onClick={onClose}>
                  <IoMdClose size={20} strokeWidth={8} />
                </Button>
              </ModalHeader>
              <ModalBody className="flex flex-col">
                <Input
                  type="text"
                  color="primary"
                  label="Subject"
                  labelPlacement="outside"
                  placeholder="Enter your text here"
                  defaultValue="junior@nextui.org"
                  className="w-full"
                  classNames={{
                    label: "text-lg",
                    inputWrapper: "py-8 border-black placeholder:text-gray-900",
                  }}
                />
                <Input
                  type="text"
                  color="primary"
                  label="Description"
                  labelPlacement="outside"
                  placeholder="Enter your text here"
                  defaultValue="junior@nextui.org"
                  className="w-full mt-4"
                  classNames={{
                    label: "text-lg",
                    inputWrapper: "py-8 border-black placeholder:text-gray-900",
                  }}
                />
                <div className="text-primary text-lg">Add Attachment</div>
                <div
                  className="bg-primary-50 flex-grow w-full rounded-md min-h-72 flex justify-center items-center"
                  //   style={{
                  //     borderStyle: "dashed",
                  //     borderWidth: "3px",
                  //     borderDasharray: "10 5",
                  //   }}
                >
                  <div className="text-gray-500 font-medium text-lg">
                    Browse or Desktop
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
                  Raise
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
export const CustomCloseButton = () => (
  <Button color="primary" size="xl">
    Close
  </Button>
);
