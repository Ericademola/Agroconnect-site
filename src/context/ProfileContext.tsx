"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface ProfileContextType {
  activeProfile: "BUYER" | "FARMER";
  setActiveProfile: (profile: "BUYER" | "FARMER") => void;
}

const ProfileContext = createContext<ProfileContextType>({
  activeProfile: "BUYER",
  setActiveProfile: () => {},
});

export const ProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeProfile, setActiveProfile] = useState<"BUYER" | "FARMER">(
    "BUYER",
  );

  useEffect(() => {
    const stored = sessionStorage.getItem("activeProfile") as
      | "BUYER"
      | "FARMER";
    if (stored) setActiveProfile(stored);
  }, []);

  const handleSetActiveProfile = (profile: "BUYER" | "FARMER") => {
    setActiveProfile(profile);
    sessionStorage.setItem("activeProfile", profile);
  };

  return (
    <ProfileContext.Provider
      value={{ activeProfile, setActiveProfile: handleSetActiveProfile }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
