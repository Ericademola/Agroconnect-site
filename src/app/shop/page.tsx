"use client";
import Catalogue from "@/components/Catalogue/Catalogue";
import PageTitle from "@/components/PageTitle/PageTitle";
import SearchInput from "@/components/SearchInput/SearchInput";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { DownIcon, FilterIcon } from "@/Icons";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import Testimonial from "@/components/Testimonial/Testimonial";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const ShopPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("Newest");
  const FilterOptions = ({ onClose }: { onClose?: () => void }) => (
    <RadioGroup
      value={selectedFilter}
      onValueChange={(value) => {
        setSelectedFilter(value);
        onClose?.();
      }}
      className="gap-[24px]"
    >
      {[
        { value: "Newest", label: "Newest" },
        { value: "Popularity", label: "Popularity" },
        { value: "Price: Low to High", label: "Price: Low to High" },
        { value: "Price: High to Low", label: "Price: High to Low" },
      ].map((option) => (
        <div key={option.value} className="flex items-center space-x-2 ">
          <RadioGroupItem value={option.value} id={option.value} />
          <Label
            htmlFor={option.value}
            className="text-[#00000080] font-poppins font-normal text-[13px] sm:text-sm ml:text-base"
          >
            {option.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
  return (
    <div>
      <PageTitle
        title="Shop"
        description="Browse by category, season, or freshness. Everything you see is farm-sourced"
      />
      <div className="mx-4 sm:mx-5 md:mx-6 ml:mx-8 lg:mx-12 py-6 md:py-12 flex flex-col gap-6 md:gap-12">
        <div>
          <Breadcrumb>
            <BreadcrumbList className="text-[#787878CC] text-sm md:text-lg font-poppins">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/shop">Shop</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-[#2B2B2B]">
                  All Products
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="grid md:grid-cols-[1fr_2.5fr] ml:grid-cols-[1fr_2.8fr] lg:grid-cols-[1fr_4fr] gap-[10px] md:gap-[20px] lg:gap-[40px]">
          <div className="hidden md:block border-[1.5px] border-[#F5F5F5] rounded-[10px]">
            hello
          </div>
          <div className="flex flex-col gap-[30px]">
            <div className="flex items-center justify-between w-full">
              <div>
                <SearchInput
                  setSearchText={setSearchText}
                  rightIcon={false}
                  className="md:w-[300px] lg:w-[500px] h-[40px] ml:h-[50px] border-[#0000001A] rounded-[5px] md:rounded-[10px]"
                  placeholder="Search for rice, yam, palm oil…"
                />
              </div>
              <div className="ml-auto font-poppins text-[#00000080] text-[13px] sm:text-sm ml:text-base">
                <div className="hidden md:flex items-center justify-between gap-2">
                  <p>Sort by</p>
                  <Popover>
                    <PopoverTrigger>
                      <div className="border border-[#0000001A] rounded-[10px] flex items-center gap-5 h-[40px] ml:h-[50px] px-3">
                        <p>{selectedFilter}</p>
                        <DownIcon className="w-3 h-3 cursor-pointer" />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="mr-4 sm:mr-5 md:mr-6 ml:mr-8 lg:mr-12">
                      <div>
                        <FilterOptions />
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="block md:hidden">
                  <Popover>
                    <PopoverTrigger>
                      <div className="border border-[#0000001A] rounded-[5px] flex items-center gap-4 h-[40px] ml:h-[50px] px-3">
                        <span className="flex items-center justify-between gap-2">
                          <FilterIcon className="w-4 h-4" />
                          <p>Filter</p>
                        </span>
                        <DownIcon className="w-[10px] h-[10px] cursor-pointer" />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="mr-4 sm:mr-5 md:mr-6 ml:mr-8 lg:mr-12">
                      <div>
                        <FilterOptions />
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
            <Catalogue
              category="all"
              className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
            />
          </div>
        </div>
        <div className="relative mt-10 bg-[#03601A] rounded-[15px] w-full min-h-[350px] sm:min-h-[260px] md:min-h-[280px] ml:min-h-[340px] flex flex-col sm:flex-row justify-center items-center z-0">
          <div className="absolute top-6 sm:top-1/2 left-4 sm:left-8 ml:left-12 sm:-translate-y-1/2 z-20 leading-tight w-[80%] sm:w-[55%] md:w-[50%] lg:w-[45%] text-white">
            <h1 className="font-geologica font-bold text-[clamp(18px,2.6vw,32px)] ">
              Didn’t find what you’re looking for?
            </h1>
            <p className="text-[clamp(12px,1.4vw,15px)] font-poppins mt-2">
              Tell us what you need — our team will connect you to farmers
              growing it or notify you when it becomes available
            </p>
            <Button
              href="/shop"
              variant="default"
              size="lg"
              className="mt-3 sm:mt-7"
            >
              Request a product
            </Button>
          </div>
          <div className="ml-auto mt-auto sm:mt-0 w-[250px] sm:w-[300px] md:w-[350px] ml:w-[380px] lg:w-[470px] h-[auto]">
            <Image
              src={"/assets/avatars/shopFruitBasket.svg"}
              alt={"A basket of fruits"}
              width={100}
              height={100}
              className="object-contain w-full h-full"
            />
          </div>
        </div>
        <div className="-mx-4 sm:-mx-0">
          <Testimonial />
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
