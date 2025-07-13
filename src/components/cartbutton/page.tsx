"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons/faCircleNotch";

export default function CartButton() {
  const [loading, setLoading] = useState(false);
  const [showQtyButtons, setShowQtyButtons] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const handleAddToCartClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowQtyButtons(true);
      setQuantity(1);
    }, 900);
  };

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setShowQtyButtons(false);
      setQuantity(0);
    }
  };

  return (
    <div className="mt-2 flex gap-2">
      {!showQtyButtons && (
        <Button
          onClick={handleAddToCartClick}
          className="bg-green-700 hover:bg-green-800 font-medium text-[0.6rem] sm:text-[0.75rem] md:text-[0.8rem]  lg:text-[0.9rem] py-[2vh] sm:py-[2.5vh] px-[2.5vw] sm:px-[2vw] lg:px-[1vw]  h-0"
        >
          {loading ? (
            <FontAwesomeIcon icon={faCircleNotch} spin className="text-white" />
          ) : (
            "Add to Cart"
          )}
        </Button>
      )}
      {showQtyButtons && (
        <div className="flex items-center gap-2">
          <Button
            onClick={handleDecrement}
            size="sm"
            className="bg-green-700 hover:bg-green-800 py-[2vh] sm:py-[2.5vh] px-[2vw] sm:px-[2vw] lg:px-[1vw]  h-0"
          >
            <Minus className="w-2 sm:w-3 h-3" />
          </Button>
          <p className="text-sm font-bold">{quantity}</p>
          <Button
            onClick={handleIncrement}
            size="sm"
            className="bg-green-700 hover:bg-green-800 py-[2vh] sm:py-[2.5vh] px-[2vw] sm:px-[2vw] lg:px-[1vw]  h-0"
          >
            <Plus className="w-2 sm:w-3 h-3" />
          </Button>
        </div>
      )}
    </div>
  );
}
