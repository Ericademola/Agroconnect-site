import { cn } from "@/lib/utils";
import React from "react";

interface IPopNotificationProps {
  icon?: React.ReactNode;
  textContent: React.ReactNode;
  className?: string;
  textClassName?: string;
  iconBgClassName?: string;
}
const PopNotification = ({
  icon,
  textContent,
  className,
  textClassName,
  iconBgClassName,
}: IPopNotificationProps) => {
  return (
    <div
      className={cn(
        "border border-[#F5A721] bg-[#F5A7211A] flex items-center gap-3 md:gap-5 rounded-[10px] px-3 md:px-5 py-2 md:py-3",
        className,
      )}
    >
      <div className={cn("p-3 rounded-full bg-[#F5A721]", iconBgClassName)}>
        {icon}
      </div>
      <div
        className={cn(
          "text-[#000000B2] text-[clamp(10px,1.4vw,16px)] font-raleway flex-1",
          textClassName,
        )}
      >
        {textContent}
      </div>
    </div>
  );
};

export default PopNotification;
