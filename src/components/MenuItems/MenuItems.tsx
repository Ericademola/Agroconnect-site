"use client";
import Link from "next/link";
import {
  ChangePasswordIcon,
  LogoutIcon,
  MoneyJarIcon,
  OrderIcon,
  SwitchIcon,
  UserIcon,
  WalletIcon,
} from "@/Icons";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

type MenuItemsProps = {
  close: () => void;
  className?: string;
  itemsListClassName?: string;
  secondClassName?: string;
  activeProfile?: string;
  setActiveProfile?: (value: "buyer" | "farmer") => void;
};

const MenuItems = ({
  close,
  className,
  itemsListClassName,
  secondClassName,
  activeProfile,
  setActiveProfile,
}: MenuItemsProps) => {
  const { userInfo, logout } = useAuth();
  const router = useRouter();

  const ItemsList = [
    {
      label: "My profile",
      route: "/profile",
      icon: <UserIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6" />,
    },
    {
      label: "My Orders",
      route: "/order",
      icon: <OrderIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6" />,
    },
    {
      label: "Food Savings",
      route: "/savings",
      icon: <MoneyJarIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6" />,
    },
    {
      label: "Loan & Credit",
      route: "/loan",
      icon: <WalletIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6" />,
    },
    {
      label: "Change Password",
      route: "/change-password",
      authOnly: true,
      icon: <ChangePasswordIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6" />,
    },
    {
      label: `Switch to ${activeProfile === "buyer" ? "Farmer" : "Buyer"}`,
      route: "/",
      authOnly: true,
      icon: <SwitchIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6" />,
    },
    {
      label: "Logout",
      route: "/",
      authOnly: true,
      icon: <LogoutIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6" />,
    },
  ];

  const visibleItems = ItemsList.filter((item) => {
    if (item.authOnly && !userInfo.isLoggedIn) return false;
    return true;
  });

  const handleLogout = () => {
    logout();
    close();
    router.push("/login");
  };

  const handleSwitchProfile = () => {
    if (setActiveProfile) {
      const newProfile = activeProfile === "buyer" ? "farmer" : "buyer";
      setActiveProfile(newProfile);
      sessionStorage.setItem("activeProfile", newProfile);
    }
  };

  return (
    <div className={cn("py-4 w-full flex flex-col", className)}>
      <div className={cn("flex flex-col gap-7 mb-8", secondClassName)}>
        <div
          className={cn(
            "flex flex-col gap-[30px]  text-[clamp(18px,1.8vw,24px)]",
            itemsListClassName,
          )}
        >
          {visibleItems.map((item) => (
            <Link
              href={item.route}
              key={item.label}
              onClick={() => {
                if (item.label === "Logout") handleLogout();
                if (item.label.includes("Switch to")) {
                  handleSwitchProfile();
                }
                close();
              }}
              className="flex items-center gap-[10px]"
            >
              {item.icon}
              <p
                className={cn(
                  "text-[#333333] font-geologica font-extralight",
                  item.label === "Logout" && "text-[#E63946]",
                )}
              >
                {item.label}
              </p>
            </Link>
          ))}
        </div>

        {!userInfo.isLoggedIn && (
          <div className="flex flex-col gap-4 w-full">
            <Link href="/create-account" passHref>
              <Button
                size="lg"
                className="w-full text-[clamp(14px,1.4vw,16px)]"
                onClick={close}
              >
                Register
              </Button>
            </Link>
            <Link href="/login" passHref>
              <Button
                variant="secondary"
                size="lg"
                className="w-full text-[clamp(14px,1.4vw,16px)]"
                onClick={close}
              >
                Login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItems;
