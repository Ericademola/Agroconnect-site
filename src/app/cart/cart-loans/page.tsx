"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { IAddOns, CartItem } from "@/types";
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
import EmptyPage from "@/components/EmptyPage/EmptyPage";
import { LOAN_UPDATED_EVENT } from "@/lib/events";
import { DrawerDialog } from "@/components/DrawerDialog/DrawerDialog";
import PopUpUtility from "@/components/PopUtility/PopUtility";
// import PaymentCard from "@/components/PaymentCard/PaymentCard";
// import PopNotification from "@/components/PopNotification/PopNotification";
import {
  // clearLoanCart,
  // createLoanPlan,
  getLoanCart,
  getLoanedPlans,
  ILoanCartItem,
} from "@/hooks/getLoans";
import { useLoanActions } from "@/hooks/useLoanActions";
import LoanPlanForm from "@/components/Forms/LoanPlanForm";
import CartButton from "@/components/CatalogueButtons/CartButton/CartButton";

// Helper to convert loan cart items to full cart items with product details
const convertToCartItems = (cartItems: ILoanCartItem[]): CartItem[] => {
  return cartItems
    .map((cartItem) => {
      const product = getProductById(cartItem.productId);
      if (!product) return null;

      return {
        ...product,
        quantity: cartItem.quantity,
        addOns: cartItem.addOns,
      } as CartItem;
    })
    .filter((item): item is CartItem => item !== null);
};

