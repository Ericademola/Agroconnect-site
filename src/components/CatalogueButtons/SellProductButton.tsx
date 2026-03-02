"use client";
import { CartIcon } from "@/Icons";
import { Button } from "../ui/button";
import { IFarmProducts } from "@/types";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SellProductButton = ({ item }: { item: IFarmProducts }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push(`/sell-product/${item.productId}`);
    }, 900);
  };

  return (
    <Button
      variant="default"
      size="sm"
      onClick={handleClick}
      className="flex items-center gap-3 w-full h-[35px] lg:h-[50px]"
      loading={loading}
      disabled={loading}
    >
      <CartIcon className="w-5 h-5 hidden sm:block" fill="#fff" />
      {loading ? "" : "Sell Product"}
    </Button>
  );
};

export default SellProductButton;
