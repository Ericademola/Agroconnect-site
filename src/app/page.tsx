"use client";

import Categories from "@/components/Categories/Categories";
import CategoriesCarousel from "@/components/CategoriesCarousel/CategoriesCarousel";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import NewArrivals from "@/components/NewArrivals/NewArrivals";
import ProductList from "@/components/ProductList/ProductList";
import SearchInput from "@/components/SearchInput/SearchInput";
import Testimonial from "@/components/Testimonial/Testimonial";
import { Button } from "@/components/ui/button";
import { ShopBagIcon } from "@/Icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useState } from "react";
// import Catalogue from "@/components/Catalogue/Catalogue";

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchText, setSearchText] = useState("");

  return (
    <div className="flex flex-col gap-7">
      <div className="mx-4 sm:mx-5 md:mx-6 ml:mx-8 lg:mx-12 flex flex-col gap-3 md:gap-4">
        <div className="flex ml:hidden mt-3 md:mt-4">
          <SearchInput
            setSearchText={setSearchText}
            leftIcon={false}
            className="w-full h-[40px] md:h-[50px] border-[1.5px] border-[#0000001A] pr-0 rounded-[5px] md:rounded-[15px]"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[auto_2fr] gap-2 items-center">
          <div className="hidden md:block">
            <Categories />
          </div>
          <div className="relative bg-[url('/heroBg.png')] bg-no-repeat bg-cover bg-center w-full min-h-[180px] sm:min-h-[260px] md:h-full rounded-[10px] md:rounded-[30px] flex justify-center items-center z-0">
            <div className="absolute top-1/2 md:top-24 lg:top-32 left-6 -translate-y-1/2 md:-translate-y-0 z-20 leading-tight w-[85%] sm:w-[50%] md:w-[70%] ml:w-[65%] lg:w-[62%]">
              <h1 className="font-geologica font-bold text-white text-[clamp(18px,3vw,36px)] ">
                Connecting you to farmers for fair trade, fresh food, and
                trusted quality
              </h1>
              <Button href="/shop" variant="default" size="lg" className="mt-7">
                <ShopBagIcon className="w-5 h-5" />
                Shop Now
              </Button>
            </div>
          </div>
        </div>
      </div>
      <CategoriesCarousel />
      <ProductList />
      <HowItWorks />
      <NewArrivals />
      <div className="mx-0 sm:mx-5 md:mx-6 ml:mx-8 lg:mx-12">
        <Testimonial />
      </div>
    </div>
  );
}
