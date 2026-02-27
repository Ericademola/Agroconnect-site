"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Catalogue from "@/components/Catalogue/Catalogue";
import {
  getBasketItems,
  getItemQuantity,
  getProductById,
} from "@/hooks/getProducts";
import { IAddOns, IProducts } from "@/types";
import {
  CalendarIcon,
  LocationIcon,
  OrderBoxIcon,
  SatisfactionIcon,
  StarIcon,
} from "@/Icons";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewRatingForm from "@/components/Forms/ReviewRatingForm";
import Rating from "@/components/Rating/Rating";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { getSavingsCart } from "@/hooks/getSavings";
import { SavingsCartButton } from "@/app/shop/shop-savings/page";
import { getLoanCart } from "@/hooks/getLoans";
import { LoanCartButton } from "../shop-loans/page";
import DecrementAndIncrementButton from "@/components/CatalogueButtons/CartButton/DecrementAndIncrementButton";
import AddToCartButton from "@/components/CatalogueButtons/CartButton/AddToCartButton";
import WishListButton from "@/components/CatalogueButtons/WishListButton";

export default function ProductDetails() {
  const [itemDetails, setItemDetails] = useState<IProducts | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState<IAddOns[]>([]);

  const router = useRouter();
  const params = useParams();

  const paramProp = Array.isArray(params?.productId)
    ? params?.productId[0]
    : (params?.productId ?? "");
  const [actionType, productId] = (paramProp || "").split("-") ?? [];

  useEffect(() => {
    const id = Number(productId);
    const product = getProductById(id);

    if (!product) {
      router.push("/not-found");
    } else {
      setItemDetails(product);
    }
  }, [productId, router]);

  useEffect(() => {
    if (!itemDetails) return;

    const storedQty = getItemQuantity(itemDetails.productId);
    setQuantity(storedQty > 0 ? storedQty : 1);

    const basketItems = getBasketItems();
    const cartItem = basketItems.find(
      (item) => item.productId === itemDetails.productId,
    );

    if (cartItem && cartItem.addOns) {
      setSelectedAddOns(cartItem.addOns);
    }

    const savedItems = getSavingsCart();
    const savedItem = savedItems.find(
      (item) => item.productId === itemDetails.productId,
    );

    if (savedItem && savedItem.addOns) {
      setSelectedAddOns(savedItem.addOns);
    }

    const loanItems = getLoanCart();
    const loanItem = loanItems.find(
      (item) => item.productId === itemDetails.productId,
    );

    if (loanItem && loanItem.addOns) {
      setSelectedAddOns(loanItem.addOns);
    }
  }, [itemDetails]);

  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      router.push("/");
    }
  };

  const handleAddOnToggle = (option: { title: string; price: number }) => {
    setSelectedAddOns((prev) => {
      const exists = prev.find((addOn) => addOn.title === option.title);

      if (exists) {
        return prev.filter((addOn) => addOn.title !== option.title);
      }

      return [...prev, { title: option.title, price: option.price }];
    });
  };

  return (
    <div className="relative">
      {itemDetails && (
        <div className="mx-4 sm:mx-8 md:mx-12 ml:mx-16 lg:mx-18 flex flex-col">
          <div className="mb-4">
            <Breadcrumb>
              <BreadcrumbList className="text-[#787878CC]">
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Button
                      variant="ghost"
                      onClick={goBack}
                      className="h-fit w-fit p-0 hover:bg-transparent"
                    >
                      Back
                    </Button>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-[#2B2B2B]">
                    Product Details
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="grid grid-cols-1  md:grid-cols-[2fr_1.8fr] lg:grid-cols-[2fr_1.5fr] gap-5 md:gap-7 lg:gap-10">
            <div className="flex flex-col gap-3">
              <div className="bg-[#F3F3F3] border borer-[#0000001A] rounded-2xl flex items-center justify-center">
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
                    className="bg-[#F3F3F3] border borer-[#0000001A] rounded-2xl md:px-5 px-4 lg:px-7 py-2 md:py-[10px]"
                  >
                    <Image
                      src={image}
                      alt={itemDetails.productName}
                      width={100}
                      height={100}
                      className="object-contain w-[50px] h-[50px] md:w-[70px] md:h-[70px] lg:w-[90px] lg:h-[90px]"
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
              <div className="bg-[#F5F5F5] rounded-2xl px-4 py-5 w-full sm:w-[90%] md:w-[80%] flex flex-col gap-4">
                <FieldSet>
                  <FieldLegend variant="label" className="text-sm md:text-lg">
                    Preparation Option
                  </FieldLegend>
                  <FieldGroup className="gap-3">
                    {itemDetails.addOns.map((option) => (
                      <Field orientation="horizontal" key={option.title}>
                        <Checkbox
                          id={option.title}
                          checked={selectedAddOns.some(
                            (addOn) => addOn.title === option.title,
                          )}
                          onCheckedChange={() => handleAddOnToggle(option)}
                        />

                        <FieldLabel
                          htmlFor={option.title}
                          className="font-normal"
                        >
                          {option.title} (₦{option.price})
                        </FieldLabel>
                      </Field>
                    ))}
                  </FieldGroup>
                </FieldSet>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-[clamp(16px,1.4vw,18px)]">Quantity</h3>
                <DecrementAndIncrementButton
                  quantity={quantity}
                  onIncrement={() => setQuantity((q) => q + 1)}
                  onDecrement={() => setQuantity((q) => Math.max(0, q - 1))}
                  className="w-1/2"
                />
                <AddToCartButton
                  item={itemDetails}
                  quantity={quantity}
                  addOns={selectedAddOns}
                  className="w-full"
                  actionType={actionType}
                />
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

      {/* TAB SECTION */}
      {itemDetails && (
        <section className="mx-4 sm:mx-5 md:mx-6 ml:mx-8 lg:mx-12">
          <div className="mt-8 md:mt-16 sm:border-2 border-[#0000001A] rounded-2xl pt-5">
            <Tabs defaultValue="description" className="w-full gap-0">
              <div className="sm:border-b-2 border-[#0000001A]">
                <TabsList className="w-[90%] sm:w-[70%] md:w-[60%] ml:w-[50%] flex justify-center mx-auto gap-2 rounded-none font-poppins bg-white">
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
                    {` Farmer's Info`}
                  </TabsTrigger>
                </TabsList>
              </div>
              <div className="py-5 md:py-8 lg:py-[54px] sm:px-5 md:px-6 lg:px-[45px]">
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
                        </span>{" "}
                        {itemDetails.bestUsedFor}
                      </p>
                      <p>
                        <span className="text-[#000000CC] font-medium">
                          Storage Tips:
                        </span>{" "}
                        {itemDetails.storageTips}
                      </p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="reviews">
                  <div className="text-[#000000CC] font-poppins grid grid-cols-1 md:grid-cols-2 gap-6 ml:gap-8 lg:gap-12">
                    <div>
                      <h3 className="text-[clamp(16px,1.8vw,24px)] font-geologica font-medium mb-3 md:mb-5">
                        Feedbacks from customers
                      </h3>
                      <div className="flex flex-col gap-[10px]">
                        {itemDetails.reviews.map((review) => (
                          <div
                            key={review.reviewId}
                            className="px-5 py-4 border border-[#0000001A] rounded-2xl flex flex-col gap-3 md:gap-4 lg:gap-5"
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="text-[clamp(14px,1.4vw,18px)] mb-1">
                                  {review.userFullName}
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
                    <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
                      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-3 lg:gap-6">
                        <div className="bg-[#F5F5F5] rounded-2xl px-4 lg:px-5 py-4 text-[clamp(16px,1.8vw,24px)] flex flex-col gap-5 items-center justify-center">
                          <h3 className="font-geologica font-medium text-center">
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
                        <div className="border border-[#0000001A] px-4 lg:px-5 py-4 rounded-2xl flex flex-col justify-between">
                          {[
                            { star: 5, quantity: 3 },
                            { star: 4, quantity: 2 },
                            { star: 3, quantity: 1 },
                            { star: 2, quantity: 0 },
                            { star: 1, quantity: 0 },
                          ].map((item) => (
                            <div
                              key={item.star}
                              className={cn(
                                "grid grid-cols-[auto_1fr_auto] items-center gap-3 font-poppins",
                                item.quantity === 0
                                  ? "text-[#75757A]"
                                  : "text-[#000000CC]",
                              )}
                            >
                              <p className="text-[clamp(12px,1.2vw,14px)] font-medium whitespace-nowrap">
                                {item.star} star
                              </p>

                              <Progress value={item.quantity} max={5} />

                              <p className="text-[clamp(10px,1vw,12px)] tabular-nums">
                                {item.quantity}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="border border-[#0000001A] px-4 lg:px-5 py-4 rounded-2xl">
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
                      className="object-cover border-8 border-[#00000029] rounded-[50px] w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] md:w-[260px] md:h-[260px]"
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
        </section>
      )}

      {/* RELATED PRODUCTS SECTION */}
      {itemDetails && (
        <section className="mx-4 sm:mx-5 md:mx-6 ml:mx-8 lg:mx-12 my-16 md:my-36 flex flex-col gap-6">
          <h2 className="text-[#000000CC] text-[clamp(16px,2.8vw,30px)] font-geologica font-semibold text-start leading-tight w-full">
            Related Products
          </h2>
          <Catalogue
            excludeId={itemDetails.productId}
            sliceLimit={4}
            actionType={actionType}
          />
        </section>
      )}

      {actionType === "save" && (
        <div className="fixed bottom-10 right-10 md:right-15">
          <SavingsCartButton />
        </div>
      )}

      {actionType === "loan" && (
        <div className="fixed bottom-10 right-10 md:right-15">
          <LoanCartButton />
        </div>
      )}
    </div>
  );
}
