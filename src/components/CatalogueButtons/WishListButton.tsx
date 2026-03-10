import { FilledHeartIcon, HeartIcon } from "@/Icons";
import { useEffect, useState } from "react";
import { IProducts } from "@/types";
import {
  addToWishlist,
  isInWishlist,
  removeFromWishlist,
} from "@/hooks/getProducts";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface WishListButtonProps {
  item: IProducts;
  variant?: "icon" | "text" | "icon-text";
  className?: string;
}

const WishListButton = ({
  item,
  variant = "icon",
  className,
}: WishListButtonProps) => {
  const [isInList, setIsInList] = useState(false);

  useEffect(() => {
    setIsInList(isInWishlist(item.productId));
  }, [item.productId]);

  const handleToggleWishlist = () => {
    if (isInList) {
      removeFromWishlist(item.productId);
      setIsInList(false);
    } else {
      addToWishlist(item);
      setIsInList(true);
    }
  };

  const label = isInList ? "Remove from wishlist" : "Add to wishlist";

  return (
    <div>
      <Button
        variant="secondary"
        size="lg"
        onClick={handleToggleWishlist}
        className={cn(
          variant === "icon"
            ? "w-[35px] lg:w-[50px] h-[35px] lg:h-[50px] px-0 rounded-[10px]"
            : "gap-2 rounded-[10px]",
          className,
        )}
      >
        {/* ICON */}
        {(variant === "icon" || variant === "icon-text") &&
          (isInList ? (
            <FilledHeartIcon className="w-5 h-5 lg:w-7 lg:h-7" />
          ) : (
            <HeartIcon className="w-5 h-5 lg:w-7 lg:h-7" fill="#333333" />
          ))}

        {/* TEXT */}
        {(variant === "text" || variant === "icon-text") && (
          <span className="text-xs sm:text-sm md:text-base">{label}</span>
        )}

        {/* Accessibility */}
        <span className="sr-only">{label}</span>
      </Button>
    </div>
  );
};
export default WishListButton;
