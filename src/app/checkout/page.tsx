"use client";

import { Button } from "@/components/ui/button";
import { CreditCardIcon } from "@/Icons";
import { CartItem, IPaymentMethod } from "@/types";
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

export default function CheckoutPage() {
  const [basketItems, setBasketItems] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("debitCreditCard");
  const [onEditForm, setOnEditForm] = useState(false);
  const [onChangeAddress, setOnChangeAddress] = useState(false);
  const [userInfo, setUserInfo] = useState(getUserData());
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [onConfirmOrder, setOnConfirmOrder] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("BasketItems");
    if (stored) {
      setBasketItems(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    const data = getUserData();
    setUserInfo(data);
  }, []);

  const totalPrice = basketItems.reduce((sum, item) => {
    const addOnsTotal =
      item.addOns?.reduce((aSum, addOn) => aSum + addOn.price, 0) ?? 0;

    return sum + (item.price + addOnsTotal) * item.quantity;
  }, 0);

  const deliveryFee = 5000;

  const handleUpdateUserInfo = (data: {
    fName: string;
    email: string;
    phoneNumber: string;
  }) => {
    const updatedData = updateUserData({
      userName: data.fName,
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

  return (
    <div>
      <PageTitle
        title="Checkout"
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
          <div className="rounded-[15px] shadow shadow-[#0000000D] px-3 md:px-4 lg:px-6 pt-4 md:pt-5 lg:pt-8 pb-16 md:pb-32 flex flex-col gap-6 md:gap-10">
            <div className="flex flex-col gap-[14px]">
              <h3 className="font-geologica font-light text-[#000000CC] text-[clamp(14px,1.4vw,16px)]">
                Delivery Details
              </h3>
              <div className="bg-[#F5F5F5] border border-[#0000001A] shadow shadow-[#0000000D] px-3 py-2 md:px-5 md:py-4 rounded-[15px] flex items-center justify-between gap-2">
                <div className="flex flex-col gap-2 md:gap-4 font-poppins">
                  <h4 className="font-geologica text-[#000000CC] text-[clamp(10px,1.1vw,13px)]">
                    Customer Information
                  </h4>
                  <p className="text-black text-[clamp(14px,1.4vw,16px)]">
                    {userInfo.userName}
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
              <div className="bg-[#F5F5F5] border border-[#0000001A] shadow shadow-[#0000000D] px-3 py-2 md:px-5 md:py-4 rounded-[15px] flex items-center justify-between gap-2">
                <div className="flex flex-col gap-2 md:gap-4 font-poppins">
                  <h4 className="font-geologica text-[#000000CC] text-[clamp(10px,1.1vw,13px)]">
                    Delivery Address
                  </h4>
                  <p className="text-black text-[clamp(13.5px,1.4vw,16px)]">
                    {userInfo.addresses[selectedAddressIndex].address}
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
          <div className="rounded-[15px] shadow shadow-[#0000000D] px-3 md:px-4 lg:px-6 pt-4 md:pt-5 lg:pt-8 pb-16 md:pb-32 flex flex-col gap-6 md:gap-10">
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
                    <Link
                      href={`/shop/${item.productId}`}
                      className="bg-white rounded-[10px] p-1 inline-block"
                    >
                      <Image
                        src={item.productImage}
                        alt={item.productName}
                        width={50}
                        height={50}
                        className="object-contain w-[50px] h-[70px]"
                      />
                    </Link>
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
                          {item.addOns ? (
                            <>
                              +{" "}
                              {`₦${item.addOns.reduce((sum, addOn) => sum + addOn.price, 0).toLocaleString()}`}{" "}
                              add on
                            </>
                          ) : (
                            ""
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
                onClick={() => setOnConfirmOrder(true)}
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

      <DrawerDialog
        open={onEditForm}
        close={() => setOnEditForm(false)}
        size="md"
        title="Edit Customer Information"
        contentCSS="pt-[20px] px-[30px] h-[80vh]"
      >
        <EditCustormerInfoForm
          initialData={{
            name: userInfo.userName,
            email: userInfo.email,
            phonenumber: userInfo.phoneNumber,
          }}
          onSubmit={handleUpdateUserInfo}
        />
      </DrawerDialog>

      <DrawerDialog
        open={onChangeAddress}
        close={() => setOnChangeAddress(false)}
        size="md"
        title="Select Address"
        contentCSS="pt-[20px] px-[30px] "
        max_height
      >
        <DeliveryAddress
          onCancel={() => setOnChangeAddress(false)}
          onSelectAddress={handleSelectAddress}
          currentAddressIndex={selectedAddressIndex}
        />
      </DrawerDialog>

      <DrawerDialog
        open={onConfirmOrder}
        close={() => setOnConfirmOrder(false)}
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
          onCancel={() => setOnConfirmOrder(false)}
          handlePaymentConfirm={() => setOnConfirmOrder(false)}
        />
      </DrawerDialog>
    </div>
  );
}

const PaymentMethod: IPaymentMethod[] = [
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
  onSelectAddress: (addressIndex: number) => void;
  currentAddressIndex: number;
}

export const DeliveryAddress = ({
  onCancel,
  onSelectAddress,
  currentAddressIndex,
}: DeliveryAddressProps) => {
  const [userInfo, setUserInfo] = useState(getUserData());
  const [selectedIndex, setSelectedIndex] = useState(currentAddressIndex);

  useEffect(() => {
    const data = getUserData();
    setUserInfo(data);
  }, []);

  const handleConfirm = () => {
    onSelectAddress(selectedIndex);
  };

  return (
    <div className="flex flex-col gap-12 text-[#000000CC] font-geologica font-extralight">
      <div className="flex flex-col gap-5 md:w-[80%] lg:w-[70%]">
        {userInfo.addresses.map((address, index) => (
          <div
            key={index}
            className={cn(
              "flex flex-col gap-4 border shadow shadow-[#0000000D] bg-[#F5F5F5] py-4 rounded-[15px] cursor-pointer transition-colors",
              selectedIndex === index
                ? "border-[#C09706]"
                : "border-[#0000001A]",
            )}
            onClick={() => setSelectedIndex(index)}
          >
            <div className="flex items-center justify-between gap-2 border-b border-[#0000001A] pb-2 px-7">
              <h2 className="text-[clamp(16px,1.6vw,20px)]">
                Address {index + 1}
              </h2>
              {index === 0 && (
                <p className="bg-[#3333331A] text-[#333333] text-[clamp(12px,1.3vw,14px)] rounded-full px-3 py-1">
                  Default
                </p>
              )}
            </div>
            <p className="text-[clamp(14px,1.4vw,16px)] text-[#000000B2] px-4">
              {address.address}
            </p>
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
          onClick={handleConfirm}
          className="flex-1"
        >
          Add New Address
        </Button>
      </div>
    </div>
  );
};
