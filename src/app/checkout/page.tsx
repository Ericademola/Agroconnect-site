"use client";

import { Button } from "@/components/ui/button";
import { CartIcon, CreditCardIcon } from "@/Icons";
import { CartItem, IAddresses, IPaymentMethod, IuserData } from "@/types";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { DrawerDialog } from "@/components/DrawerDialog/DrawerDialog";
import EditCustormerInfoForm from "@/components/Forms/EditCustormerInfoForm";
import { getUserData, updateUserData } from "@/hooks/getUserData";
import PaymentCard from "@/components/PaymentCard/PaymentCard";
import { clearLocalStorage } from "@/hooks/getProducts";
import { IOrder, saveOrder } from "@/hooks/getOrders";
import { formatDeliveryDateRange } from "@/utils/formatDateRange";
import { useRouter } from "next/navigation";
import EmptyPage from "@/components/EmptyPage/EmptyPage";
import EditAddAddressForm, {
  TypeEditAddAddressFormData,
} from "@/components/Forms/EditAddAddressForm";

export default function CheckoutPage() {
  const [basketItems, setBasketItems] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("debitCreditCard");
  const [isShowEditForm, setIsShowEditForm] = useState(false);
  const [isShowChangeAddress, setIsShowChangeAddress] = useState(false);
  const [userInfo, setUserInfo] = useState<IuserData | null>(null);
  const [isShowConfirmOrder, setIsShowConfirmOrder] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<IAddresses | null>(
    null,
  );

  useEffect(() => {
    const stored = localStorage.getItem("BasketItems");
    if (stored) {
      setBasketItems(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    const data = getUserData();
    setUserInfo(data);

    const stored = sessionStorage.getItem("selectedCheckoutAddress");
    if (stored) {
      setSelectedAddress(JSON.parse(stored));
    } else {
      const defaultAddress =
        data.deliveryAddresses.find((addr) => addr.isDefault) ??
        data.deliveryAddresses[0];
      setSelectedAddress(defaultAddress ?? null);
    }
  }, []);

  const totalPrice = basketItems.reduce((sum, item) => {
    const addOnsTotal =
      item.addOns?.reduce((aSum, addOn) => aSum + addOn.price, 0) ?? 0;

    return sum + (item.price + addOnsTotal) * item.quantity;
  }, 0);

  const deliveryFee = 5000;
  const router = useRouter();

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
    setIsShowEditForm(false);
  };

  const handleSelectAddress = (address: IAddresses) => {
    setSelectedAddress(address);
    sessionStorage.setItem("selectedCheckoutAddress", JSON.stringify(address));
    setIsShowChangeAddress(false);
  };

  const handlePaymentConfirm = () => {
    const random = Math.floor(Math.random() * 100000);

    const newOrder: IOrder = {
      orderId: `Agro${random}`,
      items: basketItems,
      totalAmount: totalPrice,
      deliveryFee: deliveryFee,
      orderDate: new Date().toISOString(),
      orderStatus: "CONFIRMED",
      paymentMethod: paymentMethod,
      deliveryAddress: selectedAddress,
      expectedDeliveryDate: formatDeliveryDateRange(3, 2),
      deliveryType: "Home delivery",
      deliveryStatus: "CONFIRMED",
    };

    // Save order to localStorage
    saveOrder(newOrder);

    // Clear cart after successful order
    setTimeout(() => {
      localStorage.removeItem("BasketItems");
      clearLocalStorage();
      setIsShowConfirmOrder(false);

      router.push("/order");
    }, 2000);
  };

  return (
    <>
      {basketItems.length === 0 ? (
        <EmptyPage
          title="Your cart is empty"
          subtitle="Start shopping to add items to your cart"
          image="/assets/avatars/emptyCart.svg"
          altText="empty cart"
          buttonText=" Start Shopping"
          buttonIcon={<CartIcon className="w-5 h-5" fill="#fff" />}
          buttonhref="/shop"
        />
      ) : (
        <div>
          <PageTitle
            title="Checkout"
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
                    <Link href="/cart">Cart</Link>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-[#2B2B2B]">
                      Checkout
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="grid md:grid-cols-[1fr_1fr] ml:grid-cols-[2.8fr_2.2fr] lg:grid-cols-[3fr_2fr] gap-5 lg:gap-8">
              <div className="rounded-2xl border-[0.5px] border-[#0000000D] shadow-xs shadow-[#0000000D] px-3 md:px-4 lg:px-6 pt-4 md:pt-5 lg:pt-8 pb-16 md:pb-32 flex flex-col gap-6 md:gap-10">
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
                        {userInfo?.userFullName}
                      </p>
                      <p className="text-[#000000B2] text-[clamp(12px,1.2vw,14.5px)]">
                        {userInfo?.email}
                      </p>
                      <p className="text-[#000000B2] text-[clamp(12px,1.2vw,14.5px)]">
                        {userInfo?.phoneNumber}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      onClick={() => setIsShowEditForm(true)}
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
                        {selectedAddress?.fullAddress}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      className="text-[#C09706] hover:text-[#C09706]/90 hover:bg-transparent w-fit h-fit p-0 ml-auto"
                      onClick={() => setIsShowChangeAddress(true)}
                    >
                      Change
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col gap-[14px] font-geologica">
                  <h3 className="font-light text-[#000000CC] text-[clamp(14px,1.2vw,14px)]">
                    Select Payment Method
                  </h3>
                  <div>
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="gap-3 font-geologica"
                    >
                      {PaymentMethod.map((option) => {
                        const isSelected = paymentMethod === option.value;

                        return (
                          <Label
                            key={option.methodName}
                            htmlFor={option.value}
                            className={cn(
                              "flex items-center border rounded-[10px] px-5 py-4 cursor-pointer transition-colors ",
                              isSelected
                                ? "bg-[#F5F5F5] border-[#03601A]"
                                : "bg-none border-[#00000033] hover:bg-[#F5F5F5]",
                            )}
                          >
                            <RadioGroupItem
                              value={option.value}
                              id={option.value}
                              className="border-[#03601A] size-5"
                              circleClassName="size-3 fill-[#03601A] stroke-[#03601A]"
                            />

                            <div className="flex flex-col ml-4 gap-1">
                              <span className="text-[#000000CC] text-[clamp(14px,1.4vw,16px)]">
                                {option.methodName}
                              </span>
                              <span className="text-[#000000B2] text-[clamp(10px,0.8vw,12px)]">
                                {option.description}
                              </span>
                            </div>

                            <div className="ml-auto">
                              {typeof option.icon === "string" ? (
                                <Image
                                  src={option.icon}
                                  alt={option.methodName}
                                  width={20}
                                  height={20}
                                  className="object-contain w-full h-[30px]"
                                />
                              ) : (
                                option.icon
                              )}
                            </div>
                          </Label>
                        );
                      })}
                    </RadioGroup>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border-[0.5px] border-[#0000000D] shadow-xs shadow-[#0000000D] px-3 md:px-4 lg:px-6 pt-4 md:pt-5 lg:pt-8 pb-16 md:pb-32 flex flex-col gap-6 md:gap-10">
                <div className="flex flex-col gap-[14px]">
                  <h3 className="font-geologica font-light text-[#000000CC] text-[clamp(14px,1.4vw,16px)]">
                    Order Summary
                  </h3>
                  <div className=" flex flex-col gap-4">
                    {basketItems.map((item) => (
                      <div
                        key={item.productId}
                        className="grid grid-cols-[auto_1fr_auto] gap-3 font-poppins rounded-[12px] shadow shadow-[#0000000D] px-3 py-4 bg-[#F5F5F5] border border-[#0000001A] "
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
                              ? `${item.quantity} bags `
                              : `${item.quantity} bag `}
                          </p>
                          <div className="flex items-center gap-3 mt-auto">
                            <p className="text-[#1E1E1E] text-[clamp(14px,1.4vw,16px)]">
                              ₦{item.price.toLocaleString()}
                            </p>
                            <p className="text-[#000000CC] text-[clamp(12px,1.2vw,14px)]">
                              {item.addOns?.length > 0 && (
                                <>
                                  + ₦
                                  {item.addOns
                                    .reduce(
                                      (sum, addOn) => sum + addOn.price,
                                      0,
                                    )
                                    .toLocaleString()}{" "}
                                  add on
                                </>
                              )}
                            </p>
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
                <div className="rounded-[12px] shadow shadow-[#0000000D] px-3 py-4 bg-[#F5F5F5] border border-[#0000001A] ">
                  <table className="w-full border-collapse font-geologica">
                    <tbody className="text-[#000000CC] text-[clamp(14px,1.6vw,18px)]">
                      <tr className="">
                        <td className="pt-3 text-[#000000B2] text-[clamp(12px,1.4vw,16px)] font-light">
                          Subtotal:
                        </td>
                        <td className="pt-3 text-end">
                          ₦{" "}
                          {totalPrice.toLocaleString("en-NG", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                      </tr>
                      <tr className="">
                        <td className="py-4 text-[#000000B2] text-[clamp(12px,1.4vw,16px)] font-light">
                          Delivery Fee
                        </td>
                        <td className="py-4 text-end">
                          ₦ {""}
                          {deliveryFee.toLocaleString()}
                        </td>
                      </tr>
                      <tr className="font-semibold border-t border-[#0000001A]">
                        <td className="py-3">Total:</td>
                        <td className="py-3 text-end">
                          ₦{" "}
                          {(totalPrice + deliveryFee).toLocaleString("en-NG", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <Button
                    variant="default"
                    size="lg"
                    className="w-full"
                    onClick={() => setIsShowConfirmOrder(true)}
                  >
                    Confirm Order
                  </Button>
                  <div className="flex items-center flex-wrap gap-1 font-geologica text-[#000000B2] text-[clamp(12px,1.2vw,14px)] mt-2">
                    <p>By confirming this order, you agree to our</p>
                    <Link href="/" className="text-[#C09706]">
                      Terms & Conditions
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Edit user info form */}
          <DrawerDialog
            open={isShowEditForm}
            close={() => setIsShowEditForm(false)}
            size="md"
            title="Edit Customer Information"
            contentCSS="pt-[20px] px-[30px] h-[80vh]"
          >
            {userInfo && (
              <EditCustormerInfoForm
                initialData={userInfo}
                onSubmit={handleUpdateUserInfo}
              />
            )}
          </DrawerDialog>

          {/* Change Address modal */}
          <DrawerDialog
            open={isShowChangeAddress}
            close={() => setIsShowChangeAddress(false)}
            size="md"
            title="Select Address"
            contentCSS="pt-[20px] px-[30px] "
            max_height
          >
            <DeliveryAddress
              onCancel={() => setIsShowChangeAddress(false)}
              onSelectAddress={handleSelectAddress}
              currentAddress={selectedAddress}
            />
          </DrawerDialog>

          {/* Confrim Payment modal */}
          <DrawerDialog
            open={isShowConfirmOrder}
            close={() => setIsShowConfirmOrder(false)}
            size="md"
            title="We are waiting for your payment"
            subTitle="Please follow the instructions below and do not refresh or leave this page.
Payment confirmation may take up to 2 minutes."
            contentCSS="px-[30px] "
            headerClassName="mb-6"
          >
            <PaymentCard
              bankName="Zenith Bank"
              accountNumber="1234567890"
              accountName="Agriconnect Savings"
              amount={` ₦ ${(totalPrice + deliveryFee).toLocaleString("en-NG", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`}
              onCancel={() => setIsShowConfirmOrder(false)}
              handlePaymentConfirm={handlePaymentConfirm}
            />
          </DrawerDialog>
        </div>
      )}
    </>
  );
}

export const PaymentMethod: IPaymentMethod[] = [
  {
    methodName: "Debit/Credit Card",
    description: "Visa, Mastercard, Verve",
    icon: <CreditCardIcon className="w-5 h-5 md:w-6 md:h-6" />,
    value: "debitCreditCard",
  },
  {
    methodName: "Bank Transfer",
    description: "Pay directly from your bank",
    icon: "/assets/avatars/bankTransfer.svg",
    value: "bankTransfer",
  },
  {
    methodName: "Opay",
    description: "Fast & secure payment",
    icon: "/assets/avatars/opay.svg",
    value: "opay",
  },
  {
    methodName: "PalmPay",
    description: "Fast & secure payment",
    icon: "/assets/avatars/palmpay.svg",
    value: "palmPay",
  },
  {
    methodName: "Pay on Delivery",
    description: "Cash or POS at doorstep",
    icon: "/assets/avatars/payOnDelivery.svg",
    value: "payOnDelivery",
  },
];

interface DeliveryAddressProps {
  onCancel: () => void;
  onSelectAddress: (address: IAddresses) => void;
  currentAddress: IAddresses | null;
}

export const DeliveryAddress = ({
  onCancel,
  onSelectAddress,
  currentAddress,
}: DeliveryAddressProps) => {
  const [userInfo, setUserInfo] = useState<IuserData | null>(null);
  const [isShowAddNewAddress, setIsShowAddNewAddress] = useState(false);

  useEffect(() => {
    const data = getUserData();
    setUserInfo(data);
  }, []);

  const handleAddressClick = (address: IAddresses) => {
    onSelectAddress(address);
  };
  const handleAddNewAddress = (data: TypeEditAddAddressFormData) => {
    console.log(data);
    setIsShowAddNewAddress(false);
  };

  return (
    <>
      <div className="flex flex-col text-[#000000CC] font-geologica font-extralight">
        <div className="flex flex-col gap-5 md:w-[80%] lg:w-[70%] lg:h-[60vh] overflow-y-auto hide-scrollbar">
          {userInfo?.deliveryAddresses.map((address) => (
            <div
              key={address.id}
              className={cn(
                "flex flex-col gap-4 border shadow shadow-[#0000000D] bg-[#F5F5F5] py-4 rounded-2xl cursor-pointer transition-colors",
                currentAddress?.id === address.id
                  ? "border-[#C09706]"
                  : "border-[#0000001A]",
              )}
              onClick={() => handleAddressClick(address)}
            >
              <div className="flex items-center justify-between gap-2 border-b border-[#0000001A] pb-2 px-7">
                <h2 className="text-[clamp(16px,1.6vw,20px)]">
                  Address {address.id}
                </h2>
                {address.isDefault === true && (
                  <p className="bg-[#3333331A] text-[#333333] text-[clamp(12px,1.3vw,14px)] rounded-full px-3 py-1">
                    Default
                  </p>
                )}
              </div>
              <div className="text-[clamp(14px,1.4vw,16px)] text-[#000000B2] px-4 ">
                <p>{address.fullName}</p>
                <p>{address.phoneNumber}</p>
                <p>{address.fullAddress}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-[1fr_2fr] gap-3 mt-4">
          <Button variant="secondary" size="lg" onClick={onCancel} className="">
            Cancel
          </Button>
          <Button
            variant="default"
            size="lg"
            onClick={() => setIsShowAddNewAddress(true)}
            className="flex-1"
          >
            Add New Address
          </Button>
        </div>
      </div>

      {/* Add address form */}
      <DrawerDialog
        open={isShowAddNewAddress}
        close={() => {
          setIsShowAddNewAddress(false);
        }}
        size="md"
        title="Edit Address"
        contentCSS="pt-[20px] px-[30px]"
        max_height
      >
        <EditAddAddressForm onSubmit={handleAddNewAddress} type="delivery" />
      </DrawerDialog>
    </>
  );
};
