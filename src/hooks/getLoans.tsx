import { emitLoanUpdate } from "@/lib/events";
import { CartItem } from "@/types";
import { updateUserData } from "./getUserData";

export interface ILoanItem {
  loanPlanId: string;
  items: CartItem[];
  loanStatus: "ACTIVE" | "COMPLETED";
  totalAmount: number;
  amountPaid: number;
  balanceAmount: number;
  interestAmount: number;
  loanDuration: string;
  rePaymentType: string;
  nextPaymentDate: string;
  targetDate: string;
  createdAt: string;
  numberOfPayments: number;
  paymentPerInstallment: number;
  deliveryFee: number;
}

// Temporary loan cart item (before creating a loan plan)
export interface ILoanCartItem {
  productId: number;
  quantity: number;
  addOns: CartItem["addOns"];
}

const LOANED_ITEM_KEY = "LoanPlans";
const LOAN_CART_KEY = "LoanCart";

// ============================================
// LOAN CART FUNCTIONS (Temporary cart before plan creation)
// ============================================

export const getLoanCart = (): ILoanCartItem[] => {
  const stored = localStorage.getItem(LOAN_CART_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveLoanCart = (cartItems: ILoanCartItem[]): void => {
  localStorage.setItem(LOAN_CART_KEY, JSON.stringify(cartItems));
  emitLoanUpdate();
};

export const addToLoanCart = (
  productId: number,
  quantity: number,
  addOns: CartItem["addOns"],
): void => {
  const cart = getLoanCart();
  const existingIndex = cart.findIndex((item) => item.productId === productId);

  if (existingIndex >= 0) {
    // Update existing item
    cart[existingIndex] = { productId, quantity, addOns };
  } else {
    // Add new item
    cart.push({ productId, quantity, addOns });
  }

  saveLoanCart(cart.filter((item) => item.quantity > 0));
};

export const removeFromLoanCart = (productId: number): void => {
  const cart = getLoanCart().filter((item) => item.productId !== productId);
  saveLoanCart(cart);
};

export const clearLoanCart = (): void => {
  localStorage.removeItem(LOAN_CART_KEY);
  emitLoanUpdate();
};

export const getLoanCartItemQuantity = (productId: number): number => {
  const cart = getLoanCart();
  const item = cart.find((i) => i.productId === productId);
  return item?.quantity ?? 0;
};

export const getTotalLoanCartCount = (): number => {
  const items = getLoanCart();
  return items.reduce((sum, item) => sum + (item.quantity || 1), 0);
};

// ============================================
// LOAN PLAN FUNCTIONS (Actual loan Plan)
// ============================================

export const getLoanedPlans = (): ILoanItem[] => {
  const stored = localStorage.getItem(LOANED_ITEM_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveLoanedPlans = (loanPlan: ILoanItem[]): void => {
  localStorage.setItem(LOANED_ITEM_KEY, JSON.stringify(loanPlan));
  emitLoanUpdate();
};

export const createLoanPlan = (
  loanPlanId: string,
  items: CartItem[],
  loanConfig: {
    duration: string;
    paymentInterval: string;
    totalAmount: number;
    interestAmount: number;
    numberOfPayments: number;
    paymentPerInstallment: number;
    startDate: string;
    endDate: string;
  },
  totalLoanAmount: number, // calculated in checkout
  loanStatus: "ACTIVE" | "COMPLETED",
  deliveryFee: number,
): ILoanItem => {
  const nextPaymentDate = calculateNextPaymentDate(loanConfig.paymentInterval);

  const newLoanPlan: ILoanItem = {
    loanPlanId,
    items,
    loanStatus: loanStatus,
    totalAmount: totalLoanAmount,
    amountPaid: 0,
    balanceAmount: totalLoanAmount,
    interestAmount: loanConfig.interestAmount,
    loanDuration: loanConfig.duration,
    rePaymentType: loanConfig.paymentInterval,
    nextPaymentDate,
    targetDate: loanConfig.endDate,
    createdAt: loanConfig.startDate,
    numberOfPayments: loanConfig.numberOfPayments,
    paymentPerInstallment: loanConfig.paymentPerInstallment,
    deliveryFee,
  };

  const plans = getLoanedPlans();
  plans.push(newLoanPlan);
  saveLoanedPlans(plans);

  return newLoanPlan;
};

export const getLoanedPlanById = (
  loanPlanId: string,
): ILoanItem | undefined => {
  const plans = getLoanedPlans();
  return plans.find((plan) => plan.loanPlanId === loanPlanId);
};

export const updateLoanedPlan = (
  loanPlanId: string,
  updates: Partial<ILoanItem>,
): void => {
  const plans = getLoanedPlans();
  const index = plans.findIndex((plan) => plan.loanPlanId === loanPlanId);

  if (index >= 0) {
    plans[index] = { ...plans[index], ...updates };
    saveLoanedPlans(plans);
  }
};

export const deleteLoanedPlan = (loanPlanId: string): void => {
  const plans = getLoanedPlans().filter(
    (plan) => plan.loanPlanId !== loanPlanId,
  );
  saveLoanedPlans(plans);
};

export const clearAllLoanedPlans = (): void => {
  localStorage.removeItem(LOANED_ITEM_KEY);
  emitLoanUpdate();
};

// ============================================
// HELPER FUNCTIONS
// ============================================

const calculateNextPaymentDate = (rePaymentType: string): string => {
  const now = new Date();
  const nextDate = new Date(now);

  switch (rePaymentType.toLowerCase()) {
    case "daily":
      nextDate.setDate(now.getDate() + 1);
      break;
    case "weekly":
      nextDate.setDate(now.getDate() + 7);
      break;
    case "bi-weekly":
      nextDate.setDate(now.getDate() + 14);
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

export const completeLoanPlan = (loanPlanId: string): void => {
  const plans = getLoanedPlans();
  const index = plans.findIndex((plan) => plan.loanPlanId === loanPlanId);

  if (index >= 0) {
    plans[index].loanStatus = "COMPLETED";
    saveLoanedPlans(plans);

    // Check if user still has any active loans
    const hasActiveLoans = plans.some((plan) => plan.loanStatus === "ACTIVE");

    // If no more active loans, update user data
    if (!hasActiveLoans) {
      updateUserData({ isActiveLoan: false });
    }
  }
};

export const getLoanTransactionStatus = (plan: ILoanItem): string => {
  // If loan is completed
  if (plan.loanStatus === "COMPLETED") {
    return "COMPLETED";
  }

  // If loan is active, check if overdue
  const nextPaymentDate = new Date(plan.nextPaymentDate);
  const today = new Date();

  if (today > nextPaymentDate) {
    return "OVERDUE";
  }

  return "IN-PAYMENT";
};
