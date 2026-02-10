import { cn } from "@/lib/utils";
import React from "react";

interface IPopNotificationProps {
  icon: React.ReactNode;
  textContent: React.ReactNode;
  className?: string;
}
const PopNotification = ({
  icon,
  textContent,
  className,
}: IPopNotificationProps) => {
  return (
    <div
      className={cn(
        "border border-[#F5A721] bg-[#F5A7211A] flex items-center gap-3 md:gap-5 rounded-[10px] px-3 md:px-6 py-2 md:py-3",
        className,
      )}
    >
      <div className="p-3 rounded-full bg-[#F5A721]">{icon}</div>
      <div className="text-[#000000B2] text-[clamp(10px,1.4vw,16px)] font-raleway">
        <div>{textContent}</div>
      </div>
    </div>
  );
};

export default PopNotification;
