"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CartItem, IProducts } from "@/types";
import { getItemQuantity, getBasketItems } from "@/hooks/getProducts";
import {
  getSavingsCart,
  getSavingsCartItemQuantity,
  ISavingsCartItem,
} from "@/hooks/getSavings";
import { CartIcon } from "@/Icons";
import { cn } from "@/lib/utils";
import DecrementAndIncrementButton from "./DecrementAndIncrementButton";
import { useCartActions } from "@/hooks/useCartActions";
import { usePathname } from "next/navigation";
import { useSavingsActions } from "@/hooks/useSavingActions";
import { useMediaQuery } from "react-responsive";

interface CartButtonProps {
  item: IProducts | CartItem;
  onQuantityChange?: (items: CartItem[]) => void;
  onSaveQuantityChange?: (items: ISavingsCartItem[]) => void;
  className?: string;
  actionType?: string;
}

export default function CartButton({
  item,
  onQuantityChange,
  className,
  onSaveQuantityChange,
  actionType,
}: CartButtonProps) {
  const [loading, setLoading] = useState(false);
  const [showQtyButtons, setShowQtyButtons] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const { updateCart } = useCartActions(onQuantityChange);
  const { updateSavingsCartItem } = useSavingsActions(onSaveQuantityChange);
  const pathname = usePathname();
  const isSavingsPage =
    pathname === "/savings-shop" || pathname === "/cart/cart-savings";

  useEffect(() => {
    const storedQty = isSavingsPage
      ? getSavingsCartItemQuantity(item.productId)
      : getItemQuantity(item.productId);

    if (storedQty > 0) {
      setQuantity(storedQty);
      setShowQtyButtons(true);
    }
  }, [item.productId, isSavingsPage]);

  const handleAddToSavings = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setShowQtyButtons(true);
      setQuantity(1);
      updateSavingsCartItem(item as IProducts, 1, []);
    }, 900);
  };

  const handleAddToCartClick = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setShowQtyButtons(true);
      setQuantity(1);
      updateCart(item as IProducts, 1, []);
    }, 900);
  };

  const handleIncrement = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);

    if (isSavingsPage) {
      const savedItems = getSavingsCart();
      const savedItem = savedItems.find(
        (item) => item.productId === item.productId,
      );
      const existingAddOns = savedItem?.addOns || [];
      updateSavingsCartItem(item as IProducts, newQty, existingAddOns);
    } else {
      const basketItems = getBasketItems();
      const cartItem = basketItems.find((c) => c.productId === item.productId);
      const existingAddOns = cartItem?.addOns || [];
      updateCart(item as IProducts, newQty, existingAddOns);
    }
  };

  const handleDecrement = () => {
    const newQty = quantity - 1;

    if (isSavingsPage) {
      const savedItems = getSavingsCart();
      const savedItem = savedItems.find(
        (item) => item.productId === item.productId,
      );
      const existingAddOns = savedItem?.addOns || [];

      if (newQty <= 0) {
        setQuantity(0);
        setShowQtyButtons(false);
        updateSavingsCartItem(item as IProducts, 0, existingAddOns);
      } else {
        setQuantity(newQty);
        updateSavingsCartItem(item as IProducts, newQty, existingAddOns);
      }
    } else {
      const basketItems = getBasketItems();
      const cartItem = basketItems.find((c) => c.productId === item.productId);
      const existingAddOns = cartItem?.addOns || [];

      if (newQty <= 0) {
        setQuantity(0);
        setShowQtyButtons(false);
        updateCart(item as IProducts, 0, existingAddOns);
      } else {
        setQuantity(newQty);
        updateCart(item as IProducts, newQty, existingAddOns);
      }
    }
  };

  const isMobile = useMediaQuery({
    query: "(max-width: 640px)",
  });

  return (
    <div className={cn("mt-2 flex gap-2 w-full", className)}>
      {!showQtyButtons && (
        <div className="w-full">
          {isSavingsPage || actionType === "save" ? (
            <Button
              variant="default"
              size="sm"
              onClick={handleAddToSavings}
              className="flex items-center gap-2 w-full h-[35px] lg:h-[50px]"
              loading={loading}
              disabled={loading}
            >
              <CartIcon className="w-5 h-5 hidden sm:block" fill="#fff" />
              {loading ? (isMobile ? loading : "Adding...") : "Add to Savings"}
            </Button>
          ) : (
            <Button
              variant="default"
              size="sm"
              onClick={handleAddToCartClick}
              className="flex items-center gap-2 w-full h-[35px] lg:h-[50px]"
              loading={loading}
              disabled={loading}
            >
              <CartIcon className="w-4 h-4 sm:w-5 sm:h-5" fill="#fff" />
              {loading ? "Adding..." : "Add to Cart"}
            </Button>
          )}
        </div>
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
