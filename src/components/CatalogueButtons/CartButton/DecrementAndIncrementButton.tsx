"use client";

import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "@/Icons";
import { cn } from "@/lib/utils";

interface DecrementAndIncrementButtonProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  className?: string;
  btnClassName?: string;
}

const DecrementAndIncrementButton = ({
  quantity,
  onIncrement,
  onDecrement,
  className,
  btnClassName,
}: DecrementAndIncrementButtonProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-2 border border-[#0000001A] rounded-md w-full",
        className,
      )}
    >
      <Button
        type="button"
        onClick={onDecrement}
        variant="secondary"
        size="sm"
        className={cn(
          "w-[35px] h-[35px] lg:w-[50px] lg:h-[50px] px-0",
          btnClassName,
        )}
      >
        <MinusIcon className="w-[14px] h-[14px] md:w-4 md:h-4 lg:w-5 lg:h-5" />
      </Button>

      <p className="text-sm md:text-base lg:text-xl font-poppins">{quantity}</p>

      <Button
        type="button"
        onClick={onIncrement}
        variant="secondary"
        size="sm"
        className={cn(
          "w-[35px] h-[35px] lg:w-[50px] lg:h-[50px] px-0",
          btnClassName,
        )}
      >
        <PlusIcon className="w-[14px] h-[14px] md:w-4 md:h-4 lg:w-5 lg:h-5" />
      </Button>
    </div>
  );
};
export default DecrementAndIncrementButton;
