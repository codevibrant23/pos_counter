"use client";

import React, { useMemo } from "react";
import { Avatar, AvatarIcon, Button, Tooltip } from "@nextui-org/react";
import { BiChevronLeft } from "react-icons/bi";
import { usePathname, useRouter } from "next/navigation";
import { extendStringPrototype } from "@/util/stringExtensions";

extendStringPrototype();

export default function Header({ title }) {
  const router = useRouter();
  const pathname = usePathname();
  const pageTitle = useMemo(
    () => title || pathname.split("/").slice(-1)[0].toSentenceCase(),
    [pathname, title]
  );
  return (
    <header className="p-4 flex justify-between items-center">
      <div className="flex justify-start items-center gap-4">
        <Tooltip content="Go back">
          <Button
            color="primary"
            radius="full"
            isIconOnly
            size="sm"
            onClick={() => router.back()}
          >
            <BiChevronLeft size="1.2rem" />
          </Button>
        </Tooltip>
        <div className="font-normal text-3xl">{pageTitle}</div>
      </div>
      <Avatar
        // showFallback
        // name="Test"
        icon={<AvatarIcon />}
        classNames={{
          base: "bg-gradient-to-tr from-[#FFB457]  to-primary",
          icon: "text-black/80",
        }}
        // src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
      />
    </header>
  );
}
