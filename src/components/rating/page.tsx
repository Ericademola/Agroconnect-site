"use client";
import { saveProducts } from "@/hooks/getProducts";
import { IProducts } from "@/types";
import { useState } from "react";
import { MdStar, MdStarBorder } from "react-icons/md";

type RatingProps = {
  initialRating?: number;
  id?: number;
  productList: IProducts[];
};

export default function Rating({
  initialRating = 0,
  id,
  productList,
}: RatingProps) {
  const [rating, setRating] = useState(initialRating);

  const updateRating = (newRating: number) => {
    setRating(newRating);

    productList.find((item) => item.id === id)!.rating = newRating;
    saveProducts(productList);
  };

  return (
    <div className="flex items-center">
      <p className="font-semibold text-[0.7rem] sm:text-[0.9rem] md:text-[1rem] mr-1">
        Rating:
      </p>
      {[1, 2, 3, 4, 5].map((star, index) => (
        <span
          key={index}
          className="cursor-pointer text-yellow-600 text-[0.8rem] md:text-[1.1rem]"
          onClick={() => updateRating(star)}
        >
          {index < rating ? <MdStar /> : <MdStarBorder />}
        </span>
      ))}
    </div>
  );
}
