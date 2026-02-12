export const CART_UPDATED_EVENT = "cartUpdated";
export const WISHLIST_UPDATED_EVENT = "wishlistUpdated";
export const SAVINGS_UPDATED_EVENT = "savingsUpdated";

export const emitCartUpdate = () => {
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
};

export const emitWishlistUpdate = () => {
  window.dispatchEvent(new Event(WISHLIST_UPDATED_EVENT));
};

export const emitSavingsUpdate = () => {
  window.dispatchEvent(new Event(SAVINGS_UPDATED_EVENT));
};
