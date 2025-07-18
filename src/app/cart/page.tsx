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
import { BackIcon } from "@/Icons";

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
    const newItems = basketItems.filter((item) => item.id !== id);
    localStorage.setItem("BasketItems", JSON.stringify(newItems));
    setBasketItems(newItems);
  };

  const totalPrice = basketItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <div className="bg-gray-200 h-screen flex flex-col items-center pt-20 md:pt-24 lg:pt-28">
        {basketItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-5 h-[calc(100dvh-5rem)]">
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
          <div className="font-sans flex flex-col">
            <button
              onClick={goBack}
              className="text-gray-800 text-[1rem] flex items-center font-medium py-1 px-3 mb-2 w-fit bg-green-200 hover:text-gray-600 cursor-pointer rounded-lg"
            >
              <BackIcon /> Back
            </button>

            <div className="w-[85vw] md:w-[70vw] pt-4 flex flex-col overflow-hidden h-[calc(100dvh-7.5rem)]  md:h-[calc(100dvh-8.5rem)] lg:h-[calc(100dvh-9.5rem)] shadow-md bg-white rounded-t-xl">
              <div className="mx-4 h-[calc(100dvh-7.5rem)] overflow-y-auto hide-scrollbar">
                {basketItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 border-b-2 border-gray-300"
                  >
                    <div className="relative w-16 sm:w-20 md:w-36 lg:w-40 h-20 sm:h-24 md:h-32 lg:h-36 bg-white">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain"
                      />
                    </div>

                    <div className="flex justify-between w-full text-gray-700 py-3">
                      <div className="flex flex-col items-start">
                        <h3 className="font-bold text-[0.9rem] md:text-[1.2rem] text-gray-700">
                          {item.name}
                        </h3>
                        <p className="text-sm">Quantity: {item.quantity}</p>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:underline mt-auto text-[0.8rem] md:text-[1rem] cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="font-medium text-gray-800 text-[0.8rem] md:text-[1.1rem] pt-2">
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

              <div className="mt-auto flex font-medium shadow-inner shadow-gray-200 text-gray-700 flex-col">
                <div className="flex justify-between mt-4 pb-2 px-4">
                  <p className="text-[1rem] md:text-lg">Total Price</p>
                  <p className="text-right text-[1rem] md:text-xl text-gray-800 font-bold">
                    ₦{Math.round(totalPrice).toLocaleString()}
                  </p>
                </div>

                <Link href={"/checkout"}>
                  <button className="w-full bg-green-700 text-white py-2  text-sm  md:text-[1rem] lg:text-lg hover:bg-green-800">
                    Check Out
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
