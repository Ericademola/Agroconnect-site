"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import Categories from "../Categories/Categories";
import MenuItems from "../MenuItems/MenuItems";
import { CloseIcon } from "@/Icons";

const MobileMenu = ({ close }: { close: () => void }) => {
  return (
    <div className="px-6 py-4 w-full flex flex-col">
      <div className="flex flex-col gap-7 mb-8">
        <div className="flex items-start justify-between">
          <Link href="/" onClick={close}>
            <div className="flex items-center cursor-pointer gap-[5px]">
              <Image
                width={100}
                height={100}
                src="/assets/images/logo.png"
                alt=""
                className="w-[46px] md:w-[50px] h-auto object-cover"
              />

              <p className="font-prompt font-semibold text-[clamp(16px,1.5vw,18px)] text-[#03601A]">
                Agroconnect
              </p>
            </div>
          </Link>
          <div
            className="border border-[#0000001A] p-3 flex items-center justify-center rounded-full ml-auto"
            onClick={close}
          >
            <CloseIcon className="w-3 h-3" />
          </div>
        </div>

        <div className="">
          <MenuItems close={close} />
        </div>
      </div>
      <hr className="-mx-5" />
      <h2 className="text-[#000000CC] text-[clamp(19px,2.8vw,25px)] text-center font-geologica py-3">
        Categories
      </h2>
      <hr className="-mx-5" />
      <div>
        <Categories
          className="bg-transparent rounded-none p-0"
          headerContent={false}
          avatarSize="w-6 h-6"
          labelClassName="font-extralight text-[clamp(18px,1.8vw,24px)]"
          close={close}
        />
      </div>
    </div>
  );
};

export default MobileMenu;
