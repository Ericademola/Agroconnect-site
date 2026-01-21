"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import CartButton from "@/components/CartButton/CartButton";
import Image from "next/image";
import Catalogue from "@/components/Catalogue/Catalogue";
import { getProductById } from "@/hooks/getProducts";
import { IProducts } from "@/types";
import {
  CalendarIcon,
  LeftArrowIcon,
  LocationIcon,
  OrderBoxIcon,
  SatisfactionIcon,
  StarIcon,
} from "@/Icons";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import WishListButton from "@/components/WishListButton/WishListButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewRatingForm from "@/components/ReviewRatingForm/ReviewRatingForm";
import Rating from "@/components/Rating/Rating";

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
      {itemDetails && (
        <div className="mx-4 sm:mx-8 md:mx-12 ml:mx-16 lg:mx-18 flex flex-col">
          <Button
            variant="ghost"
            onClick={goBack}
            className="h-fit w-fit p-0 hover:bg-transparent"
          >
            <LeftArrowIcon
              className="w-[0.8rem] md:w-4 h-[0.8rem] md:h-4"
              strokeWidth={3}
            />
          </Button>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1.5fr] gap-5 md:gap-10">
            <div className="flex flex-col gap-3">
              <div className="bg-[#F3F3F3] border borer-[#0000001A] rounded-[15px] flex items-center justify-center">
                <Image
                  src={itemDetails.productImage}
                  alt={itemDetails.productName}
                  width={100}
                  height={100}
                  className="object-contain p-2 w-[300px] md:w-[400px] h-[200px] md:h-[350px]"
                />
              </div>
              <div className="flex items-center justify-center gap-3">
                {itemDetails.productDetailImages.map((image, index) => (
                  <div
                    key={index}
                    className="bg-[#F3F3F3] border borer-[#0000001A] rounded-[15px] px-4 md:px-[28px] py-2 md:py-[10px]"
                  >
                    <Image
                      src={image}
                      alt={itemDetails.productName}
                      width={100}
                      height={100}
                      className="object-contain w-[50px] h-[50px] md:w-[90px] md:h-[90px]"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="font-poppins text-[#000000CC] flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <h1 className="text-[clamp(18px,2.7vw,32px)] ">
                  {itemDetails.productName}({itemDetails.unit})
                </h1>
                <p className="text-[clamp(10px,1.2vw,16px)]">
                  {itemDetails.description}
                </p>
                <p className="text-[#1E1E1E] text-[clamp(18px,2.6vw,30px)] font-semibold">
                  ₦{itemDetails.price}
                </p>
                <div className="flex items-center gap-2 text-xs md:text-sm">
                  <Rating value={itemDetails.productAverageRating} />(
                  {itemDetails.productAverageRating}/5 from{" "}
                  {itemDetails.reviews.length} reviews)
                </div>
              </div>
              <div className="bg-[#F5F5F5] rounded-[15px] px-4 py-5 w-full sm:w-[90%] md:w-[80%] flex flex-col gap-4">
                <h3 className="text-sm md:text-lg">Preparation Option</h3>
                <RadioGroup defaultValue="stem-removed" className="gap-3">
                  {[
                    {
                      value: "stem-removed",
                      label: "Stem Removed (₦400)",
                    },
                    {
                      value: "washed-blended",
                      label: "Washed & Blended (₦1,000)",
                    },
                    {
                      value: "both",
                      label: "Both (₦1,400)",
                    },
                  ].map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem
                        value={option.value}
                        id={option.value}
                        className="border-[#1D1B20]"
                      />
                      <Label
                        htmlFor={option.value}
                        className="text-xs md:text-sm text-[#000000CC] font-poppins"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-[clamp(16px,1.4vw,18px)]">Quantity</h3>
                <CartButton item={itemDetails} className="w-full" />
                <WishListButton
                  item={itemDetails}
                  variant="text"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {itemDetails && (
        <div className="mx-4 sm:mx-5 md:mx-6 ml:mx-8 lg:mx-12">
          <div className="mt-8 md:mt-16 md:border-2 border-[#0000001A] rounded-[15px] pt-5">
            <Tabs defaultValue="description" className="w-full gap-0">
              <div>
                <TabsList className="w-full flex justify-start gap-5 rounded-none font-poppins bg-white md:border-b-2 border-[#0000001A] px-4 sm:px-[200px] md:px-[300px] lg:px-[400px]">
                  <TabsTrigger
                    value="description"
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-[2px] data-[state=active]:border-[#006C2B] data-[state=active]:rounded-none text-[#75757A] data-[state=active]:text-[#006C2B] text-[clamp(12px,1.2vw,18px)] pb-2 md:pb-5"
                  >
                    Description
                  </TabsTrigger>
                  <TabsTrigger
                    value="reviews"
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-[2px] data-[state=active]:border-[#006C2B] data-[state=active]:rounded-none text-[#75757A] data-[state=active]:text-[#006C2B] text-[clamp(12px,1.2vw,18px)] pb-2 md:pb-5"
                  >
                    Reviews ({itemDetails.reviews.length})
                  </TabsTrigger>
                  <TabsTrigger
                    value="farmerInfo"
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-[2px] data-[state=active]:border-[#006C2B] data-[state=active]:rounded-none text-[#75757A] data-[state=active]:text-[#006C2B] text-[clamp(12px,1.2vw,18px)] pb-2 md:pb-5"
                  >
                    Farmer’s Info
                  </TabsTrigger>
                </TabsList>
              </div>
              <div className="py-5 md:py-[54px] sm:px-5 md:px-[45px]">
                <TabsContent value="description">
                  <div className="text-[#00000099] text-[clamp(12px,1.4vw,16px)] font-poppins">
                    <h2 className="text-[#000000CC] text-[clamp(16px,1.8vw,24px)] font-geologica font-medium mb-3 md:mb-5">
                      Product Details
                    </h2>
                    <p>{itemDetails.productDetails}</p>
                    <div className="flex flex-col gap-3 md:gap-5 mt-6 md:mt-14">
                      <p>
                        <span className="text-[#000000CC] font-medium">
                          Best Used For:
                        </span>
                        {itemDetails.bestUsedFor}
                      </p>
                      <p>
                        <span className="text-[#000000CC] font-medium">
                          Storage Tips:
                        </span>
                        {itemDetails.storageTips}
                      </p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="reviews">
                  <div className="text-[#000000CC] font-poppins grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                      <h3 className="text-[clamp(16px,1.8vw,24px)] font-geologica font-medium mb-3 md:mb-5">
                        Feedbacks from customers
                      </h3>
                      <div className="flex flex-col gap-[10px] ">
                        {itemDetails.reviews.map((review) => (
                          <div
                            key={review.reviewId}
                            className="px-5 py-4 border border-[#0000001A] rounded-[15px] flex flex-col gap-5"
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="text-[clamp(14px,1.4vw,18px)] mb-1">
                                  {review.userName}
                                </h4>
                                <p className="text-[clamp(8px,1vw,10px)]">
                                  {review.reviewDate}
                                </p>
                              </div>
                              <Rating value={review.rate} />
                            </div>
                            <p className="text-[clamp(12px,1.2vw,14px)]">
                              {review.reviewText}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="bg-[#F5F5F5] rounded-[15px] px-5 py-4 text-[clamp(16px,1.8vw,24px)] flex flex-col gap-5 items-center justify-center">
                          <h3 className="font-geologica font-medium">
                            Average Rating
                          </h3>
                          <p>({itemDetails.productAverageRating}/5)</p>
                          <Rating
                            value={itemDetails.productAverageRating}
                            readOnly
                          />

                          <p className="text-[clamp(12px,1.2vw,14px)]">
                            {itemDetails.reviews.length} reviews
                          </p>
                        </div>
                        <div className="border border-[#0000001A] px-5 py-4 rounded-[15px]"></div>
                      </div>
                      <div className="border border-[#0000001A] px-5 py-4 rounded-[15px]">
                        <h3 className="text-[clamp(18px,1.8vw,24px)] font-geologica font-medium mb-3 md:mb-6">
                          Submit Your Review
                        </h3>
                        <ReviewRatingForm />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="farmerInfo">
                  <div className="text-[clamp(12px,1.4vw,16px)] text-center font-poppins flex flex-col items-center justify-center gap-8">
                    <Image
                      src={itemDetails.famersDetails.farmerProfilePic}
                      alt={itemDetails.famersDetails.farmerName}
                      width={100}
                      height={100}
                      className="object-cover border-8 border-[#00000029] rounded-[50px] w-[260px] h-[260px]"
                    />
                    <div className="flex flex-col items-center justify-center gap-4 md:gap-6">
                      <span className="flex items-center justify-center gap-2">
                        <h2 className="text-[#000000CC] text-[clamp(16px,2.8vw,30px)] font-medium leading-tight">
                          {itemDetails.famersDetails.farmerName}
                        </h2>
                        <p
                          className={`rounded-[60px] py-[5px] px-[20px] ${itemDetails.famersDetails.verificationStatus === "Verified" ? "text-[#148F45] bg-[#0ED25C1A]" : "text-[#FF0000] bg-[#FF00001A]"} text-[clamp(12px,1.2vw,16px)]`}
                        >
                          {itemDetails.famersDetails.verificationStatus}
                        </p>
                      </span>
                      <p className="text-[#75757A]">
                        {itemDetails.famersDetails.description}
                      </p>
                      <div className="flex items-center text-[#75757A]">
                        <span className="flex items-center gap-3 border-r border-[#0000001A] pr-3">
                          <LocationIcon className="w-8 h-8" />
                          <p>
                            {itemDetails.famersDetails.farmerState} state,{" "}
                            {itemDetails.famersDetails.farmerCountry}
                          </p>
                        </span>
                        <span className="flex items-center gap-3 pl-3">
                          <CalendarIcon className="w-8 h-8" />
                          <p>Joined {itemDetails.famersDetails.yearJoined}</p>
                        </span>
                      </div>
                      <div className="flex items-center gap-10 text-[#333333]">
                        <div className="flex flex-col gap-3">
                          <span className="flex items-center gap-2">
                            <StarIcon className="w-6 h-6" />
                            <p className="text-[clamp(14px,1.6vw,20px)] font-medium">
                              {itemDetails.famersDetails.farmerAverageRating}
                            </p>
                          </span>
                          <p className="text-[clamp(12px,1.6vw,14px)]">
                            {itemDetails.famersDetails.totalReviews} reviews
                          </p>
                        </div>
                        <div className="flex flex-col gap-3">
                          <span className="flex items-center gap-2">
                            <OrderBoxIcon className="w-6 h-6" />
                            <p className="text-[clamp(14px,1.6vw,20px)] font-medium">
                              {itemDetails.famersDetails.totalOrders}+
                            </p>
                          </span>
                          <p className="text-[clamp(12px,1.6vw,14px)]">
                            Orders
                          </p>
                        </div>
                        <div className="flex flex-col gap-3">
                          <span className="flex items-center gap-2">
                            <SatisfactionIcon className="w-6 h-6" />
                            <p className="text-[clamp(14px,1.6vw,20px)] font-medium">
                              {itemDetails.famersDetails.satisfactionRate}%
                            </p>
                          </span>
                          <p className="text-[clamp(12px,1.6vw,14px)]">
                            Satisfaction
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      )}
      {itemDetails && (
        <div className="mx-4 sm:mx-5 md:mx-6 ml:mx-8 lg:mx-12 my-16 md:my-36 flex flex-col gap-6">
          <h2 className="text-[#000000CC] text-[clamp(16px,2.8vw,30px)] font-geologica font-semibold text-start leading-tight w-full">
            Related Products
          </h2>
          <Catalogue excludeId={itemDetails.productId} sliceLimit={4} />
        </div>
      )}
    </div>
  );
}
