"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { MoneyJarIcon, OrderIcon, UserIcon, WalletIcon } from "@/Icons";
import { Button } from "../ui/button";
import Categories from "../Categories/Categories";

const MobileMenu = ({ close }: { close: (value: boolean) => void }) => {
  return (
    <div className="px-6 py-4 w-full flex flex-col">
      <div className="flex flex-col gap-7 mb-8">
        <Link href="/" onClick={() => close(false)}>
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
        <div className="flex flex-col gap-[30px]">
          {SidebarItems.map((item) => (
            <Link
              href={item.route}
              key={item.label}
              onClick={() => close(false)}
              className="flex items-center gap-[10px]"
            >
              {item.icon}
              <p className="text-[clamp(18px,1.8vw,24px)] text-[#333333] font-geologica font-extralight">
                {item.label}
              </p>
            </Link>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4">
          <Button
            href="/"
            variant="default"
            size="lg"
            className="w-full text-base"
          >
            Register
          </Button>
          <Button
            href="/"
            variant="secondary"
            size="lg"
            className="w-full text-base"
          >
            Login
          </Button>
        </div>
      </div>
      <hr className="-mx-5" />
      <h2 className="text-[#000000CC] text-[clamp(19px,2.8vw,25px)] text-center font-geologica py-3">
        Categories
      </h2>
      <hr className="-mx-5" />
      <div className="">
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

const SidebarItems = [
  {
    label: "My profile",
    route: "/",
    icon: <UserIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:-h-6" />,
  },
  {
    label: "My Orders",
    route: "/",
    icon: <OrderIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:-h-6" />,
  },
  {
    label: "Food Savings",
    route: "/",
    icon: <MoneyJarIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:-h-6" />,
  },
  {
    label: "Loan & Credit",
    route: "/",
    icon: <WalletIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:-h-6" />,
  },
];
