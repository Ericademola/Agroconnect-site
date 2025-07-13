"use client";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons/faShoppingBasket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getTotalBasketCount } from "@/hooks/getProducts";

export default function NavBar() {
  const [basketCount, setBasketCount] = useState(0);

  useEffect(() => {
    const counts = getTotalBasketCount();
    setBasketCount(counts);
  }),
    [];

  return (
    <div className="relative">
      <nav className="fixed top-0 right-0 left-0 h-14 sm:px-6 md:px-8 lg:h-20 md:h-16 px-4 items-center flex justify-between z-50 bg-green-200 shadow-md">
        <Link href="/">
          <div className="flex items-end cursor-pointer">
            <Image
              width={100}
              height={100}
              src="/assets/image/logo.png"
              alt=""
              className="w-8 sm:w-10 md:w-12 object-cover"
            />

            <p className="font-bold text-[1rem] sd:text-xl md:text-2xl text-green-800">
              AgroConnect
            </p>
          </div>
        </Link>

        <div className="flex gap-4 font-medium text-xl">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
        </div>

        <Link href={"/cart"}>
          <div className="relative flex gap-3 items-end text-green-600 hover:text-green-800 cursor-pointer">
            <FontAwesomeIcon
              icon={faShoppingBasket}
              className="text-[1.4rem] sm:text-[1.6rem] md:text-3xl "
            />
            <Badge className="h-5 min-w-5 rounded-full px-1 font-sans tabular-nums absolute -top-2 left-5 sm:left-6 text-[0.6rem] sm:text-[0.8rem] text-white bg-orange-400 ">
              {basketCount}
            </Badge>
            <p className="font-medium text-[0.85rem] sm:text-[1rem] md:text-lg">
              Basket
            </p>
          </div>
        </Link>
      </nav>
    </div>
  );
}
