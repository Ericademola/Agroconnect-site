"use client";

import Link from "next/link";
import Image from "next/image";
import CartButton from "../CartButton/CartButton";
import Rating from "../Rating/Rating";
import { useEffect, useState } from "react";
import { IProducts } from "@/types";
import { loadProducts } from "@/hooks/getProducts";

interface CatalogueProps {
  excludeId?: number;
}

export default function Catalogue({ excludeId }: CatalogueProps) {
  const [productList, setProductList] = useState<IProducts[]>();

  useEffect(() => {
    const loadedProducts = loadProducts();
    const filtered = excludeId
      ? loadedProducts.filter((p) => p.id !== excludeId)
      : loadedProducts;
    setProductList(filtered);
  }, [excludeId]);

  return (
    <div className="font-sans flex gap-4 px-0 sm:gap-6 md:gap-8 lg:px-10 pb-20 flex-wrap justify-center">
      {productList &&
        productList.map((item: IProducts, index: number) => (
          <div
            key={item.id}
            className="shadow-lg shadow-gray-400 border-2 w-[42vw] sm:w-[40vw] md:w-[28vw] lg:w-[20vw] h-fit border-green-800 rounded-2xl"
          >
            <Link href={`/products/${item.id}`}>
              <div className="relative w-full h-40 sm:h-52 flex justify-center bg-white rounded-t-2xl cursor-pointer pt-1">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={400}
                  height={400}
                  className="object-contain rounded-t-2xl py-2"
                />
              </div>
            </Link>
            <div className="text-gray-700 flex flex-col px-2 bg-green-200 rounded-b-2xl py-2">
              <h3 className="font-bold text-[0.9rem] sm:text-[1rem] md:text-[1.2rem] line-clamp-1 text-gray-800">
                {item.name}
              </h3>
              <p className="font-medium text-[0.8rem] sm:text-[0.9rem] md:text-[1rem]">
                ₦{item.price}
              </p>
              <p className="text-[0.7rem] sm:text-[0.9rem] mt-1 line-clamp-1">
                {item.description}
              </p>

              <Rating
                initialRating={item.rating}
                id={item.id}
                productList={productList}
              />

              <CartButton item={item} />
            </div>
          </div>
        ))}
    </div>
  );
}
