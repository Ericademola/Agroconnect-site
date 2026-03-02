import {
  byProducts,
  productsInDemands,
  specialRequests,
} from "@/data/products";
import { emitWatchlistUpdate } from "@/lib/events";
import { IFarmProducts, WatchlistItem } from "@/types";

const LOCAL_ALL_FARM_PRODUCTS_KEY = "AllFarmProducts";
const LOCAL_PRODUCTS_IN_DEMANDS = "ProductsInDemands";
const LOCAL_SPECIAL_REQUESTS = "SpecialRequests";
const LOCAL_BY_PRODUCTS = "ByProducts";
const WATCHLIST_ITEMS_KEY = "WatchlistItem";

// ============================================
// FARM PRODUCTS FUNCTIONS
// ============================================

// Store initial product lists in localStorage
export const saveFarmProducts = (
  inDemand: IFarmProducts[],
  special: IFarmProducts[],
  byProduct: IFarmProducts[],
): void => {
  localStorage.setItem(LOCAL_PRODUCTS_IN_DEMANDS, JSON.stringify(inDemand));
  localStorage.setItem(LOCAL_SPECIAL_REQUESTS, JSON.stringify(special));
  const allProducts = [...inDemand, ...special];
  localStorage.setItem(
    LOCAL_ALL_FARM_PRODUCTS_KEY,
    JSON.stringify(allProducts),
  );
  localStorage.setItem(LOCAL_BY_PRODUCTS, JSON.stringify(byProduct));
};

// Load products in demand from localStorage or default list
export const loadProductsInDemands = (): IFarmProducts[] => {
  const stored = localStorage.getItem(LOCAL_PRODUCTS_IN_DEMANDS);
  if (stored) return JSON.parse(stored);

  saveFarmProducts(productsInDemands, specialRequests, byProducts);
  return productsInDemands;
};

// Load special requests from localStorage or default list
export const loadSpecialRequests = (): IFarmProducts[] => {
  const stored = localStorage.getItem(LOCAL_SPECIAL_REQUESTS);
  if (stored) return JSON.parse(stored);

  saveFarmProducts(productsInDemands, specialRequests, byProducts);
  return specialRequests;
};

// Load by products from localStorage or default list
export const loadByProducts = (): IFarmProducts[] => {
  const stored = localStorage.getItem(LOCAL_BY_PRODUCTS);
  if (stored) return JSON.parse(stored);

  saveFarmProducts(productsInDemands, specialRequests, byProducts);
  return byProducts;
};

export const getProductsInDemands = (): IFarmProducts[] => {
  const stored = localStorage.getItem(LOCAL_PRODUCTS_IN_DEMANDS);
  if (stored) return JSON.parse(stored);
  return loadProductsInDemands();
};

export const getSpecialRequests = (): IFarmProducts[] => {
  const stored = localStorage.getItem(LOCAL_SPECIAL_REQUESTS);
  if (stored) return JSON.parse(stored);
  return loadSpecialRequests();
};

export const getByProducts = (): IFarmProducts[] => {
  const stored = localStorage.getItem(LOCAL_BY_PRODUCTS);
  if (stored) return JSON.parse(stored);
  return loadByProducts();
};

// Return all farm products from localStorage
export const getAllFarmProducts = (): IFarmProducts[] => {
  const stored = localStorage.getItem(LOCAL_ALL_FARM_PRODUCTS_KEY);
  if (stored) return JSON.parse(stored);

  // If not found, combine both sections
  const inDemand = loadProductsInDemands();
  const special = loadSpecialRequests();
  return [...inDemand, ...special];
};

// Find farm product by ID (searches across all products)
export const getFarmProductById = (id: number): IFarmProducts | undefined => {
  return getAllFarmProducts().find((item) => item.productId === id);
};

// Find By-product by ID (searches across all products)
export const getByProductById = (id: number): IFarmProducts | undefined => {
  return getByProducts().find((item) => item.productId === id);
};

// ============================================
// WATCHLIST FUNCTIONS
// ============================================

// Get current items in watchlist
export const getWatchlistItems = (): WatchlistItem[] => {
  const stored = localStorage.getItem(WATCHLIST_ITEMS_KEY);
  const parsed = stored ? JSON.parse(stored) : [];
  return parsed.map((item: IFarmProducts) => ({
    ...item,
    quantity: item.quantity ?? 1,
  }));
};

// Add or update watchlist items
export const setWatchlistItems = (items: WatchlistItem[]): void => {
  localStorage.setItem(WATCHLIST_ITEMS_KEY, JSON.stringify(items));
  emitWatchlistUpdate();
};

// Check if item is in watchlist
export const isInWatchlist = (id: number): boolean => {
  const items = getWatchlistItems();
  return items.some((item) => item.productId === id);
};

// Add item to watchlist
export const addToWatchlist = (product: IFarmProducts): void => {
  const items = getWatchlistItems();
  const exists = items.find((item) => item.productId === product.productId);

  if (!exists) {
    const watchlistItem: WatchlistItem = { ...product, quantity: 1 };
    items.push(watchlistItem);
    setWatchlistItems(items);
  }
};

// Remove item from watchlist
export const removeFromWatchlist = (id: number): void => {
  const items = getWatchlistItems();
  const filtered = items.filter((item) => item.productId !== id);
  setWatchlistItems(filtered);
};

// Get total watchlist count
export const getTotalWatchlistCount = (): number => {
  return getWatchlistItems().length;
};

// Clear watchlist from localStorage
export const clearWatchlist = (): void => {
  localStorage.removeItem(WATCHLIST_ITEMS_KEY);
  emitWatchlistUpdate();
};
