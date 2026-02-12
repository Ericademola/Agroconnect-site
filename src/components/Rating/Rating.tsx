"use client";

import { cn } from "@/lib/utils";
import { MdStar, MdStarBorder } from "react-icons/md";

type RatingProps = {
  value: number;
  onChange?: (value: number) => void;
  max?: number;
  readOnly?: boolean;
  className?: string;
};

export default function Rating({
  value,
  onChange,
  max = 5,
  readOnly = false,
  className,
}: RatingProps) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1;

        return (
          <button
            key={starValue}
            type="button"
            disabled={readOnly}
            onClick={() => onChange?.(starValue)}
            className={cn(
              `text-[#E4B304] text-sm md:text-lg ${
                readOnly ? "cursor-default" : "cursor-pointer"
              }`,
              className,
            )}
            aria-label={`Rate ${starValue} star`}
          >
            {starValue <= value ? <MdStar /> : <MdStarBorder />}
          </button>
        );
      })}
    </div>
  );
}
