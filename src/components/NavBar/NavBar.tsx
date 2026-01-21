"use client";

import {
  getTotalBasketCount,
  getTotalWishlistCount,
} from "@/hooks/getProducts";
import {
  AppleIcon,
  CartIcon,
  CustormerSupportIcon,
  HammburgerIcon,
  HeartIcon,
  HomeIcon,
  PlayStoreIcon,
  ShopIcon,
} from "@/Icons";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import SearchInput from "../SearchInput/SearchInput";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import FullScreenModal from "../FullScreenModal/FullScreenModal";
import MobileMenu from "../MobileMenu/MobileMenu";
import { CART_UPDATED_EVENT, WISHLIST_UPDATED_EVENT } from "@/lib/events";

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="sticky top-0 z-999 bg-white pb-2 md:pb-3 ml:pb-5">
      {/* Top Bar */}
      <div
        className={`
          overflow-hidden transition-all duration-500 ease-in-out
          ${
            isScrolled
              ? "max-h-0 opacity-0 -translate-y-2"
              : "max-h-[100px] opacity-100 translate-y-0"
          }
        `}
      >
        <TopNavBar />
      </div>

      {/* Main Bar */}
      <div
        className={`
          transition-all duration-500 ease-in-out
          ${isScrolled ? "mt-0" : "mt-2 md:mt-4 ml:mt-6"}
        `}
      >
        <MainNavBar />
      </div>
    </div>
  );
}

const TopNavBar = () => {
  return (
    <>
      {/* bg-fuchsia-400 sm:bg-emerald-400 md:bg-cyan-400 ml:bg-red-400
      lg:bg-blue-400 xl:bg-indigo-800 */}
      <nav className="bg-[#03601A] h-[40px] sm-[50px] md:h-[60px] ml:h-[80px] flex items-center justify-center md:justify-between text-white px-4 sm:px-5 md:px-6 ml:px-8 lg:px-12">
        <div className="hidden md:flex items-center gap-4 text-[clamp(14px,1.5vw,20px)] font-poppins font-medium">
          <Link href="/" className="flex items-center gap-1">
            <HomeIcon className="w-6 h-6 lg:w-7 lg:h-7" />
            <p>Home</p>
          </Link>
          <Link href="/shop" className="flex items-center gap-1">
            <ShopIcon className="w-6 h-6 lg:w-7 lg:h-7" />
            <p>Shop</p>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <h3 className="text-[clamp(12px,1.7vw,18px)] font-geologica">
            Get Agriconnect App
          </h3>
          <div className="flex items-center gap-[10px] md:gap-5 ml:gap-6">
            <span className="border-2 border-[#8FE6A2] flex items-center justify-center w-6 h-6 md:h-8 md:w-8 ml:w-10 ml:h-10 rounded-full">
              <AppleIcon className="w-4 h-4 ml:w-5 ml:h-5" />
            </span>
            <span className="border-2 border-[#8FE6A2] flex items-center justify-center w-6 h-6 md:h-8 md:w-8 ml:w-10 ml:h-10 rounded-full">
              <PlayStoreIcon className="w-3 h-3 md:w-4 md:h-4 ml:w-5 ml:h-5" />
            </span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-[5px]">
          <CustormerSupportIcon className="w-6 h-6 lg:w-7 lg:h-7" />
          <p className="text-[clamp(12px,1.2vw,14px)] font-geologica">
            Customer support: +2348023456789
          </p>
        </div>
      </nav>
    </>
  );
};

