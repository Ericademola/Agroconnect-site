"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CartItem, IProducts } from "@/types";
import { getItemQuantity } from "@/hooks/getProducts";
import { CartIcon } from "@/Icons";
import { cn } from "@/lib/utils";
import DecrementAndIncrementButton from "./DecrementAndIncrementButton";
import { useCartActions } from "@/hooks/useCartActions";

interface CartButtonProps {
  item: IProducts | CartItem;
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

  const { updateCart } = useCartActions(onQuantityChange);

  const existingAddOns = item.addOns || [];

  useEffect(() => {
    const storedQty = getItemQuantity(item.productId);
    if (storedQty > 0) {
      setQuantity(storedQty);
      setShowQtyButtons(true);
    }
  }, [item.productId]);

  const handleAddToCartClick = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setShowQtyButtons(true);
      setQuantity(1);
      updateCart(item, 1, existingAddOns);
    }, 900);
  };

  const handleIncrement = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    updateCart(item, newQty, existingAddOns);
  };

  const handleDecrement = () => {
    const newQty = quantity - 1;

    if (newQty <= 0) {
      setQuantity(0);
      setShowQtyButtons(false);
      updateCart(item, 0, existingAddOns);
    } else {
      setQuantity(newQty);
      updateCart(item, newQty, existingAddOns);
    }
  };

  return (
    <div className={cn("mt-2 flex gap-2 w-full", className)}>
      {!showQtyButtons && (
        <Button
          variant="default"
          size="sm"
          onClick={handleAddToCartClick}
          className="flex items-center gap-2 w-full h-[35px] lg:h-[50px]"
          loading={loading}
          disabled={loading}
        >
          <CartIcon className="w-4 h-4 sm:w-5 sm:h-5" fill="#fff" />
          {loading ? "Loading..." : "Add to Cart"}
        </Button>
      )}

      {showQtyButtons && (
        <DecrementAndIncrementButton
          quantity={quantity}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />
      )}
    </div>
  );
}
