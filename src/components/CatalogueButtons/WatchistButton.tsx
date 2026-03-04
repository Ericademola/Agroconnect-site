import { ProductWatchListIcon } from "@/Icons";
import { useEffect, useState } from "react";
import { IFarmProducts } from "@/types";
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

const WatchListButton = ({ item }: WatchListButtonProps) => {
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

  const label = isInList ? "Remove from Watchlist" : "Add to watchlist";

  return (
    <div>
      <Button
        variant={isInList ? "outline" : "secondary"}
        size="sm"
        onClick={handleToggleWatchlist}
        className={`flex items-center gap-3 w-full h-[40px] lg:h-[50px] ${isInList ? "border-[#C09706]" : "#DEE2E5"} border-1`}
      >
        <ProductWatchListIcon className="w-5 h-5 hidden sm:block" />
        <span className="text-xs sm:text-sm md:text-base">{label}</span>
      </Button>
    </div>
  );
};
export default WatchListButton;