const MainNavBar = () => {
  const [basketCount, setBasketCount] = useState(0);
  const [wishListCount, setWishListCount] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);

  const close = (value: boolean) => {
    setOpen(value);
  };

  const updateCounts = () => {
    const countsForBasket = getTotalBasketCount();
    const countsForWishList = getTotalWishlistCount();
    setBasketCount(countsForBasket);
    setWishListCount(countsForWishList);
  };

  useEffect(() => {
    updateCounts();

    const handleCartUpdate = () => {
      setBasketCount(getTotalBasketCount());
    };

    const handleWishlistUpdate = () => {
      setWishListCount(getTotalWishlistCount());
    };

    window.addEventListener(CART_UPDATED_EVENT, handleCartUpdate);
    window.addEventListener(WISHLIST_UPDATED_EVENT, handleWishlistUpdate);

    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, handleCartUpdate);
      window.removeEventListener(WISHLIST_UPDATED_EVENT, handleWishlistUpdate);
    };
  }, []);

  return (
    <div className="mx-4 sm:mx-5 md:mx-6 ml:mx-8 lg:mx-12">
      <header
        //bg-gradient-to-r from-[#8FE6A2] via-[#E3BF0F4D] to-[#8FE6A2]
        className="bg-fuchsia-400 sm:bg-emerald-400 md:bg-cyan-400 ml:bg-red-400 lg:bg-blue-400 xl:bg-indigo-800 rounded-[15px] px-2 py-3 md:p-[14px] lg:p-4 flex items-center justify-between"
      >
        <div
          className="bg-white rounded-[8px] md:rounded-[15px] md:hidden flex items-center justify-center w-[35px] h-[35px] sm:w-[40px] sm:h-[40px] md:w-[50px] md:h-[50px] cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <HammburgerIcon className="w-4 h-4 md:w-6 md:h-6" />
        </div>

        <Link href="/">
          <div className="flex items-center cursor-pointer gap-[5px]">
            <Image
              width={100}
              height={100}
              src="/assets/images/logo.png"
              alt=""
              className="w-[30px] md:w-[50px] ml:w-[58px] lg:w-[67px] h-auto object-cover"
            />

            <p className="font-prompt font-semibold text-[clamp(11px,1.9vw,24px)] text-[#03601A]">
              Agroconnect
            </p>
          </div>
        </Link>

        <div className="hidden ml:flex">
          <SearchInput
            setSearchText={setSearchText}
            leftIcon={false}
            className="md:w-[300px] lg:w-[450px] ml:h-[50px] lg:h-[63px] border-none pr-0"
          />
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-4">
            <Link
              href={"/wishList"}
              className="bg-white rounded-[8px] md:rounded-[10px] lg:rounded-md flex items-center justify-center w-[35px] h-[35px] sm:w-[40px] sm:h-[40px] md:w-[45px] md:h-[45px] lg:w-[48px] lg:h-[48px] relative"
            >
              <HeartIcon className="w-6 h-6 md:w-7 md:h-7" />
              <Badge className="w-4 h-4 md:w-5 md:h-5 rounded-full px-0 md:px-1 tabular-nums absolute top-[4px] right-[3px] md:right-[4px] lg:right-[5px] text-[8px] md:text-[9px] lg:text-[10px] text-white bg-[#C09706] ">
                {wishListCount}
              </Badge>
            </Link>

            <Link
              href={"/cart"}
              className="bg-white rounded-[8px] md:rounded-[10px] lg:rounded-md flex items-center justify-center w-[35px] h-[35px] sm:w-[40px] sm:h-[40px] md:w-[45px] md:h-[45px] lg:w-[48px] lg:h-[48px] relative"
            >
              <CartIcon className="w-5 h-5 md:w-6 md:h-6" />
              <Badge className="w-4 h-4 md:w-5 md:h-5 rounded-full px-0 md:px-1 tabular-nums absolute top-[4px] right-[3px] md:right-[4px] lg:right-[5px] text-[8px] md:text-[9px] lg:text-[10px] text-white bg-[#C09706] ">
                {basketCount}
              </Badge>
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Button
              href="/"
              variant="default"
              size="lg"
              className="h-[45px] lg:h-[48px] text"
            >
              Register
            </Button>
            <Button href="/" variant="secondary" size="lg">
              Login
            </Button>
          </div>
        </div>
      </header>
      <div className="block md:hidden">
        <FullScreenModal isOpen={open}>
          <MobileMenu close={close} />
        </FullScreenModal>
      </div>
    </div>
  );
};
