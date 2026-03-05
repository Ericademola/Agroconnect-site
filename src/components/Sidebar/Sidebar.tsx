"use client";
import React, { useState } from "react";
import {
  AddressIcon,
  ChangePasswordIcon,
  CreditCardIcon,
  ExchangeIcon,
  LogoutIcon,
  MoneyJarIcon,
  OrderIcon,
  ProductWatchListIcon,
  SalesHistoryIcon,
  UserIcon,
  VoucherIcon,
  WalletIcon,
} from "@/Icons";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/context/ProfileContext";

const Sidebar = () => {
  // const [activeProfile, setActiveProfile] = useState<string>("");

  const { activeProfile } = useProfile();

  // useEffect(() => {
  //   const storedProfile = sessionStorage.getItem("activeProfile");
  //   if (storedProfile) {
  //     setActiveProfile(storedProfile);
  //   }
  // }, [activeProfile]);

  const sidebarItems = [
    {
      key: "1",
      label: "My profile",
      icon: <UserIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6" />,
      route: "/profile",
    },
    ...(activeProfile === "BUYER"
      ? [
          {
            key: "2",
            label: "My Orders",
            icon: <OrderIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6" />,
            route: "/order",
          },
          {
            key: "3",
            label: "Food Savings",
            icon: <MoneyJarIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6" />,
            route: "/savings",
          },
          {
            key: "4",
            label: "Food on Credit",
            icon: <WalletIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6" />,
            route: "/loan",
          },
        ]
      : []),
    ...(activeProfile === "FARMER"
      ? [
          {
            key: "5",
            label: "My Applications",
            icon: <OrderIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6" />,
            route: "/application",
          },
          {
            key: "6",
            label: "Product Watchlist",
            icon: (
              <ProductWatchListIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6" />
            ),
            route: "/watch-list",
          },
          {
            key: "7",
            label: "Sales History",
            icon: <SalesHistoryIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6" />,
            route: "/sales-history",
          },
          {
            key: "8",
            label: "Vouchers / Rewards",
            icon: <VoucherIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6" />,
            route: "/",
          },
          {
            key: "9",
            label: "By-Products Exchange",
            icon: <ExchangeIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6" />,
            route: "/",
          },
          {
            key: "10",
            label: "By-Products Orders",
            icon: <OrderIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6" />,
            route: "/",
          },
        ]
      : []),
    {
      key: "11",
      label: `${activeProfile === "BUYER" ? "Delivery" : "Farm"}  Address(es)`,
      icon: <AddressIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6" />,
      route: "/addresses",
    },
    {
      key: "13",
      label: "Account Details",
      icon: <CreditCardIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6" />,
      route: "/account-details",
    },
    {
      key: "14",
      label: "Change Password",
      icon: <ChangePasswordIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6" />,
      route: "/change-password",
    },
    {
      label: "Logout",
      icon: <LogoutIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6" />,
    },
  ];

  const [activePage, setActivePage] = useState<string>(sidebarItems[0].label);
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleTabClick = (tab: string) => {
    setActivePage(tab);
    router.push(sidebarItems.find((item) => item.label === tab)?.route ?? "/");
  };

  return (
    <div className="">
      <div className={cn("flex flex-col pr-6 gap-3")}>
        {sidebarItems.map((item) => (
          <div
            key={item.label}
            onClick={() => {
              if (item.label === "Logout") handleLogout();
              else handleTabClick(item.label);
            }}
            className={`flex items-center gap-[10px] pl-6 pr-3 md:h-10 lg:h-12 cursor-pointer ${item.label === activePage && "bg-[#F5F5F5] rounded-r-[15px]"} `}
          >
            {item.icon}
            <p
              className={cn(
                "text-[#001906] font-geologica font-light text-[clamp(14px,1.5vw,18px)]",
                item.label === "Logout" && "text-[#E63946]",
              )}
            >
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
