import { emitSavingsUpdate } from "@/lib/events";
import { CartItem } from "@/types";

export interface ISavedItem {
  savedItemId: string;
  items: CartItem[];
  saveStatus: "ACTIVE" | "COMPLETED" | "REDEEMED";
  goalAmount: number;
  currentAmountSaved: number;
  balanceAmount: number;
  planDuration: string;
  paymentInterval: string;
  nextPaymentDate: string;
  targetDate: string;
  createdAt: string;
  isAutoDebit: boolean;
}

// Temporary savings cart item (before creating a plan)
export interface ISavingsCartItem {
  productId: number;
  quantity: number;
  addOns: CartItem["addOns"];
}

const SAVED_PLANS_KEY = "SavedPlans";
const SAVINGS_CART_KEY = "SavingsCart";

// ============================================
// SAVINGS CART FUNCTIONS (Temporary cart before plan creation)
// ============================================

export const getSavingsCart = (): ISavingsCartItem[] => {
  const stored = localStorage.getItem(SAVINGS_CART_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveSavingsCart = (cartItems: ISavingsCartItem[]): void => {
  localStorage.setItem(SAVINGS_CART_KEY, JSON.stringify(cartItems));
  emitSavingsUpdate();
};

export const addToSavingsCart = (
  productId: number,
  quantity: number,
  addOns: CartItem["addOns"],
): void => {
  const cart = getSavingsCart();
  const existingIndex = cart.findIndex((item) => item.productId === productId);

  if (existingIndex >= 0) {
    // Update existing item
    cart[existingIndex] = { productId, quantity, addOns };
  } else {
    // Add new item
    cart.push({ productId, quantity, addOns });
  }

  saveSavingsCart(cart.filter((item) => item.quantity > 0));
};

export const removeFromSavingsCart = (productId: number): void => {
  const cart = getSavingsCart().filter((item) => item.productId !== productId);
  saveSavingsCart(cart);
};

export const clearSavingsCart = (): void => {
  localStorage.removeItem(SAVINGS_CART_KEY);
  emitSavingsUpdate();
};

export const getSavingsCartItemQuantity = (productId: number): number => {
  const cart = getSavingsCart();
  const item = cart.find((i) => i.productId === productId);
  return item?.quantity ?? 0;
};

export const getTotalSavingsCartCount = (): number => {
  const items = getSavingsCart();
  return items.reduce((sum, item) => sum + (item.quantity || 1), 0);
};

// ============================================
// SAVED PLANS FUNCTIONS (Actual saved plans)
// ============================================

export const getSavedPlans = (): ISavedItem[] => {
  const stored = localStorage.getItem(SAVED_PLANS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveSavedPlans = (savedPlans: ISavedItem[]): void => {
  localStorage.setItem(SAVED_PLANS_KEY, JSON.stringify(savedPlans));
  emitSavingsUpdate();
};

export const createSavedPlan = (
  savedItemId: string,
  items: CartItem[],
  duration: string,
  paymentInterval: string,
): ISavedItem => {
  const now = new Date();
  const goalAmount = calculateTotalGoalAmount(items);
  const nextPaymentDate = calculateNextPaymentDate(paymentInterval);
  const targetDate = calculateTargetDate(now.toISOString(), duration);

  const newSavedPlan: ISavedItem = {
    savedItemId,
    items,
    saveStatus: "ACTIVE",
    goalAmount,
    currentAmountSaved: 0,
    balanceAmount: goalAmount,
    planDuration: duration,
    paymentInterval,
    nextPaymentDate,
    targetDate,
    createdAt: now.toISOString(),
    isAutoDebit: false,
  };

  const plans = getSavedPlans();
  plans.push(newSavedPlan);
  saveSavedPlans(plans);

  return newSavedPlan;
};

export const getSavedPlanById = (
  savedItemId: string,
): ISavedItem | undefined => {
  const plans = getSavedPlans();
  return plans.find((plan) => plan.savedItemId === savedItemId);
};

export const updateSavedPlan = (
  savedItemId: string,
  updates: Partial<ISavedItem>,
): void => {
  const plans = getSavedPlans();
  const index = plans.findIndex((plan) => plan.savedItemId === savedItemId);

  if (index >= 0) {
    plans[index] = { ...plans[index], ...updates };
    saveSavedPlans(plans);
  }
};

export const deleteSavedPlan = (savedItemId: string): void => {
  const plans = getSavedPlans().filter(
    (plan) => plan.savedItemId !== savedItemId,
  );
  saveSavedPlans(plans);
};

export const clearAllSavedPlans = (): void => {
  localStorage.removeItem(SAVED_PLANS_KEY);
  emitSavingsUpdate();
};

// ============================================
// HELPER FUNCTIONS
// ============================================

const calculateTotalGoalAmount = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    const itemPrice = item.price;
    const addOnsTotal =
      item.addOns?.reduce((sum, addOn) => sum + addOn.price, 0) ?? 0;
    return total + (itemPrice + addOnsTotal) * item.quantity;
  }, 0);
};

const calculateNextPaymentDate = (paymentInterval: string): string => {
  const now = new Date();
  const nextDate = new Date(now);

  switch (paymentInterval.toLowerCase()) {
    case "daily":
      nextDate.setDate(now.getDate() + 1);
      break;
    case "weekly":
      nextDate.setDate(now.getDate() + 7);
      break;
    case "monthly":
      nextDate.setMonth(now.getMonth() + 1);
      break;
    default:
      nextDate.setDate(now.getDate() + 1);
  }

  return nextDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const calculateTargetDate = (
  createdAt: string,
  duration: string,
): string => {
  const createdDate = new Date(createdAt);
  const targetDate = new Date(createdDate);

  // Extract number from "3 months" or "1 month"
  const durationMatch = duration.match(/(\d+)/);
  const durationNumber = durationMatch ? parseInt(durationMatch[1]) : 1;

  // Add months
  targetDate.setMonth(targetDate.getMonth() + durationNumber);

  return targetDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
