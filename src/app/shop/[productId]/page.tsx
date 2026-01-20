"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import CartButton from "@/components/CartButton/CartButton";
// import Rating from "@/components/Rating/Rating";
import Image from "next/image";
import Catalogue from "@/components/Catalogue/Catalogue";
import { getProductById } from "@/hooks/getProducts";
import { IProducts } from "@/types";
import { LeftArrowIcon } from "@/Icons";

export default function ProductDetails() {
  const { productId } = useParams();
  const router = useRouter();
  const [itemDetails, setItemDetails] = useState<IProducts | null>(null);

  useEffect(() => {
    const id = parseInt(productId as string);
    const product = getProductById(id);

    if (!product) {
      router.push("/not-found");
    } else {
      setItemDetails(product);
    }
  }, [productId, router]);

  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-1 mt-5 pb-20 px-10 sm:px-12 md:px-8 lg:px-24">
        <button
          onClick={goBack}
          className="text-gray-800 text-[0.8rem] md:text-[1rem] flex items-center font-medium py-1 px-3 mb-2 w-fit bg-green-200 hover:text-gray-600 cursor-pointer rounded-lg"
        >
          <LeftArrowIcon
            className="w-[0.8rem] md:w-4 h-[0.8rem] md:h-4"
            strokeWidth={2.5}
          />{" "}
          Back
        </button>
        {itemDetails && (
          <div className="sm:flex border-green-600 border-2 rounded-xl bg-blue-200">
            <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-80 lg:w-[30%] bg-white flex justify-center rounded-tl-xl sm:rounded-bl-xl rounded-tr-xl sm:rounded-tr-none mx-auto pt-1">
              <Image
                src={itemDetails.productImage}
                alt={itemDetails.productName}
                fill
                className="object-contain rounded-tl-xl sm:rounded-bl-xl sm:rounded-tr-none rounded-tr-xl py-2 px-3"
              />
            </div>

            <div className="text-gray-700 flex flex-col px-4 py-4 lg:w-[70%]">
              <h3 className="font-bold text-[1.2rem] md:text-[1.5rem] text-gray-800">
                {itemDetails.productName}
              </h3>
              <p className="text-[0.8rem] md:text-[1rem] text-justify">
                {itemDetails.description}
              </p>
              <p className="font-medium text-gray-950 text-[1.1rem] md:text-[1.3rem] pt-2">
                ₦{itemDetails.price}
              </p>
              <span className="mt-10 sm:mt-auto flex flex-col gap-1 ">
                <CartButton item={itemDetails} />
              </span>
            </div>
          </div>
        )}
      </div>
      {itemDetails && <Catalogue excludeId={itemDetails.productId} />}
    </div>
  );
}

{
  /* <Rating
                  initialRating={itemDetails.rating}
                  id={itemDetails.id}
                  productList={products}
                /> */
}
