"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import CartButton from "@/components/CartButton/CartButton";
import { CartItem } from "@/types";
import {
  // faAngleLeft,
  faShoppingBasket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LeftArrowIcon } from "@/Icons";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const [basketItems, setBasketItems] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("BasketItems");
    if (stored) {
      setBasketItems(JSON.parse(stored));
    }
  }, []);

  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      router.push("/");
    }
  };

  const removeItem = (id: number) => {
    const newItems = basketItems.filter((item) => item.productId !== id);
    localStorage.setItem("BasketItems", JSON.stringify(newItems));
    setBasketItems(newItems);
  };

  const totalPrice = basketItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <div className=" h-full flex flex-col items-center pt-5">
        {basketItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-5 h-[calc(100dvh-9.5rem)] md:h-[calc(100dvh-10rem)] lg:h-[calc(100dvh-11rem)]">
            <p className="font-medium text-center text-lg text-gray-800">
              Your cart
              <FontAwesomeIcon
                icon={faShoppingBasket}
                className="text-[0.9rem] sm:text-[1.1rem] md:text-xl mx-1"
              />
              is empty
            </p>
            <Link href={"/"}>
              <button className="bg-green-700 hover:bg-green-800 cursor-pointer text-white border-0 py-2 px-4 rounded">
                Start Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className=" flex flex-col">
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

            <div className="w-[85vw] md:w-[80vw] lg:w-[70vw] h-[calc(100dvh-11.7rem)] md:h-[calc(100dvh-12rem)] lg:h-[calc(100dvh-13.5rem)]  flex-grow pt-4 flex flex-col overflow-hidden shadow-md bg-white rounded-t-xl">
              <div className="mx-4 flex-1 overflow-y-auto hide-scrollbar">
                {basketItems.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center gap-3 border-b-2 border-gray-300 "
                  >
                    <div className="relative w-16 sm:w-20 md:w-36 lg:w-40 h-12 sm:h-14 md:h-16 lg:h-20 bg-white">
                      <Image
                        src={item.productImage}
                        alt={item.productName}
                        fill
                        sizes="w-16 sm:w-20 md:w-36 lg:w-40"
                        className="object-contain"
                      />
                    </div>

                    <div className="flex justify-between w-full text-gray-700 py-2">
                      <div className="flex flex-col items-start">
                        <h3 className="font-bold text-[0.9rem]  md:text-[1rem] lg:text-[1.1rem] text-gray-700">
                          {item.productName}
                        </h3>
                        <p className="text-sm">Quantity: {item.quantity}</p>

                        <button
                          onClick={() => removeItem(item.productId)}
                          className="text-red-600 hover:underline mt-auto text-[0.7rem] md:text-[0.8rem] cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="font-medium text-gray-800 text-[0.8rem] md:text-[1rem]  lg:text-[1.05rem] pt-2">
                          ₦{(item.price * item.quantity).toLocaleString()}
                        </p>
                        <span className="mt-auto">
                          <CartButton
                            item={item}
                            onQuantityChange={setBasketItems}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="sticky bottom-0 mt-auto flex font-medium shadow-inner shadow-gray-200 text-gray-700 flex-col">
                <div className="flex justify-between mt-2 pb-2 px-4">
                  <p className="text-[1rem] md:text-lg">Total Price</p>
                  <p className="text-right text-[1rem] md:text-xl text-gray-800 font-bold">
                    ₦{Math.round(totalPrice).toLocaleString()}
                  </p>
                </div>

                <Link href={"/checkout"}>
                  <Button className="w-full text-white py-5 sm:py-6 rounded-none text-sm sm:text-[1rem]  md:text-[1.1rem] lg:text-lg">
                    Check Out
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
