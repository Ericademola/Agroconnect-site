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
import { CartIcon, DownIcon, FilterIcon } from "@/Icons";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ProductDisplay from "@/components/ProductDisplay/ProductDisplay";
import { Badge } from "@/components/ui/badge";
import { LOAN_UPDATED_EVENT } from "@/lib/events";
import { getTotalLoanCartCount } from "@/hooks/getLoans";

const LoanShopPage = () => {
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
        title="Food available on Credit"
        description="Buy food now, pay later in easy installments."
      />
      <div className="mx-4 sm:mx-5 md:mx-6 ml:mx-8 lg:mx-12 py-3 md:py-6 flex flex-col gap-6 md:gap-12">
        <div>
          <Breadcrumb>
            <BreadcrumbList className="text-[#787878CC]">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/loan" className="text-[#787878]">
                    My profile
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-[#2B2B2B]">
                  Food on Credit
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="grid md:grid-cols-[1fr_2.5fr] ml:grid-cols-[1fr_2.8fr] lg:grid-cols-[1fr_4fr] gap-[10px] md:gap-[20px] lg:gap-[40px]">
          <ProductDisplay />
          <div className="flex flex-col gap-[30px] relative">
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
              actionType="loan"
              category="deals"
              className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
            />
            <div className="fixed bottom-10 right-10 md:right-15">
              <LoanCartButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanShopPage;

export const LoanCartButton = () => {
  const [basketCount, setBasketCount] = useState(0);

  const updateCounts = () => {
    const countsForLoanCarts = getTotalLoanCartCount();
    setBasketCount(countsForLoanCarts);
  };

  useEffect(() => {
    updateCounts();

    const handleLoanCartUpdate = () => {
      setBasketCount(getTotalLoanCartCount());
    };

    window.addEventListener(LOAN_UPDATED_EVENT, handleLoanCartUpdate);

    return () => {
      window.removeEventListener(LOAN_UPDATED_EVENT, handleLoanCartUpdate);
    };
  }, []);

  return (
    <div className="fixed bottom-10 right-10 md:right-15">
      <Link
        href={"/cart/cart-loans"}
        className="bg-[#03601A] rounded-[8px] md:rounded-[10px] lg:rounded-md flex items-center justify-center w-[45px] h-[45px] sm:w-[50px] sm:h-[50px] md:w-[55px] md:h-[55px] lg:w-[60px] lg:h-[60px] relative shadow-md"
      >
        <CartIcon className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" fill="#fff" />
        <Badge className="w-5 h-5 rounded-full px-0 md:px-1 tabular-nums absolute top-[6px] right-[3px] md:right-[6px] lg:right-[8px] text-[8px] md:text-[9px] lg:text-[11px] text-white bg-[#C09706] ">
          {basketCount}
        </Badge>
      </Link>
    </div>
  );
};
