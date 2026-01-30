"use client";
import { Button } from "@/components/ui/button";
import { IProducts, WishlistItem } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import CartButton from "@/components/CartButton/CartButton";
import WishListButton from "@/components/WishListButton/WishListButton";
import EmptyPage from "@/components/EmptyPage/EmptyPage";

const WishListPage = () => {
  const [wishListItems, setWishListItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("WishlistItems");
    if (stored) {
      setWishListItems(JSON.parse(stored));
    }
  }, []);

  return (
    <>
      {wishListItems.length === 0 ? (
        <EmptyPage
          title="You haven’t saved any favourites yet"
          subtitle="Browse through our collection and save your favourite items to keep track of what you love"
          image="/assets/avatars/emptyWishlist.svg"
          altText="empty wishlist"
          buttonText="Start Exploring"
          buttonhref="/wishList"
        />
      ) : (
        <div className="mx-4 sm:mx-5 md:mx-6 ml:mx-8 lg:mx-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 ml:grid-cols-3 lg:grid-cols-4 gap-7">
            {wishListItems.map((item: IProducts) => (
              <div key={item.productId} className="flex flex-col gap-3 h-full">
                <Link href={`/products/${item.productName}`}>
                  <div className="bg-[#F3F3F3] rounded-[15px] flex flex-col w-full h-full items-center pb-2">
                    <Button
                      size="sm"
                      className="bg-[#8B5E3C] hover:bg-[#8B5E3C]/90 rounded-none rounded-tr-[15px] rounded-bl-[15px] text-xs md:text-sm w-fit ml-auto px-4 py-5"
                    >
                      {item.tagText}
                    </Button>
                    <Image
                      src={item.productImage}
                      alt={item.productName}
                      width={100}
                      height={100}
                      className="w-[270px] h-[280px] object-contain"
                    />
                  </div>
                </Link>
                <div className="flex flex-col gap-[10px] font-poppins flex-1">
                  <span className="flex items-center gap-2 text-[#000000CC] text-xl font-medium">
                    <h3 className="truncate">{item.productName}</h3>
                    <p className="text-nowrap">({item.unit})</p>
                  </span>

                  <p className="text-[#000000CC] text-sm">
                    By Farmer {item.famersDetails.farmerName.split(" ")[0]},{" "}
                    {item.famersDetails.farmerState} State.
                  </p>
                  <p className="font-semibold text-[#1E1E1E] text-xl">
                    ₦{item.price}
                  </p>

                  <div className="mt-auto grid grid-cols-[1fr_auto] items-end gap-[23px] w-full">
                    <CartButton item={item} />
                    <WishListButton item={item} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default WishListPage;
