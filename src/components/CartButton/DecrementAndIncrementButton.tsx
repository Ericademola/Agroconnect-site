"use client";

import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "@/Icons";
import { cn } from "@/lib/utils";

interface DecrementAndIncrementButtonProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  className?: string;
}

const DecrementAndIncrementButton = ({
  quantity,
  onIncrement,
  onDecrement,
  className,
}: DecrementAndIncrementButtonProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-2 border border-[#0000001A] rounded-md w-full",
        className,
      )}
    >
      <Button
        onClick={onDecrement}
        variant="secondary"
        size="sm"
        className="w-[35px] h-[35px] lg:w-[50px] lg:h-[50px] px-0"
      >
        <MinusIcon className="w-[14px] h-[14px] md:w-4 md:h-4 lg:w-5 lg:h-5" />
      </Button>

      <p className="text-sm md:text-base lg:text-xl font-poppins">{quantity}</p>

      <Button
        onClick={onIncrement}
        variant="secondary"
        size="sm"
        className="w-[35px] h-[35px] lg:w-[50px] lg:h-[50px] px-0"
      >
        <PlusIcon className="w-[14px] h-[14px] md:w-4 md:h-4 lg:w-5 lg:h-5" />
      </Button>
    </div>
  );
};
export default DecrementAndIncrementButton;
