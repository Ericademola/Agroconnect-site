"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { BackIcon, ForwardIcon, FilterIcon } from "@/Icons";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import useEmblaCarousel from "embla-carousel-react";
import productTypes, { IProductTypeItem } from "../../../productTypes";

export default function DynamicProductTypesCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    containScroll: "trimSnaps",
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [pageScrolled, setPageScrolled] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setPageScrolled(true);
      } else {
        setPageScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`relative w-full py-2 bg-white ${
        pageScrolled && "border-b border-gray-200 shadow-lg"
      }`}
    >
      {canScrollPrev && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-[25px_0_10px_rgb(255,255,255)] px-2 py-1">
          <Button
            className="w-10 h-10 bg-white rounded-full shadow hover:shadow-md"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canScrollPrev}
            variant="secondary"
          >
            <BackIcon className="w-6 h-6" strokeWidth={3.5} />
          </Button>
        </div>
      )}

      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex gap-2 items-center bg-white pl-2 pr-4 py-1 rounded-md shadow-lg">
        <Button
          className="w-10 h-10 bg-white rounded-full shadow hover:shadow-md"
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canScrollNext}
          variant="secondary"
        >
          <ForwardIcon className="w-6 h-6 text-[#000]" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 border border-[#ddd] bg-white px-3 py-2 rounded-md text-[16px] hover:shadow-md">
            <FilterIcon className="w-4 h-4 text-[#717171]" /> Filter
          </DropdownMenuTrigger>
          <DropdownMenuContent className="h-[300px] overflow-auto">
            <DropdownMenuLabel>Products</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {productTypes.map((product, index) => (
              <DropdownMenuItem key={index}>
                {product.icon}
                {product.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="relative w-full">
        <div className="overflow-hidden px-8" ref={emblaRef}>
          <div className="flex gap-4 pr-[180px]">
            {productTypes.map(
              (productType: IProductTypeItem, index: number) => (
                <div key={index} className="flex-shrink-0 w-fit px-2">
                  <Link
                    href={{
                      pathname: "/products",
                      query: {
                        type: productType.label as string,
                        id: productType.id,
                      },
                    }}
                  >
                    <div className="h-[60px] w-fit text-center items-end text-[#717171] hover:text-[#15803d] border-b-2 border-white hover:border-[#15803d] mx-[15px] pb-[8px]">
                      <div className="pt-[8px] text-[24px] w-fit m-auto">
                        {productType.icon}
                      </div>
                      <span className="whitespace-nowrap">
                        {productType.label}
                      </span>
                    </div>
                  </Link>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
