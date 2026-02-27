"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IFarmProducts, IProducts } from "@/types";
import {
  loadProducts,
  loadFreshPickedProducts,
  loadBestDealsProducts,
} from "@/hooks/getProducts";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useProfile } from "@/context/ProfileContext";
import { CartIcon } from "@/Icons";
import { useRouter } from "next/navigation";
import CartButton from "../CatalogueButtons/CartButton/CartButton";
import WishListButton from "../CatalogueButtons/WishListButton";
import WatchListButton from "../CatalogueButtons/WatchistButton";
import {
  getProductsInDemands,
  getSpecialRequests,
  getByProducts,
  getAllFarmProducts,
} from "@/hooks/getFarmProducts";

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
  const [loading, setLoading] = useState(false);
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
    } else if (category === "byProducts") {
      loadedProducts = getByProducts();
    } else if (category === "allFarm") {
      loadedProducts = getAllFarmProducts();
    }

    setFarmProductList(loadedProducts);
  }, [category]);

  const productsToRender = sliceLimit
    ? productList.slice(0, sliceLimit)
    : productList;

  const farmProductsToRender = sliceLimit
    ? farmProductList.slice(0, sliceLimit)
    : farmProductList;

  const router = useRouter();

  const handleSellProduct = (item: IFarmProducts) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      router.push(`/sell-product/${item.productId}`);
    }, 900);
  };

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
                  <div className="bg-[#F3F3F3] rounded-2xl flex flex-col w-full h-full items-center pb-3">
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
                <div className="flex flex-col gap-3">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleSellProduct(item)}
                    className="flex items-center gap-3 w-full h-[35px] lg:h-[50px]"
                    loading={loading}
                    disabled={loading}
                  >
                    <CartIcon className="w-5 h-5 hidden sm:block" fill="#fff" />
                    {loading ? loading : "Sell Product"}
                  </Button>
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
                  <div className="bg-[#F3F3F3] rounded-2xl flex flex-col w-full h-full items-center pb-2">
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
