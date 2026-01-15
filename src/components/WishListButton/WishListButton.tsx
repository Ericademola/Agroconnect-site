import { FilledHeartIcon, HeartIcon } from "@/Icons";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { IProducts } from "@/types";
import {
  addToWishlist,
  isInWishlist,
  removeFromWishlist,
} from "@/hooks/getProducts";

interface WishListButtonProps {
  item: IProducts;
}

const WishListButton = ({ item }: WishListButtonProps) => {
  const [isInList, setIsInList] = useState(false);

  useEffect(() => {
    // Check if item is already in wishlist on mount
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

  return (
    <div>
      <Button
        variant="secondary"
        size="lg"
        className="w-[40px] lg:w-[50px] h-[40px] lg:h-[50px] px-0 rounded-[10px]"
        onClick={handleToggleWishlist}
      >
        {isInList ? (
          <FilledHeartIcon className="w-5 h-5 lg:w-7 lg:h-7" />
        ) : (
          <HeartIcon className="w-5 h-5 lg:w-7 lg:h-7" fill="#333333" />
        )}
      </Button>
    </div>
  );
};
export default WishListButton;
