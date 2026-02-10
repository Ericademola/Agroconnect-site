import { CartItem } from "@/types";

export interface Order {
  orderId: string;
  items: CartItem[];
  orderStatus: "CONFIRMED" | "DISPATCHED" | "DELIVERED" | "CANCELLED";
  totalAmount: number;
  deliveryFee: number;
  orderDate: string;
  expectedDeliveryDate: string;
  paymentMethod: string;
  deliveryStatus?:
    | "ORDER PLACED"
    | "CONFIRMED"
    | "PACKED"
    | "DISPATCHED"
    | "DELIVERED";
  deliveryAddress: {
    fullName: string;
    phoneNumber: string;
    fullAddress: string;
  };
  deliveryType?: string;
  driverInfo?: {
    driverImage: string;
    driverName: string;
    driverPhoneNumber: string;
    vehicleNumber: string;
  };
}

const ORDERS_KEY = "Orders";

// Save new order to localStorage
export const saveOrder = (order: Order): void => {
  const orders = getOrders();
  orders.unshift(order); // Add new order at the beginning
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
};

// Get all orders from localStorage
export const getOrders = (): Order[] => {
  const stored = localStorage.getItem(ORDERS_KEY);
  return stored ? JSON.parse(stored) : [];
};

// Get order by ID
export const getOrderById = (orderId: string): Order | undefined => {
  const orders = getOrders();
  return orders.find((order) => order.orderId === orderId);
};

// Update order status
export const updateOrderStatus = (
  orderId: string,
  status: Order["orderStatus"],
): void => {
  const orders = getOrders();
  const orderIndex = orders.findIndex((order) => order.orderId === orderId);

  if (orderIndex !== -1) {
    orders[orderIndex].orderStatus = status;
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }
};

// Clear all orders
export const clearOrders = (): void => {
  localStorage.removeItem(ORDERS_KEY);
};
