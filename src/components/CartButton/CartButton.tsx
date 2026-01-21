"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CartItem, IProducts } from "@/types";
import {
  getBasketItems,
  getItemQuantity,
  setBasketItems,
  setItemQuantity,
} from "@/hooks/getProducts";
import { CartIcon, MinusIcon, PlusIcon } from "@/Icons";
import { cn } from "@/lib/utils";

interface CartButtonProps {
  item: IProducts;
  onQuantityChange?: (items: CartItem[]) => void;
  className?: string;
}

export default function CartButton({
  item,
  onQuantityChange,
  className,
}: CartButtonProps) {
  const [loading, setLoading] = useState(false);
  const [showQtyButtons, setShowQtyButtons] = useState(false);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const storedQty = getItemQuantity(item.productId);
    if (storedQty > 0) {
      setQuantity(storedQty);
      setShowQtyButtons(true);
    }
  }, [item.productId]);

  const updateCart = (newQty: number) => {
    setItemQuantity(item.productId, newQty);

    const items = getBasketItems();
    const index = items.findIndex((i) => i.productId === item.productId);

    if (index >= 0) {
      items[index].quantity = newQty;
    } else {
      items.push({ ...item, quantity: newQty });
    }

    const filteredItems = items.filter((i) => i.quantity > 0);
    setBasketItems(filteredItems);

    if (typeof onQuantityChange === "function") {
      onQuantityChange(filteredItems);
    }
  };

  const handleAddToCartClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowQtyButtons(true);
      setQuantity(1);
      updateCart(1);
    }, 900);
  };

  const handleIncrement = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    updateCart(newQty);
  };

  const handleDecrement = () => {
    const newQty = quantity - 1;
    if (newQty <= 0) {
      setShowQtyButtons(false);
      setQuantity(0);
      updateCart(0);
    } else {
      setQuantity(newQty);
      updateCart(newQty);
    }
  };

  return (
    <div className={cn("mt-2 flex gap-2 w-full", className)}>
      {!showQtyButtons && (
        <Button
          variant="default"
          size="lg"
          onClick={handleAddToCartClick}
          className="flex items-center gap-2 w-full px-0 sm:px-auto h-[40px] lg:h-[50px] text-xs sm:text-sm md:text-base"
          loading={loading}
          disabled={loading}
        >
          <CartIcon className="w-4 h-4 sm:w-5 sm:h-5" fill="#fff" />
          {loading ? loading : "Add to Cart"}
        </Button>
      )}
      {showQtyButtons && (
        <div className="flex items-center justify-between gap-2 border border-[#0000001A] rounded-md w-full">
          <Button
            onClick={handleDecrement}
            variant="secondary"
            size="lg"
            className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] px-0"
          >
            <MinusIcon className="w-5 h-5 " />
          </Button>
          <p className="text-sm md:text-base lg:text-xl font-poppins">
            {quantity}
          </p>
          <Button
            onClick={handleIncrement}
            variant="secondary"
            size="lg"
            className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] px-0"
          >
            <PlusIcon className="w-5 h-5 " />
          </Button>
        </div>
      )}
    </div>
  );
}
