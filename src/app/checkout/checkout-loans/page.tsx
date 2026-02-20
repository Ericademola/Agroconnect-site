"use client";

import { Button } from "@/components/ui/button";
import { CartItem } from "@/types";
import { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle/PageTitle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import Image from "next/image";
import { DrawerDialog } from "@/components/DrawerDialog/DrawerDialog";
import EditCustormerInfoForm from "@/components/Forms/EditCustormerInfoForm";
import { getUserData, updateUserData } from "@/hooks/getUserData";
import { clearLocalStorage, getProductById } from "@/hooks/getProducts";
import { Order, saveOrder } from "@/hooks/getOrders";
import { formatDeliveryDateRange } from "@/utils/formatDateRange";
import {
  clearLoanCart,
  createLoanPlan,
  getLoanedPlans,
  ILoanCartItem,
} from "@/hooks/getLoans";
import PopUpUtility from "@/components/PopUtility/PopUtility";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { getUserData as getUser } from "@/hooks/getUserData";
import { DeliveryAddress } from "../page";

// ---- Types ----
interface LoanPlanConfig {
  duration: string;
  paymentInterval: string;
  totalAmount: number;
  interestAmount: number;
  numberOfPayments: number;
  paymentPerInstallment: number;
  startDate: string;
  endDate: string;
}

const LOAN_PLAN_CONFIG_KEY = "LoanPlanConfig";

// ---- Helper ----
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

export default function LoanCheckoutPage() {
  const [loanItems, setLoanItems] = useState<CartItem[]>([]);
  const [loanConfig, setLoanConfig] = useState<LoanPlanConfig | null>(null);
  const [onEditForm, setOnEditForm] = useState(false);
  const [onChangeAddress, setOnChangeAddress] = useState(false);
  const [userInfo, setUserInfo] = useState(getUserData());
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [onConfirmFoodLoan, setOnConfirmFoodLoan] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [activeLoanLoading, setActiveLoanLoading] = useState(false);
  const [myOrderLoading, setMyOrderLoading] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [hasActiveLoan, setHasActiveLoan] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Load loan cart items
    const storedCart = localStorage.getItem("LoanCart");
    if (storedCart) {
      const rawItems: ILoanCartItem[] = JSON.parse(storedCart);
      setLoanItems(convertToCartItems(rawItems));
    }

    // Load loan plan config saved from LoanPlanForm
    const storedConfig = localStorage.getItem(LOAN_PLAN_CONFIG_KEY);
    if (storedConfig) {
      setLoanConfig(JSON.parse(storedConfig));
    }
  }, []);

  useEffect(() => {
    setUserInfo(getUser());
  }, []);

  useEffect(() => {
    const activeLoanPlans = getLoanedPlans();
    const hasActive = activeLoanPlans.some(
      (plan) => plan.loanStatus === "ACTIVE",
    );
    setHasActiveLoan(hasActive);
  }, []);

  const deliveryFee = 5000;

  const totalItemsPrice = loanItems.reduce((sum, item) => {
    const addOnsTotal =
      item.addOns?.reduce((aSum, addOn) => aSum + addOn.price, 0) ?? 0;
    return sum + (item.price + addOnsTotal) * item.quantity;
  }, 0);

  const totalLoanPrice =
    totalItemsPrice + deliveryFee + (loanConfig?.interestAmount ?? 0);

  const handleUpdateUserInfo = (data: {
    fullName: string;
    email: string;
    phoneNumber: string;
  }) => {
    const updatedData = updateUserData({
      userFullName: data.fullName,
      email: data.email,
      phoneNumber: data.phoneNumber,
    });
    setUserInfo(updatedData);
    setOnEditForm(false);
  };

  const handleSelectAddress = (addressIndex: number) => {
    setSelectedAddressIndex(addressIndex);
    setOnChangeAddress(false);
  };

  const handleConfirmFoodLoan = async () => {
    if (!loanConfig) return;

    setIsConfirming(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const random = Math.floor(Math.random() * 100000);
      const loanPlanId = `LOAN${random}`;
      const orderId = `Agro${random}`;
      const loanStatus = "ACTIVE";

      // 1. Create loan plan
      createLoanPlan(
        loanPlanId,
        loanItems,
        loanConfig,
        totalLoanPrice,
        loanStatus,
        deliveryFee,
      );

      updateUserData({
        isActiveLoan: true,
      });

      // 2. Create matching order
      const newOrder: Order = {
        orderId,
        items: loanItems,
        orderStatus: "CONFIRMED",
        totalAmount: totalLoanPrice,
        deliveryFee,
        orderDate: new Date().toISOString(),
        expectedDeliveryDate: formatDeliveryDateRange(3, 2),
        paymentMethod: "Food on Credit (Loan)",
        deliveryStatus: "CONFIRMED",
        deliveryType: "Home delivery",
        deliveryAddress: {
          fullName: userInfo.deliveryAddresses[selectedAddressIndex].fullName,
          phoneNumber:
            userInfo.deliveryAddresses[selectedAddressIndex].phoneNumber,
          fullAddress:
            userInfo.deliveryAddresses[selectedAddressIndex].fullAddress,
        },
      };

      saveOrder(newOrder);

      // 3. Clean up
      clearLoanCart();
      localStorage.removeItem(LOAN_PLAN_CONFIG_KEY);
      clearLocalStorage();

      setOnConfirmFoodLoan("success");
    } catch (error) {
      console.error("Failed to confirm food loan", error);
      setOnConfirmFoodLoan("error");
    } finally {
      setIsConfirming(false);
    }
  };

  const handleGoToActiveLoan = () => {
    setTimeout(() => {
      setOnConfirmFoodLoan("idle");
      setActiveLoanLoading(true);
      router.push("/loan");
    }, 800);
  };

  const handleGoToMyOrders = () => {
    setTimeout(() => {
      setOnConfirmFoodLoan("idle");
      setMyOrderLoading(true);
      router.push("/order");
    }, 800);
  };

  return (
    <div>
      <PageTitle
        title="Checkout (Food on Credit)"
        description="Review your items before checkout"
      />
      <div className="mx-4 sm:mx-5 md:mx-6 ml:mx-8 lg:mx-12 pt-3 md:pt-6 pb-32 flex flex-col gap-4">
        <Breadcrumb>
          <BreadcrumbList className="text-[#787878CC]">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link href="/cart/cart-loans">Cart</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-[#2B2B2B]">
                Checkout
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid md:grid-cols-[1fr_1fr] ml:grid-cols-[2.8fr_2.2fr] lg:grid-cols-[3fr_2fr] gap-5 lg:gap-8">
          {/* ---- Left Column ---- */}
          <div className="rounded-2xl border-[0.5px] border-[#0000000D] shadow-xs shadow-[#0000000D] px-3 md:px-4 lg:px-6 pt-4 md:pt-5 lg:pt-8 pb-16 md:pb-32 flex flex-col gap-6 md:gap-10">
            {/* Customer + Address */}
            <div className="flex flex-col gap-[14px]">
              <h3 className="font-geologica font-light text-[#000000CC] text-[clamp(14px,1.4vw,16px)]">
                Delivery Details
              </h3>
              <div className="bg-[#F5F5F5] border border-[#0000001A] shadow shadow-[#0000000D] px-3 py-2 md:px-5 md:py-4 rounded-2xl flex items-center justify-between gap-2">
                <div className="flex flex-col gap-2 md:gap-4 font-poppins">
                  <h4 className="font-geologica text-[#000000CC] text-[clamp(10px,1.1vw,13px)]">
                    Customer Information
                  </h4>
                  <p className="text-black text-[clamp(14px,1.4vw,16px)]">
                    {userInfo.userFullName}
                  </p>
                  <p className="text-[#000000B2] text-[clamp(12px,1.2vw,14.5px)]">
                    {userInfo.email}
                  </p>
                  <p className="text-[#000000B2] text-[clamp(12px,1.2vw,14.5px)]">
                    {userInfo.phoneNumber}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setOnEditForm(true)}
                  className="text-[#C09706] hover:text-[#C09706]/90 hover:bg-transparent w-fit h-fit p-0 ml-auto"
                >
                  Edit
                </Button>
              </div>
              <div className="bg-[#F5F5F5] border border-[#0000001A] shadow shadow-[#0000000D] px-3 py-2 md:px-5 md:py-4 rounded-2xl flex items-center justify-between gap-2">
                <div className="flex flex-col gap-2 md:gap-4 font-poppins">
                  <h4 className="font-geologica text-[#000000CC] text-[clamp(10px,1.1vw,13px)]">
                    Delivery Address
                  </h4>
                  <p className="text-black text-[clamp(13.5px,1.4vw,16px)]">
                    {
                      userInfo.deliveryAddresses[selectedAddressIndex]
                        .fullAddress
                    }
                  </p>
                </div>
                <Button
                  variant="ghost"
                  className="text-[#C09706] hover:text-[#C09706]/90 hover:bg-transparent w-fit h-fit p-0 ml-auto"
                  onClick={() => setOnChangeAddress(true)}
                >
                  Change
                </Button>
              </div>
            </div>

            {/* Loan notice */}
            <div className="flex flex-col gap-[14px] font-poppins rounded-2xl border border-[#0000001A] bg-[#F5F5F5] px-5 py-4 shadow-xs">
              <Image
                src={"/assets/avatars/notificationBell.svg"}
                alt={"notificationBell"}
                width={50}
                height={50}
                className="object-contain w-[55px] h-[50px]"
              />
              <p className="text-[#000000CC] text-[clamp(12px,1.6vw,18px)]">
                This order is being processed as a Food Loan. No payment is
                required now. Delivery will begin once you finalize this
                request.
              </p>
            </div>
          </div>

          {/* ---- Right Column ---- */}
          <div className="rounded-2xl border-[0.5px] border-[#0000000D] shadow-xs shadow-[#0000000D] px-3 md:px-4 lg:px-6 pt-4 md:pt-5 lg:pt-8 pb-16 md:pb-32 flex flex-col gap-6 md:gap-10">
            {/* Order items */}
            <div className="flex flex-col gap-[14px]">
              <h3 className="font-geologica font-light text-[#000000CC] text-[clamp(14px,1.4vw,16px)]">
                Order Summary
              </h3>
              <div className="flex flex-col gap-4">
                {loanItems.map((item) => (
                  <div
                    key={item.productId}
                    className="grid grid-cols-[auto_1fr_auto] gap-3 font-poppins rounded-[12px] shadow shadow-[#0000000D] px-3 py-4 bg-[#F5F5F5] border border-[#0000001A]"
                  >
                    <div className="bg-white rounded-[10px] p-1 inline-block">
                      <Image
                        src={item.productImage}
                        alt={item.productName}
                        width={50}
                        height={50}
                        className="object-contain w-[50px] h-[70px]"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-[clamp(14px,1.4vw,16px)] text-black font-medium">
                        {item.productName} ({item.unit})
                      </h3>
                      <p className="font-geologica text-[#000000CC] text-xs">
                        {item.quantity > 1
                          ? `${item.quantity} bags`
                          : `${item.quantity} bag`}
                      </p>
                      <div className="flex items-center gap-3 mt-auto">
                        <p className="text-[#1E1E1E] text-[clamp(14px,1.4vw,16px)]">
                          ₦{item.price.toLocaleString()}
                        </p>
                        {item.addOns?.length > 0 && (
                          <p className="text-[#000000CC] text-[clamp(12px,1.2vw,14px)]">
                            + ₦
                            {item.addOns
                              .reduce((sum, addOn) => sum + addOn.price, 0)
                              .toLocaleString()}{" "}
                            add on
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="text-black text-[clamp(14px,1.4vw,16px)] my-auto">
                      ₦
                      {(
                        item.price * item.quantity +
                        (item.addOns?.reduce(
                          (sum, addOn) => sum + addOn.price,
                          0,
                        ) ?? 0)
                      ).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Price breakdown */}
            <div className="rounded-[12px] shadow shadow-[#0000000D] px-3 py-4 bg-[#F5F5F5] border border-[#0000001A]">
              <table className="w-full border-collapse font-geologica">
                <tbody className="text-[#000000CC] text-[clamp(14px,1.5vw,18px)]">
                  <tr>
                    <td className="pt-3 text-[#000000B2] text-[clamp(12px,1.4vw,16px)] font-light">
                      Subtotal:
                    </td>
                    <td className="pt-3 text-end">
                      ₦{" "}
                      {totalItemsPrice.toLocaleString("en-NG", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td className="pt-3 text-[#000000B2] text-[clamp(12px,1.4vw,16px)] font-light">
                      Interest:
                    </td>
                    <td className="pt-3 text-end">
                      ₦{" "}
                      {(loanConfig?.interestAmount ?? 0).toLocaleString(
                        "en-NG",
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        },
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 text-[#000000B2] text-[clamp(12px,1.4vw,16px)] font-light">
                      Delivery Fee
                    </td>
                    <td className="py-4 text-end">
                      ₦ {deliveryFee.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="font-semibold border-t border-[#0000001A]">
                    <td className="py-3">Total:</td>
                    <td className="py-3 text-end">
                      ₦{" "}
                      {totalLoanPrice.toLocaleString("en-NG", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Confirm button */}
            <div>
              <Button
                variant="default"
                size="lg"
                className="w-full"
                onClick={handleConfirmFoodLoan}
                disabled={isConfirming || !loanConfig}
              >
                {isConfirming ? (
                  <Spinner className="h-5 w-5" />
                ) : (
                  "Confirm Food Loan & Deliver"
                )}
              </Button>
              {hasActiveLoan && (
                <p className="text-center text-[#E63946] text-[clamp(11px,1.2vw,13px)] font-geologica">
                  You have an active loan. Please complete it before taking a
                  new one.
                </p>
              )}
              <div className="flex items-center flex-wrap gap-1 font-geologica text-[#000000B2] text-[clamp(12px,1.2vw,14px)] mt-2">
                <p>By confirming this order, you agree to our</p>
                <Link href="/" className="text-[#C09706]">
                  Food Loan Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Customer Info */}
      <DrawerDialog
        open={onEditForm}
        close={() => setOnEditForm(false)}
        size="md"
        title="Edit Customer Information"
        contentCSS="pt-[20px] px-[30px] h-[80vh]"
      >
        <EditCustormerInfoForm
          initialData={{
            name: userInfo.userFullName,
            email: userInfo.email,
            phonenumber: userInfo.phoneNumber,
          }}
          onSubmit={handleUpdateUserInfo}
        />
      </DrawerDialog>

      {/* Change Address */}
      <DrawerDialog
        open={onChangeAddress}
        close={() => setOnChangeAddress(false)}
        size="md"
        title="Select Address"
        contentCSS="pt-[20px] px-[30px]"
        max_height
      >
        <DeliveryAddress
          onCancel={() => setOnChangeAddress(false)}
          onSelectAddress={handleSelectAddress}
          currentAddressIndex={selectedAddressIndex}
        />
      </DrawerDialog>

      {/* Success Modal */}
      <DrawerDialog
        open={onConfirmFoodLoan === "success"}
        close={() => setOnConfirmFoodLoan("idle")}
        size="sm"
        title="Loan Order Confirmed"
        titleCSS="sr-only text-xs"
        contentCSS=""
        headerClassName="border-none py-0"
        scrollAreaClassName="h-fit pb-2"
      >
        <PopUpUtility
          className="w-fit border-none"
          header="Loan Order Confirmed"
          desc="Your food loan request has been received and is currently being processed. Delivery will begin once it has been approved. 
You can track the status in your Order section."
          icon={
            <Image
              width={100}
              height={100}
              src="/assets/avatars/successCheckMark.svg"
              alt="success check mark"
              className="w-[100px] md:w-[120px] ml:w-[140px] lg:w-[150px] h-auto object-cover"
            />
          }
          buttonTitle="Go to Active Loan"
          secondButtonTitle="Go to My Orders"
          hrClassName="hidden"
          handleFirstBtnAtn={handleGoToActiveLoan}
          handleSecondBtnAtn={handleGoToMyOrders}
          disabledFirstBtn={activeLoanLoading}
          loadingFirstBtnAtn={activeLoanLoading}
          disabledSecondBtn={myOrderLoading}
          loadingSecondBtnAtn={myOrderLoading}
        />
      </DrawerDialog>
    </div>
  );
}
