"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserData, updateUserData } from "@/hooks/getUserData";
import { IuserData } from "@/types";

interface AuthContextType {
  userInfo: IuserData;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userInfo, setUserInfo] = useState<IuserData>(getUserData());

  // Sync from localStorage on mount (handles page refresh)
  useEffect(() => {
    setUserInfo(getUserData());
  }, []);

  const login = () => {
    const updated = updateUserData({ isLoggedIn: true });
    setUserInfo(updated);
  };

  const logout = () => {
    const updated = updateUserData({ isLoggedIn: false });
    setUserInfo(updated);
  };

  return (
    <AuthContext.Provider value={{ userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
