import { Button } from "@nextui-org/react";
import Image from "next/image";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import React from "react";
import RaiseTicketModal from "@/components/RaiseTicketModal";
import RequestStock from "@/components/RequestStock";
import StockOut from "@/components/StockOut";

const menuItems = [
  "View Orders",
  "Printers",
  "Request Stock",
  "Stock Out",
  "Raise Ticket",
];
export default function page() {
  return (
    <>
      <section className="flex w-full justify-center">
        <div className="h-32 w-[95%] bg-[#ff9146] p-3 text-white font-medium text-2xl rounded-[10px] mt-10 ">
          My Profile
        </div>
      </section>
      <section className="flex w-full justify-center -mt-[50px] ">
        <div className="w-[100%] md:w-[90%] lg:w-[80%] bg-[#fff] border-2 border-[#FF660033] rounded-[10px] p-5 pb-20">
          <div className="w-[95%] flex justify-end mb-5">
            <Button
              color="primary"
              type="submit"
              className="bg-[#FAAE62] text-[#1F1F1F] font-medium flex justify-center rounded-[20px] gap-5"
            >
              <PowerSettingsNewIcon className="rotate-90 text-[#FF6600]" />
              Log Out
            </Button>
          </div>
          <div className="flex flex-col lg:flex-row w-full justify-around gap-10">
            <div className="flex flex-col justify-center gap-10">
              <span className="flex justify-center align-center">
                <Image
                  src={"/media/mask.png"}
                  width={200}
                  height={200}
                  alt="user image"
                />
              </span>

              <div
                className="bg-[var(--background)] flex flex-col gap-5 p-5 rounded-[10px]    "
                style={{
                  boxShadow:
                    "rgba(255, 102, 0, 0.3) 0px 10px 15px -3px, rgba(255, 102, 0, 0.1) 0px 4px 6px -2px",
                }}
              >
                <div className="flex justify-between px-5 text-[#FF6600] border border-[#BF4F04] rounded-[10px]">
                  <span>Name</span>
                  <span>Agasthya Verma</span>
                </div>
                <div className="flex justify-between px-5 text-[#FF6600] border border-[#BF4F04] rounded-[10px]">
                  <span>EMPLOYEE ID</span>
                  <span>ABCDE123456</span>
                </div>
                <div className="flex justify-between px-5 text-[#FF6600] border border-[#BF4F04] rounded-[10px]">
                  <span>MOBILE NO.</span>
                  <span>+91 1234567890</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-end space-y-4 w-[100%] lg:w-[50%]">
              <Button
                className="flex justify-between items-center w-full bg-white hover:bg-[var(--background)] text-black border-2 border-[#FF6600] rounded-[10px] px-0 pl-6 py-3 text-lg font-medium"
                endContent={
                  <div className="bg-[#FAAE62] rounded p-2">
                    <ArrowCircleRightOutlinedIcon
                      className="text-white "
                      size={24}
                    />
                  </div>
                }
              >
                View Orders
              </Button>
              <Button
                className="flex justify-between items-center w-full bg-white hover:bg-[var(--background)] text-black border-2 border-[#FF6600] rounded-[10px] px-0 pl-6 py-3 text-lg font-medium"
                endContent={
                  <div className="bg-[#FAAE62] rounded p-2">
                    <ArrowCircleRightOutlinedIcon
                      className="text-white "
                      size={24}
                    />
                  </div>
                }
              >
                Printers{" "}
              </Button>
              <RequestStock />
              <StockOut />
              <RaiseTicketModal />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
