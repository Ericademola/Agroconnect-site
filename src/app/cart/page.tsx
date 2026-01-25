"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import CartButton from "@/components/CartButton/CartButton";
import { CartItem, IAddOns } from "@/types";
import { CartIcon, DeleteIcon, DownIcon } from "@/Icons";
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/PageTitle/PageTitle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useCartActions } from "@/hooks/useCartActions";
import SearchInput from "@/components/SearchInput/SearchInput";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { getProductById } from "@/hooks/getProducts";

export default function CartPage() {
  const [basketItems, setBasketItems] = useState<CartItem[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("BasketItems");
    if (stored) {
      setBasketItems(JSON.parse(stored));
    }
  }, []);

  const { removeFromCart } = useCartActions(setBasketItems);
  const { updateCart } = useCartActions(setBasketItems);

  const totalPrice = basketItems.reduce((sum, item) => {
    const addOnsTotal =
      item.addOns?.reduce((aSum, addOn) => aSum + addOn.price, 0) ?? 0;

    return sum + (item.price + addOnsTotal) * item.quantity;
  }, 0);

  const deliveryFee = 5000;

  // Handle toggling addOns for a specific item
  const handleAddOnToggle = (
    item: CartItem,
    option: { title: string; price: number },
  ) => {
    const currentAddOns = item.addOns || [];
    const exists = currentAddOns.find((addOn) => addOn.title === option.title);

    let updatedAddOns: IAddOns[];
    if (exists) {
      updatedAddOns = currentAddOns.filter(
        (addOn) => addOn.title !== option.title,
      );
    } else {
      updatedAddOns = [
        ...currentAddOns,
        { title: option.title, price: option.price },
      ];
    }

    updateCart(item, item.quantity, updatedAddOns);
  };

  return (
    <div>
      {basketItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-7 py-12">
          <Image
            src="/assets/avatars/emptyCart.svg"
            alt="empty cart"
            width={100}
            height={100}
            className="object-contain w-[120px] h-[120px] md:w-[160px] md:h-[160px] lg:w-[180px] lg:h-[180px] mx-auto"
          />
          <div className="text-[#00000099] flex flex-col items-center justify-center">
            <h3 className="text-[clamp(16px,1.5vw,24px)] font-geologica font-medium">
              Your basket’s feeling a little light
            </h3>
            <p className="text-[clamp(12px,1.3vw,14px)] font-poppins">
              No worries, we’ve got plenty of farm-fresh produce waiting for you
            </p>
            <Button
              variant="default"
              size="lg"
              className="flex items-center gap-2 mt-3"
              href="/shop"
            >
              <CartIcon className="w-5 h-5" fill="#fff" />
              Start Shopping
            </Button>
          </div>
        </div>
      ) : (
        <>
          <PageTitle
            title="Cart"
            description="Review your items before checkout"
          />
          <div className="mx-4 sm:mx-5 md:mx-6 ml:mx-8 lg:mx-12 pt-3 md:pt-6 pb-32 flex flex-col gap-4">
            <div>
              <Breadcrumb>
                <BreadcrumbList className="text-[#787878CC] text-sm md:text-lg font-poppins">
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/">Home</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-[#2B2B2B]">
                      Cart
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div className="flex flex-col">
              <div className="flex items-end justify-between">
                <h2 className="text-black font-poppins font-medium text-[clamp(16px,1.8vw,22px)] mb-1 hidden md:block">
                  Items ({basketItems.length})
                </h2>
                <div className="ml:hidden mb-3 ml-auto sm:w-1/2">
                  <SearchInput
                    setSearchText={setSearchText}
                    leftIcon={false}
                    className="w-full h-[40px] md:h-[50px] border-[1.5px] border-[#0000001A] pr-0 rounded-[5px] md:rounded-[15px]"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="order-2 md:order-1  mt-7 md:mt-0">
                  <h2 className="text-black font-poppins font-medium text-base mb-1 block md:hidden">
                    Items ({basketItems.length})
                  </h2>
                  <div className="hidden md:block overflow-hidden border border-[#00000033] rounded-[15px]">
                    <table className="w-full border-collapse font-poppins">
                      <thead className="sticky top-0 z-10 bg-[#F5F5F5] text-[clamp(14px,1.9vw,20px)] text-[#000000CC] text-nowrap font-geologica">
                        <tr>
                          <th className="py-3 px-4 font-normal text-start"></th>
                          <th className="py-3 px-4 font-normal text-start">
                            Product
                          </th>
                          <th className="py-3 px-4 font-normal text-start">
                            Price
                          </th>
                          <th className="py-3 px-4 font-normal text-start">
                            Quantity
                          </th>
                          <th className="py-3 px-4 font-normal text-start">
                            Add On
                          </th>
                          <th className="py-3 px-4 font-normal text-start">
                            Subtotal
                          </th>
                          <th className="py-3 px-4 font-normal text-end"></th>
                        </tr>
                      </thead>
                      <tbody className="text-[#1E1E1E] text-[clamp(14px,1.3vw,16px)]">
                        {basketItems.map((item) => (
                          <tr
                            key={item.productId}
                            className="border-b border-[#0000001A]"
                          >
                            <td className="py-2 px-3 lg:px-4">
                              <Link
                                href={`/shop/${item.productId}`}
                                className="border border-[#0000001A] rounded-[15px] p-1 inline-block"
                              >
                                <Image
                                  src={item.productImage}
                                  alt={item.productName}
                                  width={50}
                                  height={50}
                                  className="object-contain w-auto lg:w-[50px] h-[50px]"
                                />
                              </Link>
                            </td>
                            <td className="py-2 px-3 lg:px-4 text-[clamp(14px,1.5vw,18px)] text-black ">
                              {item.productName} ({item.unit})
                            </td>
                            <td className="py-2 px-3 lg:px-4">
                              ₦{item.price.toLocaleString()}
                            </td>
                            <td className="py-2 px-3 lg:px-4">
                              <CartButton
                                item={item}
                                onQuantityChange={setBasketItems}
                                className="md:w-[120px] lg:w-[150px]"
                              />
                            </td>
                            <td className="py-2 px-3 lg:px-4">
                              <Popover>
                                <PopoverTrigger asChild>
                                  <div className="border border-[#0000001A] rounded-[10px] flex items-center justify-between gap-2 px-2 py-1">
                                    <p>
                                      {item.addOns && item.addOns.length > 0
                                        ? `₦${item.addOns.reduce((sum, addOn) => sum + addOn.price, 0).toLocaleString()}`
                                        : "-"}
                                    </p>
                                    <DownIcon className="w-3 h-3 cursor-pointer" />
                                  </div>
                                </PopoverTrigger>
                                <PopoverContent className="mr-4 sm:mr-5 md:mr-6 ml:mr-8 lg:mr-12">
                                  <div>
                                    <FieldSet>
                                      <FieldLegend
                                        variant="label"
                                        className="text-sm md:text-lg"
                                      >
                                        Preparation Option
                                      </FieldLegend>
                                      <FieldGroup className="gap-3">
                                        {(() => {
                                          const product = getProductById(
                                            item.productId,
                                          );
                                          const allAddOns =
                                            product?.addOns || [];

                                          return allAddOns.map(
                                            (allOptions: IAddOns) => {
                                              const isSelected =
                                                item.addOns?.some(
                                                  (selectedAddOn) =>
                                                    selectedAddOn.title ===
                                                    allOptions.title,
                                                ) || false;

                                              return (
                                                <Field
                                                  orientation="horizontal"
                                                  key={allOptions.title}
                                                >
                                                  <Checkbox
                                                    id={`${item.productId}-${allOptions.title}`}
                                                    checked={isSelected}
                                                    onCheckedChange={() =>
                                                      handleAddOnToggle(
                                                        item,
                                                        allOptions,
                                                      )
                                                    }
                                                  />
                                                  <FieldLabel
                                                    htmlFor={`${item.productId}-${allOptions.title}`}
                                                    className="font-normal text-sm"
                                                  >
                                                    {allOptions.title} (₦
                                                    {allOptions.price.toLocaleString()}
                                                    )
                                                  </FieldLabel>
                                                </Field>
                                              );
                                            },
                                          );
                                        })()}
                                      </FieldGroup>
                                    </FieldSet>
                                  </div>
                                </PopoverContent>
                              </Popover>
                            </td>
                            <td className="py-2 px-3 lg:px-4 font-medium">
                              ₦{(item.price * item.quantity).toLocaleString()}
                            </td>
                            <td className="py-2 px-3 lg:px-4 text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFromCart(item.productId)}
                                className="text-[#C09706] hover:text-[#C09706]/90 text-[clamp(12px,1.4vw,14px)] hover:bg-transparent inline-flex items-center gap-1"
                              >
                                <DeleteIcon className="w-5 h-5" />
                                <p className="hidden ml:block">Remove</p>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex flex-col gap-6 md:hidden">
                    {basketItems.map((item) => (
                      <div
                        key={item.productId}
                        className="grid grid-cols-[auto_1fr] gap-3 font-poppins rounded-[12px] shadow-sm shadow-[#00000014] border border-[#00000014] px-3 py-4"
                      >
                        <Link
                          href={`/shop/${item.productId}`}
                          className="border border-[#0000001A] rounded-[10px] p-1 inline-block"
                        >
                          <Image
                            src={item.productImage}
                            alt={item.productName}
                            width={50}
                            height={50}
                            className="object-contain w-auto sm:w-[80px] h-[100px]"
                          />
                        </Link>
                        <div className="flex flex-col gap-3">
                          <h3 className="text-sm text-black">
                            {item.productName} ({item.unit})
                          </h3>
                          <div className="flex items-center text-[10px] text-[#1E1E1E99]">
                            <p className="pr-2">
                              Price:{" "}
                              <span className="text-[#1E1E1E]">
                                ₦{item.price.toLocaleString()}
                              </span>
                            </p>
                            <p className="border-r-2 border-l-2 px-2">
                              Add-on:{" "}
                              <span className="text-[#1E1E1E]">
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <div className="border border-[#0000001A] rounded-[5px] flex items-center justify-between gap-2 px-2 py-1">
                                      <p>
                                        {item.addOns && item.addOns.length > 0
                                          ? `₦${item.addOns.reduce((sum, addOn) => sum + addOn.price, 0).toLocaleString()}`
                                          : "-"}
                                      </p>
                                      <DownIcon className="w-[10px] h-[10px] cursor-pointer" />
                                    </div>
                                  </PopoverTrigger>
                                  <PopoverContent className="mr-7 sm:mr-10">
                                    <div>
                                      <FieldSet>
                                        <FieldLegend
                                          variant="label"
                                          className="text-sm"
                                        >
                                          Preparation Option
                                        </FieldLegend>
                                        <FieldGroup className="gap-3">
                                          {(() => {
                                            const product = getProductById(
                                              item.productId,
                                            );
                                            const allAddOns =
                                              product?.addOns || [];

                                            return allAddOns.map(
                                              (allOptions: IAddOns) => {
                                                const isSelected =
                                                  item.addOns?.some(
                                                    (selectedAddOn) =>
                                                      selectedAddOn.title ===
                                                      allOptions.title,
                                                  ) || false;

                                                return (
                                                  <Field
                                                    orientation="horizontal"
                                                    key={allOptions.title}
                                                  >
                                                    <Checkbox
                                                      id={`${item.productId}-${allOptions.title}`}
                                                      checked={isSelected}
                                                      onCheckedChange={() =>
                                                        handleAddOnToggle(
                                                          item,
                                                          allOptions,
                                                        )
                                                      }
                                                    />
                                                    <FieldLabel
                                                      htmlFor={`${item.productId}-${allOptions.title}`}
                                                      className="font-normal text-xs"
                                                    >
                                                      {allOptions.title} (₦
                                                      {allOptions.price.toLocaleString()}
                                                      )
                                                    </FieldLabel>
                                                  </Field>
                                                );
                                              },
                                            );
                                          })()}
                                        </FieldGroup>
                                      </FieldSet>
                                    </div>
                                  </PopoverContent>
                                </Popover>
                              </span>
                            </p>
                            <p className="pl-2">
                              Sub-total{" "}
                              <span className="text-[#1E1E1E]">
                                ₦{(item.price * item.quantity).toLocaleString()}
                              </span>
                            </p>
                          </div>
                          <div className="flex items-end gap-4">
                            <CartButton
                              item={item}
                              onQuantityChange={setBasketItems}
                              className="w-[120px]"
                            />
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => removeFromCart(item.productId)}
                              className="text-[#C09706] hover:text-[#C09706]/90 text-[10px] inline-flex items-center gap-1 h-[35px]"
                            >
                              <DeleteIcon className="w-5 h-5" />
                              <p>Remove</p>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="order-1 md:order-2 overflow-hidden border border-[#00000033] rounded-[15px] md:w-1/2 md:ml-auto md:mt-14 flex flex-col gap-6 pb-4">
                  <table className="w-full border-collapse font-poppins">
                    <thead className="sticky top-0 z-10 bg-[#F5F5F5] text-[clamp(14px,1.6vw,24px)] text-black font-poppins">
                      <tr>
                        <th className="py-4 px-6 font-bold text-start">
                          Cart summary
                        </th>
                        <th className="py-4 px-6 font-bold text-end">
                          {basketItems.length} Items
                        </th>
                      </tr>
                    </thead>

                    <tbody className="text-[#000000CC] text-[clamp(14px,1.6vw,18px)]">
                      <tr className="border-b border-[#0000001A]">
                        <td className="py-5 px-6">Subtotal:</td>
                        <td className="py-5 px-6 text-end">
                          ₦{" "}
                          {totalPrice.toLocaleString("en-NG", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                      </tr>
                      <tr className="border-b border-[#0000001A]">
                        <td className="py-5 px-6">Delivery Fee</td>
                        <td className="py-5 px-6 text-end">
                          ₦ {""}
                          {deliveryFee.toLocaleString()}
                        </td>
                      </tr>
                      <tr className="font-semibold">
                        <td className="py-5 px-6">Total:</td>
                        <td className="py-5 px-6 text-end">
                          ₦{" "}
                          {(totalPrice + deliveryFee).toLocaleString("en-NG", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="flex flex-col gap-3 w-[80%] mx-auto">
                    <Button
                      variant="default"
                      size="sm"
                      href="/checkout"
                      className="py-5"
                    >
                      Proceed to Checkout (₦{" "}
                      {(totalPrice + deliveryFee).toLocaleString("en-NG", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                      )
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      href="/shop"
                      className="py-5"
                    >
                      Continue Shopping
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
