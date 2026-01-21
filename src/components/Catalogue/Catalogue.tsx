"use client";

import Link from "next/link";
import Image from "next/image";
import CartButton from "../CartButton/CartButton";
import { useEffect, useState } from "react";
import { IProducts } from "@/types";
import {
  loadProducts,
  loadFreshPickedProducts,
  loadBestDealsProducts,
} from "@/hooks/getProducts";
import { Button } from "../ui/button";
import WishListButton from "../WishListButton/WishListButton";
import { cn } from "@/lib/utils";

type ProductCategory = "all" | "fresh" | "deals";

interface CatalogueProps {
  excludeId?: number;
  category?: ProductCategory;
  sliceLimit?: number;
  className?: string;
}

export default function Catalogue({
  excludeId,
  category = "all",
  sliceLimit,
  className,
}: CatalogueProps) {
  const [productList, setProductList] = useState<IProducts[]>([]);

  useEffect(() => {
    let loadedProducts: IProducts[] = [];

    // Load products based on category
    switch (category) {
      case "fresh":
        loadedProducts = loadFreshPickedProducts();
        break;
      case "deals":
        loadedProducts = loadBestDealsProducts();
        break;
      case "all":
      default:
        loadedProducts = loadProducts();
        break;
    }

    // Filter out excluded product if needed
    const filtered = excludeId
      ? loadedProducts.filter((p) => p.productId !== excludeId)
      : loadedProducts;

    setProductList(filtered);
  }, [excludeId, category]);

  const productsToRender = sliceLimit
    ? productList.slice(0, sliceLimit)
    : productList;

  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-7",
        className,
      )}
    >
      {productsToRender.map((item: IProducts) => (
        <div key={item.productId} className="flex flex-col gap-3 h-full">
          <Link href={`/shop/${item.productId}`}>
            <div className="bg-[#F3F3F3] rounded-[15px] flex flex-col w-full h-full items-center pb-2">
              <Button
                size="sm"
                className="bg-[#8B5E3C] hover:bg-[#8B5E3C]/90 rounded-none rounded-tr-[15px] rounded-bl-[15px] text-[10px] sm:text-xs md:text-sm w-fit ml-auto px-2 md:px-4 py-3 md:py-5"
              >
                {item.tagText}
              </Button>
              <Image
                src={item.productImage}
                alt={item.productName}
                width={100}
                height={100}
                className="w-[180px] h-[150px] md:w-[250px] md:h-[220px] object-contain"
              />
            </div>
          </Link>
          <div className="flex flex-col gap-[8px] font-poppins flex-1">
            <div className="flex flex-col gap-[4px]">
              <span className="flex flex-wrap items-center gap-1 text-[#000000CC] text-sm sm:text-base md:text-lg font-medium">
                <h3>{item.productName}</h3>
                <p className="text-nowrap">({item.unit})</p>
              </span>

              <p className="text-[#000000CC] text-[11px] sm:text-xs ml:text-sm">
                By Farmer {item.famersDetails.farmerName.split(" ")[0]},{" "}
                {item.famersDetails.farmerState} State.
              </p>
            </div>

            <p className="font-semibold text-[#1E1E1E] text-sm sm:text-base md:text-lg mt-auto">
              ₦{item.price}
            </p>

            <div className="mt-auto grid grid-cols-[1fr_auto] items-end gap-3 md:gap-[23px] w-full">
              <CartButton item={item} />
              <WishListButton item={item} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
