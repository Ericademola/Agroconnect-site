"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CartIcon } from "@/Icons";
import { IProducts, CartItem, IAddOns } from "@/types";
import { useCartActions } from "@/hooks/useCartActions";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  item: IProducts;
  quantity: number;
  onQuantityChange?: (items: CartItem[]) => void;
  className?: string;
  addOns?: IAddOns[];
}

export default function AddToCartButton({
  item,
  quantity,
  onQuantityChange,
  className,
  addOns,
}: AddToCartButtonProps) {
  const [loading, setLoading] = useState(false);
  const { updateCart } = useCartActions(onQuantityChange);

  const handleAddToCart = () => {
    if (quantity <= 0) return;

    setLoading(true);
    setTimeout(() => {
      updateCart(item, quantity, addOns ?? []);
      setLoading(false);
    }, 600);
  };

  return (
    <>
      <Button
        onClick={handleAddToCart}
        loading={loading}
        disabled={loading || quantity <= 0}
        className={cn(
          "flex items-center gap-2 w-full px-0 sm:px-auto h-[40px] lg:h-[50px] text-xs sm:text-sm md:text-base",
          className,
        )}
        variant="default"
        size="lg"
      >
        <CartIcon className="w-4 h-4" fill="#fff" />
        {loading ? loading : "Add to Cart"}
      </Button>
    </>
  );
}
