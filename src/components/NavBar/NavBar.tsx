"use client";

import {
  getTotalBasketCount,
  getTotalWishlistCount,
} from "@/hooks/getProducts";
import {
  AppleIcon,
  CartIcon,
  CustormerSupportIcon,
  DownIcon,
  HammburgerIcon,
  HeartIcon,
  HomeIcon,
  PersonIcon,
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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import MenuItems from "../MenuItems/MenuItems";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { capitalizeFirstLetter } from "@/utils/formatText";

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
    <div className="sticky top-0 z-100 bg-white pb-2 md:pb-3 ml:pb-5">
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
          ${isScrolled ? "mt-0" : "mt-2 md:mt-3 ml:mt-4"}
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
      <nav className="bg-[#03601A] h-[40px] sm-[45px] md:h-[55px] ml:h-[70px] flex items-center justify-center md:justify-between text-white px-4 sm:px-5 md:px-6 ml:px-8 lg:px-12">
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
  const { userInfo } = useAuth();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [activeProfile, setActiveProfile] = useState<string>("buyer");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const pathname = usePathname();
  const close = () => setOpen(false);

  useEffect(() => {
    const storedProfile = sessionStorage.getItem("activeProfile");

    if (storedProfile) {
      setActiveProfile(storedProfile);
    } else {
      setActiveProfile("buyer");
      sessionStorage.setItem("activeProfile", "buyer");
    }
  }, []);

  useEffect(() => {
    close();
  }, [pathname]);

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
        className="bg-fuchsia-400 sm:bg-emerald-400 md:bg-cyan-400 ml:bg-red-400 lg:bg-blue-400 xl:bg-indigo-800 rounded-2xl px-2 md:px-4 p-3 flex items-center justify-between"
      >
        <div
          className="bg-white rounded-[8px] md:rounded-2xl md:hidden flex items-center justify-center w-[35px] h-[35px] sm:w-[40px] sm:h-[40px] md:w-[50px] md:h-[50px] cursor-pointer"
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
            className="md:w-[300px] lg:w-[450px] ml:h-[40px] lg:h-[50px] border-none pr-0"
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
          <div className="hidden md:block">
            {!isClient ? (
              // Show a placeholder during SSR to match initial client state
              <div className="flex items-center gap-4">
                <div className="h-[45px] lg:h-[48px] w-32 bg-gray-200 animate-pulse rounded" />
                <div className="h-[45px] lg:h-[48px] w-24 bg-gray-200 animate-pulse rounded" />
              </div>
            ) : userInfo.isLoggedIn ? (
              <div>
                <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                  <PopoverTrigger asChild>
                    <div className="flex items-center gap-2 bg-[#F5F5F5] rounded-2xl py-2 px-3 lg:p-3 cursor-pointer">
                      <PersonIcon className="md:w-6 lg:w-10 md:h-6 lg:h-10" />
                      <div className="text-left font-geologica">
                        <p className="text-[#333333] text-[clamp(16px,1.8vw,18px)]">
                          Hi, <span>{userInfo.userFullName}</span>
                        </p>
                        <p
                          className="text-[#03601A] text-[clamp(12px,1.3vw,14px)]"
                          suppressHydrationWarning
                        >
                          {capitalizeFirstLetter(activeProfile)} account
                        </p>
                      </div>
                      <DownIcon className="w-3 h-3 ml-2" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent
                    asChild
                    className="bg-[#F5F5F5] border-none P-0 w-fit"
                    sideOffset={6}
                  >
                    <div>
                      <MenuItems
                        close={() => setPopoverOpen(false)}
                        className="px-1 py-0"
                        itemsListClassName="gap-6 text-[clamp(16px,1.5vw,18px)]"
                        secondClassName="gap-6 mb-0"
                        activeProfile={activeProfile}
                        setActiveProfile={setActiveProfile}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href={"/create-account"} passHref>
                  <Button
                    variant="default"
                    size="lg"
                    className="h-[45px] lg:h-[48px]"
                  >
                    Register
                  </Button>
                </Link>
                <Link href="/login" passHref>
                  <Button variant="secondary" size="lg">
                    Login
                  </Button>
                </Link>
              </div>
            )}
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
