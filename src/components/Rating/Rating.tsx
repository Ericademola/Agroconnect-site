// "use client";
// import {
//   loadBestDealsProducts,
//   loadFreshPickedProducts,
//   saveProducts,
// } from "@/hooks/getProducts";
// import { IProducts } from "@/types";
// import { useState } from "react";
// import { MdStar, MdStarBorder } from "react-icons/md";

// type RatingProps = {
//   initialRating?: number;
//   product: IProducts;
// };

// export default function Rating({ product }: RatingProps) {
//   const [rating, setRating] = useState(product.productAverageRating);

//   const updateRating = (newRating: number) => {
//     setRating(newRating);

//     const fresh = loadFreshPickedProducts();
//     const deals = loadBestDealsProducts();

//     const updateList = (list: IProducts[]) =>
//       list.map((item) =>
//         item.productId === product.productId
//           ? { ...item, totalRatings: newRating }
//           : item,
//       );

//     const updatedFresh = updateList(fresh);
//     const updatedDeals = updateList(deals);

//     saveProducts(updatedFresh, updatedDeals);
//   };

//   return (
//     <div className="flex items-center gap-2">
//       {[1, 2, 3, 4, 5].map((star, index) => (
//         <span
//           key={index}
//           className="cursor-pointer text-[#E4B304] text-sm md:text-lg"
//           onClick={() => updateRating(star)}
//         >
//           {index < rating ? <MdStar /> : <MdStarBorder />}
//         </span>
//       ))}
//     </div>
//   );
// }

// type StaticRatingProps = {
//   value: number;
// };

// export function StaticRating({ value }: StaticRatingProps) {
//   return (
//     <div className="flex items-center">
//       {[1, 2, 3, 4, 5].map((star) => (
//         <span key={star} className="text-[#E4B304] text-sm md:text-lg">
//           {star <= value ? <MdStar /> : <MdStarBorder />}
//         </span>
//       ))}
//     </div>
//   );
// }

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
