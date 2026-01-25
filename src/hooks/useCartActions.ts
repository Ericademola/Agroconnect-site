"use client";

import { CartItem, IAddOns, IProducts } from "@/types";
import {
  getBasketItems,
  setBasketItems,
  setItemQuantity,
} from "@/hooks/getProducts";

export function useCartActions(onQuantityChange?: (items: CartItem[]) => void) {
  const sync = (items: CartItem[]) => {
    setBasketItems(items);
    onQuantityChange?.(items);
  };

  const updateCart = (item: IProducts, quantity: number, addOns: IAddOns[]) => {
    setItemQuantity(item.productId, quantity);

    const items = getBasketItems();
    const index = items.findIndex((i) => i.productId === item.productId);

    if (index >= 0) {
      items[index].quantity = quantity;
      items[index].addOns = addOns;
    } else {
      items.push({ ...item, quantity, addOns });
    }

    sync(items.filter((i) => i.quantity > 0));
  };

  const removeFromCart = (productId: number) => {
    setItemQuantity(productId, 0);

    const items = getBasketItems().filter(
      (item) => item.productId !== productId,
    );

    sync(items);
  };

  return { updateCart, removeFromCart };
}
