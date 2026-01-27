import { CartItem, IProducts, WishlistItem } from "@/types";
import { emitCartUpdate, emitWishlistUpdate } from "@/lib/events";
import { bestDealsProducts, freshPickedProducts } from "../data/products";

// LocalStorage Keys
const LOCAL_PRODUCTS_KEY = "Products";
const LOCAL_FRESH_PICKED_KEY = "FreshPickedProducts";
const LOCAL_BEST_DEALS_KEY = "BestDealsProducts";
const BASKET_ITEMS_KEY = "BasketItems";
const BASKET_QUANTITY_MAP_KEY = "BasketItem";
const WISHLIST_ITEMS_KEY = "WishlistItems";

// ============================================
// PRODUCTS FUNCTIONS
// ============================================

// Store initial product lists in localStorage
export const saveProducts = (fresh: IProducts[], deals: IProducts[]): void => {
  localStorage.setItem(LOCAL_FRESH_PICKED_KEY, JSON.stringify(fresh));
  localStorage.setItem(LOCAL_BEST_DEALS_KEY, JSON.stringify(deals));
  const allProducts = [...fresh, ...deals];
  localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(allProducts));
};

// Load fresh picked products from localStorage or default list
export const loadFreshPickedProducts = (): IProducts[] => {
  const stored = localStorage.getItem(LOCAL_FRESH_PICKED_KEY);
  if (stored) return JSON.parse(stored);

  saveProducts(freshPickedProducts, bestDealsProducts);
  return freshPickedProducts;
};

// Load best deals products from localStorage or default list
export const loadBestDealsProducts = (): IProducts[] => {
  const stored = localStorage.getItem(LOCAL_BEST_DEALS_KEY);
  if (stored) return JSON.parse(stored);

  saveProducts(freshPickedProducts, bestDealsProducts);
  return bestDealsProducts;
};

// Load all products from localStorage or default lists
export const loadProducts = (): IProducts[] => {
  const stored = localStorage.getItem(LOCAL_PRODUCTS_KEY);
  if (stored) return JSON.parse(stored);

  const allProducts = [...freshPickedProducts, ...bestDealsProducts];
  saveProducts(freshPickedProducts, bestDealsProducts);
  return allProducts;
};

// Return all products from localStorage
export const getProducts = (): IProducts[] => {
  const stored = localStorage.getItem(LOCAL_PRODUCTS_KEY);
  if (stored) return JSON.parse(stored);

  // If not found, combine both sections
  const fresh = loadFreshPickedProducts();
  const deals = loadBestDealsProducts();
  return [...fresh, ...deals];
};

// Return fresh picked products from localStorage
export const getFreshPickedProducts = (): IProducts[] => {
  const stored = localStorage.getItem(LOCAL_FRESH_PICKED_KEY);
  return stored ? JSON.parse(stored) : [];
};

// Return best deals products from localStorage
export const getBestDealsProducts = (): IProducts[] => {
  const stored = localStorage.getItem(LOCAL_BEST_DEALS_KEY);
  return stored ? JSON.parse(stored) : [];
};

// Find product by ID (searches across all products)
export const getProductById = (id: number): IProducts | undefined => {
  return getProducts().find((item) => item.productId === id);
};

// ============================================
// CART/BASKET FUNCTIONS
// ============================================

// Add or update cart items
export const setBasketItems = (items: CartItem[]): void => {
  localStorage.setItem(BASKET_ITEMS_KEY, JSON.stringify(items));
  emitCartUpdate();
};

// Get current items in cart
export const getBasketItems = (): CartItem[] => {
  const stored = localStorage.getItem(BASKET_ITEMS_KEY);
  const parsed = stored ? JSON.parse(stored) : [];
  return parsed.map((item: IProducts) => ({
    ...item,
    quantity: item.quantity ?? 1,
  }));
};

// Save specific item quantity (used for quick lookup/map)
export const setItemQuantity = (id: number, quantity: number): void => {
  const stored = localStorage.getItem(BASKET_QUANTITY_MAP_KEY);
  const map = stored ? JSON.parse(stored) : {};
  map[id] = quantity;
  localStorage.setItem(BASKET_QUANTITY_MAP_KEY, JSON.stringify(map));
  emitCartUpdate();
};

// Get specific item quantity from quick map
export const getItemQuantity = (id: number): number => {
  const stored = localStorage.getItem(BASKET_QUANTITY_MAP_KEY);
  const map = stored ? JSON.parse(stored) : {};
  return map[id] ?? 0;
};

// Get total count of items in basket
export const getTotalBasketCount = (): number => {
  const items = getBasketItems();
  return items.reduce((sum, item) => sum + (item.quantity || 1), 0);
};

// Clear cart/basket from localStorage
export const clearLocalStorage = (): void => {
  localStorage.removeItem(BASKET_ITEMS_KEY);
  localStorage.removeItem(BASKET_QUANTITY_MAP_KEY);
  emitCartUpdate();
};

// ============================================
// WISHLIST FUNCTIONS
// ============================================

// Get current items in wishlist
export const getWishlistItems = (): WishlistItem[] => {
  const stored = localStorage.getItem(WISHLIST_ITEMS_KEY);
  const parsed = stored ? JSON.parse(stored) : [];
  return parsed.map((item: IProducts) => ({
    ...item,
    quantity: item.quantity ?? 1,
  }));
};

// Add or update wishlist items
export const setWishlistItems = (items: WishlistItem[]): void => {
  localStorage.setItem(WISHLIST_ITEMS_KEY, JSON.stringify(items));
  emitWishlistUpdate();
};

// Check if item is in wishlist
export const isInWishlist = (id: number): boolean => {
  const items = getWishlistItems();
  return items.some((item) => item.productId === id);
};

// Add item to wishlist
export const addToWishlist = (product: IProducts): void => {
  const items = getWishlistItems();
  const exists = items.find((item) => item.productId === product.productId);

  if (!exists) {
    const wishlistItem: WishlistItem = { ...product, quantity: 1 };
    items.push(wishlistItem);
    setWishlistItems(items);
  }
};

// Remove item from wishlist
export const removeFromWishlist = (id: number): void => {
  const items = getWishlistItems();
  const filtered = items.filter((item) => item.productId !== id);
  setWishlistItems(filtered);
};

// Get total wishlist count
export const getTotalWishlistCount = (): number => {
  return getWishlistItems().length;
};

// Clear wishlist from localStorage
export const clearWishlist = (): void => {
  localStorage.removeItem(WISHLIST_ITEMS_KEY);
  emitWishlistUpdate();
};