export default function CartLoansPage() {
  const router = useRouter();
  const [cartItemsWithDetails, setCartItemsWithDetails] = useState<CartItem[]>(
    [],
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchText, setSearchText] = useState("");
  const [isShowProceedWithSavings, setIsShowProceedWithSavings] =
    useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [hasActiveLoan, setHasActiveLoan] = useState(false);

  useEffect(() => {
    const loadLoansCart = () => {
      const cart = getLoanCart();
      setCartItemsWithDetails(convertToCartItems(cart));
    };

    loadLoansCart();

    window.addEventListener(LOAN_UPDATED_EVENT, loadLoansCart);
    return () => {
      window.removeEventListener(LOAN_UPDATED_EVENT, loadLoansCart);
    };
  }, []);

  useEffect(() => {
    const activeLoanPlans = getLoanedPlans();
    const hasActive = activeLoanPlans.some(
      (plan) => plan.loanStatus === "ACTIVE",
    );
    setHasActiveLoan(hasActive);
  }, []);

  const { removeFromLoans, updateLoanCartItem } = useLoanActions();

  const totalPrice = cartItemsWithDetails.reduce((sum, item) => {
    const productPrice = item.price || 0;
    const addOnsTotal =
      item.addOns?.reduce((aSum, addOn) => aSum + addOn.price, 0) ?? 0;

    return sum + (productPrice + addOnsTotal) * item.quantity;
  }, 0);

  const interestAmount = 2500;
  const deliveryFee = 5000;

  // Handle toggling addOns for a specific item
  const handleAddOnToggle = (
    cartItem: CartItem,
    option: { title: string; price: number },
  ) => {
    const currentAddOns = cartItem.addOns || [];
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

    updateLoanCartItem(cartItem, cartItem.quantity, updatedAddOns);
  };

  const handleProceedWithLoan = () => {
    setTimeout(() => {
      setIsShowProceedWithSavings(false);
      setSubmitStatus("success");
    }, 600);
  };

  const handleContinueToCheckout = () => {
    setTimeout(() => {
      setSubmitStatus("idle");
      setCheckoutLoading(true);
      router.push("/checkout/checkout-loans");
    }, 800);
  };

  return (
    <>
      <div>
        {cartItemsWithDetails.length === 0 ? (
          <EmptyPage
            title="Your Loan basket is empty"
            subtitle="Add items to your basket to get started"
            image="/assets/avatars/emptyCart.svg"
            altText="empty cart"
            buttonText="Start Shopping for Food on Credit"
            buttonIcon={<CartIcon className="w-5 h-5" fill="#fff" />}
            buttonhref="/shop/shop-loans"
          />
        ) : (
          <>
            <PageTitle
              title="My Cart (Food on Credit)"
              description="Review your items before checkout"
            />
            <div className="mx-4 sm:mx-5 md:mx-6 ml:mx-8 lg:mx-12 pt-3 md:pt-6 pb-32 flex flex-col gap-4">
              <div>
                <Breadcrumb>
                  <BreadcrumbList className="text-[#787878CC] text-[clamp(12px,1.6vw,18px)]">
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link href="/">Home</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage className="text-[#2B2B2B]">
                        Loan Cart
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              <div className="flex flex-col">
                <div className="flex items-end justify-between">
                  <h2 className="text-black font-poppins font-medium text-[clamp(16px,1.8vw,22px)] mb-1 hidden md:block">
                    Items ({cartItemsWithDetails.length})
                  </h2>
                  <div className="ml:hidden mb-3 ml-auto sm:w-1/2">
                    <SearchInput
                      setSearchText={setSearchText}
                      leftIcon={false}
                      className="w-full h-[40px] md:h-[50px] border-[1.5px] border-[#0000001A] pr-0 rounded-[5px] md:rounded-2xl"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="order-2 md:order-1 mt-7 md:mt-0">
                    <h2 className="text-black font-poppins font-medium text-base mb-1 block md:hidden">
                      Items ({cartItemsWithDetails.length})
                    </h2>

                    {/* Desktop Table View */}
                    <div className="hidden md:block overflow-hidden border border-[#00000033] rounded-2xl">
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
                          {cartItemsWithDetails.map((item) => {
                            const addOnsTotal =
                              item.addOns?.reduce(
                                (sum, addOn) => sum + addOn.price,
                                0,
                              ) ?? 0;

                            return (
                              <tr
                                key={item.productId}
                                className="border-b border-[#0000001A]"
                              >
                                <td className="py-2 px-3 lg:px-4">
                                  <Link
                                    href={`/shop/loan-${item.productId}`}
                                    className="border border-[#0000001A] rounded-2xl p-1 inline-block"
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
                                <td className="py-2 px-3 lg:px-4 text-[clamp(14px,1.5vw,18px)] text-black">
                                  {item.productName} ({item.unit})
                                </td>
                                <td className="py-2 px-3 lg:px-4">
                                  ₦{item.price.toLocaleString()}
                                </td>
                                <td className="py-2 px-3 lg:px-4">
                                  <CartButton
                                    item={item}
                                    className="md:w-[120px] lg:w-[150px]"
                                  />
                                </td>
                                <td className="py-2 px-3 lg:px-4">
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <div className="border border-[#0000001A] rounded-[10px] flex items-center justify-between gap-2 px-2 py-1 cursor-pointer">
                                        <p>
                                          {item.addOns && item.addOns.length > 0
                                            ? `₦${addOnsTotal.toLocaleString()}`
                                            : "-"}
                                        </p>
                                        <DownIcon className="w-3 h-3" />
                                      </div>
                                    </PopoverTrigger>
                                    <PopoverContent className="mr-4 sm:mr-5 md:mr-6 ml:mr-8 lg:mr-12">
                                      <FieldSet>
                                        <FieldLegend
                                          variant="label"
                                          className="text-sm md:text-lg"
                                        >
                                          Preparation Options
                                        </FieldLegend>
                                        <FieldGroup className="gap-3">
                                          {(() => {
                                            const fullProduct = getProductById(
                                              item.productId,
                                            );
                                            const allAddOns =
                                              fullProduct?.addOns || [];

                                            return allAddOns.map(
                                              (option: IAddOns) => {
                                                const isSelected =
                                                  item.addOns?.some(
                                                    (a) =>
                                                      a.title === option.title,
                                                  ) || false;

                                                return (
                                                  <Field
                                                    orientation="horizontal"
                                                    key={option.title}
                                                  >
                                                    <Checkbox
                                                      id={`${item.productId}-${option.title}`}
                                                      checked={isSelected}
                                                      onCheckedChange={() =>
                                                        handleAddOnToggle(
                                                          item,
                                                          option,
                                                        )
                                                      }
                                                    />
                                                    <FieldLabel
                                                      htmlFor={`${item.productId}-${option.title}`}
                                                      className="font-normal text-sm"
                                                    >
                                                      {option.title} (₦
                                                      {option.price.toLocaleString()}
                                                      )
                                                    </FieldLabel>
                                                  </Field>
                                                );
                                              },
                                            );
                                          })()}
                                        </FieldGroup>
                                      </FieldSet>
                                    </PopoverContent>
                                  </Popover>
                                </td>
                                <td className="py-2 px-3 lg:px-4 font-medium">
                                  ₦
                                  {(
                                    (item.price + addOnsTotal) *
                                    item.quantity
                                  ).toLocaleString()}
                                </td>
                                <td className="py-2 px-3 lg:px-4 text-right">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      removeFromLoans(item.productId)
                                    }
                                    className="text-[#C09706] hover:text-[#C09706]/90 text-[clamp(12px,1.4vw,14px)] hover:bg-transparent inline-flex items-center gap-1"
                                  >
                                    <DeleteIcon className="w-5 h-5" />
                                    <p className="hidden ml:block">Remove</p>
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="flex flex-col gap-6 md:hidden">
                      {cartItemsWithDetails.map((item) => {
                        const addOnsTotal =
                          item.addOns?.reduce(
                            (sum, addOn) => sum + addOn.price,
                            0,
                          ) ?? 0;

                        return (
                          <div
                            key={item.productId}
                            className="grid grid-cols-[auto_1fr] gap-3 font-poppins rounded-[12px] shadow px-3 py-4"
                          >
                            <Link
                              href={`/shop/loan-${item.productId}`}
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
                                <div className="border-r-2 border-l-2 px-2 flex items-center gap-1 flex-wrap">
                                  Add-on:{" "}
                                  <span className="text-[#1E1E1E]">
                                    <Popover>
                                      <PopoverTrigger asChild>
                                        <div className="border border-[#0000001A] rounded-[5px] flex items-center justify-between gap-2 px-2 py-1 cursor-pointer">
                                          <p>
                                            {item.addOns &&
                                            item.addOns.length > 0
                                              ? `₦${addOnsTotal.toLocaleString()}`
                                              : "-"}
                                          </p>
                                          <DownIcon className="w-[10px] h-[10px]" />
                                        </div>
                                      </PopoverTrigger>
                                      <PopoverContent className="mr-7 sm:mr-10">
                                        <FieldSet>
                                          <FieldLegend
                                            variant="label"
                                            className="text-sm"
                                          >
                                            Preparation Options
                                          </FieldLegend>
                                          <FieldGroup className="gap-3">
                                            {(() => {
                                              const fullProduct =
                                                getProductById(item.productId);
                                              const allAddOns =
                                                fullProduct?.addOns || [];

                                              return allAddOns.map(
                                                (option: IAddOns) => {
                                                  const isSelected =
                                                    item.addOns?.some(
                                                      (a) =>
                                                        a.title ===
                                                        option.title,
                                                    ) || false;

                                                  return (
                                                    <Field
                                                      orientation="horizontal"
                                                      key={option.title}
                                                    >
                                                      <Checkbox
                                                        id={`${item.productId}-${option.title}`}
                                                        checked={isSelected}
                                                        onCheckedChange={() =>
                                                          handleAddOnToggle(
                                                            item,
                                                            option,
                                                          )
                                                        }
                                                      />
                                                      <FieldLabel
                                                        htmlFor={`${item.productId}-${option.title}`}
                                                        className="font-normal text-xs"
                                                      >
                                                        {option.title} (₦
                                                        {option.price.toLocaleString()}
                                                        )
                                                      </FieldLabel>
                                                    </Field>
                                                  );
                                                },
                                              );
                                            })()}
                                          </FieldGroup>
                                        </FieldSet>
                                      </PopoverContent>
                                    </Popover>
                                  </span>
                                </div>
                                <p className="pl-2">
                                  Sub-total{" "}
                                  <span className="text-[#1E1E1E]">
                                    ₦
                                    {(
                                      (item.price + addOnsTotal) *
                                      item.quantity
                                    ).toLocaleString()}
                                  </span>
                                </p>
                              </div>
                              <div className="flex items-end gap-4">
                                <CartButton item={item} className="w-[120px]" />
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  onClick={() =>
                                    removeFromLoans(item.productId)
                                  }
                                  className="text-[#C09706] hover:text-[#C09706]/90 text-[10px] inline-flex items-center gap-1 h-[35px]"
                                >
                                  <DeleteIcon className="w-5 h-5" />
                                  <p>Remove</p>
                                </Button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Cart Summary */}
                  <div className="order-1 md:order-2 overflow-hidden border border-[#00000033] rounded-2xl md:w-1/2 md:ml-auto md:mt-14 flex flex-col gap-6 pb-4">
                    <table className="w-full border-collapse font-poppins">
                      <thead className="sticky top-0 z-10 bg-[#F5F5F5] text-[clamp(14px,1.6vw,24px)] text-black font-poppins">
                        <tr>
                          <th className="py-4 px-6 font-bold text-start">
                            Savings Summary
                          </th>
                          <th className="py-4 px-6 font-bold text-end">
                            {cartItemsWithDetails.length} Items
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
                            {(totalPrice + deliveryFee).toLocaleString(
                              "en-NG",
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              },
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="flex flex-col gap-3 w-[80%] mx-auto">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => setIsShowProceedWithSavings(true)}
                        className="py-5"
                        disabled={hasActiveLoan}
                      >
                        Proceed with Credit
                      </Button>
                      {hasActiveLoan && (
                        <p className="text-center text-[#E63946] text-[clamp(11px,1.2vw,13px)] font-poppins">
                          You have an active loan. Please complete it before
                          taking a new one.
                        </p>
                      )}
                      <Button
                        variant="secondary"
                        size="sm"
                        href="/shop/shop-loans"
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

      {/* Proceed with Savings Modal */}
      <DrawerDialog
        open={isShowProceedWithSavings}
        close={() => setIsShowProceedWithSavings(false)}
        size="md"
        title="Confirm Your Food Loan"
        subTitle="You’re about to buy the selected items on credit. Please review your loan summary and repayment details before proceeding."
        contentCSS="px-0 overflow-y-auto hide-scrollbar"
        max_height
        headerClassName="border-b-[1.5px] border-[#0000001A] pb-3 px-5"
      >
        <div className="px-5">
          <LoanPlanForm
            loanPlan={cartItemsWithDetails}
            totalAmount={totalPrice + deliveryFee}
            interestAmount={interestAmount}
            onSubmit={handleProceedWithLoan}
          />
        </div>
      </DrawerDialog>

      {/* Success Modal */}
      <DrawerDialog
        open={submitStatus === "success"}
        close={() => setSubmitStatus("idle")}
        size="sm"
        title="Food Loan Approved"
        titleCSS="sr-only text-xs"
        contentCSS=" h-fit"
        headerClassName="border-none py-0"
        scrollAreaClassName="h-fit pb-5"
      >
        <PopUpUtility
          className="w-fit py-5 border-none"
          header="Food Loan Approved"
          desc={`Your purchase has been completed and repayment plan starts on October 12, 2025`}
          icon={
            <Image
              width={100}
              height={100}
              src="/assets/avatars/successCheckMark.svg"
              alt="success check mark"
              className="w-[100px] md:w-[120px] ml:w-[140px] lg:w-[150px] h-auto object-cover"
            />
          }
          buttonTitle="Continue to Checkout"
          hrClassName="hidden"
          handleFirstBtnAtn={handleContinueToCheckout}
          disabledFirstBtn={checkoutLoading}
          loadingFirstBtnAtn={checkoutLoading}
        />
      </DrawerDialog>
    </>
  );
}
