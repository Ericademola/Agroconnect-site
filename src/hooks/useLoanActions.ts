"use client";
import { IAddOns, IProducts } from "@/types";
import {
  addToLoanCart,
  getLoanedPlans,
  getLoanCart,
  ILoanCartItem,
  ILoanItem,
  removeFromLoanCart,
} from "./getLoans";

export function useLoanActions(
  onLoanCartChange?: (cartItems: ILoanCartItem[]) => void,
) {
  const syncCart = () => {
    const cart = getLoanCart();
    onLoanCartChange?.(cart);
  };

  /**
   * Add or update an item in the Loan cart (temporary cart)
   */
  const addToLoans = (item: IProducts, quantity: number, addOns: IAddOns[]) => {
    addToLoanCart(item.productId, quantity, addOns);
    syncCart();
  };

  /**
   * Remove an item from the Loans cart
   */
  const removeFromLoans = (productId: number) => {
    removeFromLoanCart(productId);
    syncCart();
  };

  /**
   * Update quantity and addOns for an item in the Loan cart
   */
  const updateLoanCartItem = (
    item: IProducts,
    quantity: number,
    addOns: IAddOns[],
  ) => {
    addToLoanCart(item.productId, quantity, addOns);
    syncCart();
  };

  return {
    addToLoans,
    removeFromLoans,
    updateLoanCartItem,
  };
}

/**
 * Hook for managing Loan plans (actual Loan plans)
 */
export function useLoanPlansActions(
  onLoanPlansChange?: (plans: ILoanItem[]) => void,
) {
  const syncPlans = () => {
    const plans = getLoanedPlans();
    onLoanPlansChange?.(plans);
  };

  return {
    syncPlans,
  };
}
