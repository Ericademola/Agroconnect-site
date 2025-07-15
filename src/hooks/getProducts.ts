import { CartItem, IProducts } from "@/types";
import { products } from "../../products";

// LocalStorage Keys
const LOCAL_PRODUCTS_KEY = "Products";
const BASKET_ITEMS_KEY = "BasketItems";
const BASKET_QUANTITY_MAP_KEY = "BasketItem"; // ID -> quantity

//  Store initial product list in localStorage
export const saveProducts = (products: IProducts[]) => {
  localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(products));
};

// Load products from localStorage or default list
export const loadProducts = (): IProducts[] => {
  const stored = localStorage.getItem(LOCAL_PRODUCTS_KEY);
  if (stored) return JSON.parse(stored);

  saveProducts(products);
  return products;
};

// Return products from localStorage
export const getProducts = (): IProducts[] => {
  const stored = localStorage.getItem(LOCAL_PRODUCTS_KEY);
  return stored ? JSON.parse(stored) : [];
};

// Find product by ID
export const getProductById = (id: number): IProducts | undefined => {
  return getProducts().find((item) => item.id === id);
};

//  Add or update cart items
export const setBasketItems = (items: IProducts[]): void => {
  localStorage.setItem(BASKET_ITEMS_KEY, JSON.stringify(items));
};

// Get current items in cart
export const getBasketItems = (): CartItem[] => {
  const stored = localStorage.getItem(BASKET_ITEMS_KEY);
  const parsed = stored ? JSON.parse(stored) : [];
  return parsed.map((item: any) => ({
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

export const clearLocalStorage = (): void => {
  localStorage.removeItem(BASKET_ITEMS_KEY);
  localStorage.removeItem(BASKET_QUANTITY_MAP_KEY);
  getTotalBasketCount();
};
