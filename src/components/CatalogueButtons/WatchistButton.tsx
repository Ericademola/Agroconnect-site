{
  /* <Button
  variant="secondary"
  size="sm"
  onClick={handleSellProduct}
  className="flex items-center gap-3 w-full h-[35px] lg:h-[50px]"
>
  <ProductWatchListIcon className="w-5 h-5 hidden sm:block" />
  <p>Add to Watchlist</p>
</Button>; */
}

import { ProductWatchListIcon } from "@/Icons";
import { useEffect, useState } from "react";
import { IFarmProducts } from "@/types";
// import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  isInWatchlist,
  removeFromWatchlist,
  addToWatchlist,
} from "@/hooks/getFarmProducts";

interface WatchListButtonProps {
  item: IFarmProducts;
  variant?: "icon" | "text" | "icon-text";
  className?: string;
}

const WatchListButton = ({
  item,
  //   variant = "icon",
  //   className,
}: WatchListButtonProps) => {
  const [isInList, setIsInList] = useState(false);

  useEffect(() => {
    setIsInList(isInWatchlist(item.productId));
  }, [item.productId]);

  const handleToggleWatchlist = () => {
    if (isInList) {
      removeFromWatchlist(item.productId);
      setIsInList(false);
    } else {
      addToWatchlist(item);
      setIsInList(true);
    }
  };

  const label = isInList ? "Remove from Watchlist" : "Add to wishlist";

  return (
    <div>
      {/* <Button
        variant="secondary"
        size="lg"
        onClick={handleToggleWatchlist}
        className={cn(
          variant === "icon"
            ? "w-[35px] lg:w-[50px] h-[35px] lg:h-[50px] px-0 rounded-[10px]"
            : "gap-2 rounded-[10px]",
          className,
        )}
      >
       
        {(variant === "icon" || variant === "icon-text") &&
          (isInList ? (
            <FilledHeartIcon className="w-5 h-5 lg:w-7 lg:h-7" />
          ) : (
            <HeartIcon className="w-5 h-5 lg:w-7 lg:h-7" fill="#333333" />
          ))}

        
        {(variant === "text" || variant === "icon-text") && (
          <span className="text-xs sm:text-sm md:text-base">{label}</span>
        )}

        
        <span className="sr-only">{label}</span>
      </Button> */}
      <Button
        variant={isInList ? "outline" : "secondary"}
        size="sm"
        onClick={handleToggleWatchlist}
        className="flex items-center gap-3 w-full h-[35px] lg:h-[50px]"
      >
        <ProductWatchListIcon className="w-5 h-5" />
        <span className="text-xs sm:text-sm md:text-base">{label}</span>
      </Button>
    </div>
  );
};
export default WatchListButton;
