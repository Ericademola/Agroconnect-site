"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleNotch } from "@fortawesome/free-solid-svg-icons/faCircleNotch";
import { CartItem, IProducts } from "@/types";
import {
  getBasketItems,
  getItemQuantity,
  setBasketItems,
  setItemQuantity,
} from "@/hooks/getProducts";
import { AddIcon, MinusIcon } from "@/Icons";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

interface CartButtonProps {
  item: IProducts;
  onQuantityChange?: (items: CartItem[]) => void;
}

export default function CartButton({
  item,
  onQuantityChange,
}: CartButtonProps) {
  const [loading, setLoading] = useState(false);
  const [showQtyButtons, setShowQtyButtons] = useState(false);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const storedQty = getItemQuantity(item.id);
    if (storedQty > 0) {
      setQuantity(storedQty);
      setShowQtyButtons(true);
    }
  }, [item.id]);

  const updateCart = (newQty: number) => {
    setItemQuantity(item.id, newQty);

    const items = getBasketItems();
    const index = items.findIndex((i) => i.id === item.id);

    if (index >= 0) {
      items[index].quantity = newQty;
    } else {
      items.push({ ...item, quantity: newQty });
    }

    const filteredItems = items.filter((i) => i.quantity > 0);
    setBasketItems(filteredItems);

    if (typeof onQuantityChange === "function") {
      onQuantityChange(filteredItems);
    }
  };

  const handleAddToCartClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowQtyButtons(true);
      setQuantity(1);
      updateCart(1);
    }, 900);
  };

  const handleIncrement = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    updateCart(newQty);
  };

  const handleDecrement = () => {
    const newQty = quantity - 1;
    if (newQty <= 0) {
      setShowQtyButtons(false);
      setQuantity(0);
      updateCart(0);
    } else {
      setQuantity(newQty);
      updateCart(newQty);
    }
  };

  return (
    <div className="mt-2 flex gap-2">
      {!showQtyButtons && (
        <Button
          onClick={handleAddToCartClick}
          className="w-16 sm:w-20 md:w-[5.5rem] lg:w-24 flex items-center justify-center"
          loading={loading}
          disabled={loading}
        >
          {loading ? "Loading..." : "Add to Cart"}
        </Button>
      )}
      {showQtyButtons && (
        <div className="flex items-center gap-2">
          <Button
            onClick={handleDecrement}
            className="w-6 sm:w-8 md:w-[2.2rem] lg:w-10 flex items-center justify-center"
          >
            <FontAwesomeIcon
              icon={faMinus}
              className="text-[0.8rem] sm:text-[1rem] lg:text-[1.2rem]"
            />
          </Button>
          <p className="text-sm font-bold">{quantity}</p>
          <Button
            onClick={handleIncrement}
            className="w-6 sm:w-8 md:w-[2.2rem] lg:w-10 flex items-center justify-center"
          >
            <FontAwesomeIcon
              icon={faPlus}
              className="text-[0.8rem] sm:text-[1rem] lg:text-[1.2rem]"
            />
          </Button>
        </div>
      )}
    </div>
  );
}
