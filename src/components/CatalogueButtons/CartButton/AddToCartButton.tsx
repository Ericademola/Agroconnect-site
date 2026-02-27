"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CartIcon } from "@/Icons";
import { IProducts, CartItem, IAddOns } from "@/types";
import { useCartActions } from "@/hooks/useCartActions";
import { cn } from "@/lib/utils";
import { useSavingsActions } from "@/hooks/useSavingActions";
import { ISavingsCartItem } from "@/hooks/getSavings";
import { ILoanCartItem } from "@/hooks/getLoans";
import { useLoanActions } from "@/hooks/useLoanActions";

interface AddToCartButtonProps {
  item: IProducts;
  quantity: number;
  onQuantityChange?: (items: CartItem[]) => void;
  onSaveQuantityChange?: (items: ISavingsCartItem[]) => void;
  onLoanQuantityChange?: (items: ILoanCartItem[]) => void;
  className?: string;
  addOns?: IAddOns[];
  actionType: string;
}

export default function AddToCartButton({
  item,
  quantity,
  onQuantityChange,
  className,
  addOns,
  actionType,
  onSaveQuantityChange,
  onLoanQuantityChange,
}: AddToCartButtonProps) {
  const [loading, setLoading] = useState(false);
  const { updateCart } = useCartActions(onQuantityChange);
  const { updateSavingsCartItem } = useSavingsActions(onSaveQuantityChange);
  const { updateLoanCartItem } = useLoanActions(onLoanQuantityChange);

  const handleAddToCart = () => {
    if (quantity <= 0) return;

    setLoading(true);
    setTimeout(() => {
      updateCart(item, quantity, addOns ?? []);
      setLoading(false);
    }, 600);
  };

  const handleAddToSavings = () => {
    if (quantity <= 0) return;

    setLoading(true);
    setTimeout(() => {
      updateSavingsCartItem(item, quantity, addOns ?? []);
      setLoading(false);
    }, 600);
  };

  const handleAddToLoan = () => {
    if (quantity <= 0) return;

    setLoading(true);
    setTimeout(() => {
      updateLoanCartItem(item, quantity, addOns ?? []);
      setLoading(false);
    }, 600);
  };

  return (
    <>
      {actionType === "buy" ? (
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
      ) : actionType === "loan" ? (
        <Button
          onClick={handleAddToLoan}
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
          {loading ? loading : "Add To Loan"}
        </Button>
      ) : (
        <Button
          onClick={handleAddToSavings}
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
          {loading ? loading : "Add To Savings"}
        </Button>
      )}
    </>
  );
}
