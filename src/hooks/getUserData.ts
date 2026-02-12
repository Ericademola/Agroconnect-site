import { userData } from "@/data/userData";
import { IuserData } from "@/types";

const LOACL_USER_DATA_KEY = "UserData";

// Store initial User data in localStorage
export const saveUserData = (userData: IuserData): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOACL_USER_DATA_KEY, JSON.stringify(userData));
  }
};

// Load User data from localStorage or default list
export const loadUserData = (): IuserData => {
  if (typeof window === "undefined") return userData;

  const stored = localStorage.getItem(LOACL_USER_DATA_KEY);
  if (stored) return JSON.parse(stored);

  saveUserData(userData);
  return userData;
};

// Return User data from localStorage
export const getUserData = (): IuserData => {
  if (typeof window === "undefined") return userData;

  const stored = localStorage.getItem(LOACL_USER_DATA_KEY);
  return stored ? JSON.parse(stored) : userData;
};

// Update specific user data fields
export const updateUserData = (updates: Partial<IuserData>): IuserData => {
  const currentData = getUserData();
  const updatedData = { ...currentData, ...updates };
  saveUserData(updatedData);
  return updatedData;
};
