"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IByProducts, IFarmProducts, IProducts } from "@/types";
import {
  loadProducts,
  loadFreshPickedProducts,
  loadBestDealsProducts,
} from "@/hooks/getProducts";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useProfile } from "@/context/ProfileContext";
import CartButton from "../CatalogueButtons/CartButton/CartButton";
import WishListButton from "../CatalogueButtons/WishListButton";
import WatchListButton from "../CatalogueButtons/WatchistButton";
import {
  getProductsInDemands,
  getSpecialRequests,
  getByProducts,
  getAllFarmProducts,
} from "@/hooks/getFarmProducts";
import SellProductButton from "../CatalogueButtons/SellProductButton";

type ProductCategory =
  | "all"
  | "fresh"
  | "deals"
  | "special"
  | "byProducts"
  | "inDemand"
  | "allFarm";

interface CatalogueProps {
  excludeId?: number;
  category?: ProductCategory;
  sliceLimit?: number;
  className?: string;
  actionType?: string;
}

export default function Catalogue({
  excludeId,
  category = "all",
  sliceLimit,
  className,
  actionType,
}: CatalogueProps) {
  const [productList, setProductList] = useState<IProducts[]>([]);
  const [farmProductList, setFarmProductList] = useState<IFarmProducts[]>([]);
  const [byProductList, setByProductList] = useState<IByProducts[]>([]);
  const { activeProfile } = useProfile();
  const isFarmerAccount = activeProfile === "FARMER";

  useEffect(() => {
    let loadedProducts: IProducts[] = [];

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

    const filtered = excludeId
      ? loadedProducts.filter((p) => p.productId !== excludeId)
      : loadedProducts;

    setProductList(filtered);
  }, [excludeId, category]);

  useEffect(() => {
    let loadedProducts: IFarmProducts[] = [];

    if (category === "inDemand") {
      loadedProducts = getProductsInDemands();
    } else if (category === "special") {
      loadedProducts = getSpecialRequests();
    } else if (category === "allFarm") {
      loadedProducts = getAllFarmProducts();
    }

    setFarmProductList(loadedProducts);
  }, [category]);

  useEffect(() => {
    let loadedProducts: IByProducts[] = [];
    if (category === "byProducts") {
      loadedProducts = getByProducts();
    }

    setByProductList(loadedProducts);
  }, [category]);

  const productsToRender = sliceLimit
    ? productList.slice(0, sliceLimit)
    : productList;

  const farmProductsToRender = sliceLimit
    ? farmProductList.slice(0, sliceLimit)
    : farmProductList;

  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-7",
        className,
      )}
    >
      <>
        {isFarmerAccount ? (
          <>
            {farmProductsToRender.map((item: IFarmProducts) => (
              <div key={item.productId} className="flex flex-col gap-3 h-full">
                <div className="flex flex-col gap-3">
                  <div className="bg-[#F3F3F3] rounded-[8px] md:rounded-2xl flex flex-col w-full h-full items-center pb-3 gap-2">
                    <Button className="bg-[#8B5E3C] rounded-none rounded-tr-[8px] md:rounded-tr-2xl rounded-bl-[8px] md:rounded-bl-2xl text-[clamp(10px,1.2vw,14px)] w-fit ml-auto px-2 md:px-4 py-3 md:py-5">
                      {item.tagText}
                    </Button>
                    <Image
                      src={item.productImage}
                      alt={item.productName}
                      width={100}
                      height={100}
                      className="w-[85%] h-[150px] md:h-[220px] object-contain"
                    />
                  </div>
                  <div className="flex flex-col gap-[8px] font-poppins">
                    <div className="flex flex-col gap-[4px]">
                      <span className="flex flex-wrap items-center gap-1 text-[#000000CC] text-sm sm:text-base md:text-lg font-medium">
                        <h3>{item.productName}</h3>
                        {item.unit !== "Fresh" && (
                          <p className="text-nowrap">
                            (
                            {item.unit === "Basket" || item.unit === "Bunch"
                              ? `Per ${item.unit}`
                              : item.unit}
                            )
                          </p>
                        )}
                      </span>

                      <p className="text-[#000000CC] text-[11px] sm:text-xs ml:text-sm">
                        {item.unit}
                      </p>
                    </div>

                    <p className="font-semibold text-[#1E1E1E] text-sm sm:text-base md:text-lg mt-auto">
                      ₦ {""}
                      {item.price.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 mt-auto">
                  <SellProductButton item={item} />
                  <WatchListButton item={item} />
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            {productsToRender.map((item: IProducts) => (
              <div key={item.productId} className="flex flex-col gap-3 h-full">
                <Link
                  href={`/shop/${actionType}-${item.productId}`}
                  className="flex flex-col gap-3"
                >
                  <div className="bg-[#F3F3F3] rounded-[8px] md:rounded-2xl flex flex-col w-full h-full items-center pb-3 gap-2">
                    <Button className="bg-[#8B5E3C] rounded-none rounded-tr-[8px] md:rounded-tr-2xl rounded-bl-[8px] md:rounded-bl-2xl text-[clamp(10px,1.2vw,14px)] w-fit ml-auto px-2 md:px-4 py-3 md:py-5">
                      {item.tagText}
                    </Button>
                    <Image
                      src={item.productImage}
                      alt={item.productName}
                      width={100}
                      height={100}
                      className="w-[85%] h-[150px] md:h-[220px] object-contain"
                    />
                  </div>
                  <div className="flex flex-col gap-[8px] font-poppins">
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
                      ₦ {""}
                      {item.price.toLocaleString()}
                    </p>
                  </div>
                </Link>

                <div className="mt-auto grid grid-cols-[1fr_auto] items-end gap-3 md:gap-[23px] w-full">
                  <CartButton item={item} actionType={actionType} />
                  <WishListButton item={item} />
                </div>
              </div>
            ))}
          </>
        )}
      </>
    </div>
  );
}
