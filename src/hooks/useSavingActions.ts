"use client";
import { IAddOns, IProducts } from "@/types";
import {
  addToSavingsCart,
  removeFromSavingsCart,
  getSavingsCart,
  ISavingsCartItem,
  ISavedItem,
  getSavedPlans,
} from "./getSavings";

export function useSavingsActions(
  onSavingsCartChange?: (cartItems: ISavingsCartItem[]) => void,
) {
  const syncCart = () => {
    const cart = getSavingsCart();
    onSavingsCartChange?.(cart);
  };

  /**
   * Add or update an item in the savings cart (temporary cart)
   */
  const addToSavings = (
    item: IProducts,
    quantity: number,
    addOns: IAddOns[],
  ) => {
    addToSavingsCart(item.productId, quantity, addOns);
    syncCart();
  };

  /**
   * Remove an item from the savings cart
   */
  const removeFromSavings = (productId: number) => {
    removeFromSavingsCart(productId);
    syncCart();
  };

  /**
   * Update quantity and addOns for an item in the savings cart
   */
  const updateSavingsCartItem = (
    item: IProducts,
    quantity: number,
    addOns: IAddOns[],
  ) => {
    addToSavingsCart(item.productId, quantity, addOns);
    syncCart();
  };

  return {
    addToSavings,
    removeFromSavings,
    updateSavingsCartItem,
  };
}

/**
 * Hook for managing saved plans (actual savings plans)
 */
export function useSavedPlansActions(
  onSavedPlansChange?: (plans: ISavedItem[]) => void,
) {
  const syncPlans = () => {
    const plans = getSavedPlans();
    onSavedPlansChange?.(plans);
  };

  return {
    syncPlans,
  };
}
