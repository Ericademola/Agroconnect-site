import { IProducts } from "@/types";
import { products } from "../../products";

let localStorageKey = "Products";
let basketItemsKey = "BasketItems";
let basketItemKey = "BasketItem";

export const saveProducts = (products: IProducts[]) => {
  localStorage.setItem(localStorageKey, JSON.stringify(products));
};

export const loadProducts = () => {
  const stored = localStorage.getItem(localStorageKey);

  if (stored) {
    return JSON.parse(stored);
  } else {
    saveProducts(products);
    return products;
  }
};

export const getProducts = () => {
  const stored = localStorage.getItem(localStorageKey);
  return stored ? JSON.parse(stored) : [];
};

export const getProductById = (id: number) => {
  const products = getProducts();
  return products.find((item: IProducts) => item.id === id);
};
