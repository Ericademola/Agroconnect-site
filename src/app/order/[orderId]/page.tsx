// app/orders/[orderId]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getOrderById, Order } from "@/hooks/getOrders";
import PageTitle from "@/components/PageTitle/PageTitle";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import Sidebar from "@/components/Sidebar/Sidebar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { capitalizeFirstLetter } from "@/utils/formatText";
import { PaymentMethod } from "@/app/checkout/page";

export default function OrderDetails() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (params.orderId) {
      const foundOrder = getOrderById(params.orderId as string);
      setOrder(foundOrder || null);
    }
  }, [params.orderId]);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 font-geologica">
        <p className="text-[#000000B2] text-lg">Order not found</p>
        <Button onClick={() => router.push("/order")} size="lg">
          Back to Orders
        </Button>
      </div>
    );
  }

  const getStatusColor = (status: Order["orderStatus"]) => {
    const colors = {
      CONFIRMED: "text-[#4285F4]",
      DISPATCHED: "text-[#FFBA00]",
      DELIVERED: "text-[#00AC47]",
      CANCELLED: "text-[#E63946]",
    };
    return colors[status];
  };

  const selectedPaymentMethod = PaymentMethod.find(
    (method) => method.value === order.paymentMethod,
  );

  const totalItemsPrice = order.items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const totalAddOns = order.items.reduce((total, item) => {
    const addOnsTotal =
      item.addOns?.reduce((aSum, addOn) => aSum + addOn.price, 0) ?? 0;

    return total + addOnsTotal;
  }, 0);

  const deliveryFee = 5000;

  const totalAmount = totalItemsPrice + totalAddOns + deliveryFee;

  const formatOrderDate = new Date(order.orderDate).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "2-digit",
      year: "numeric",
    },
  );

  return (
    <>
      <PageTitle
        title="My Orders"
        breadcrumb={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/order">My Orders</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Order Details</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
      />

      <div className="grid md:grid-cols-[auto_1fr] items-start md:gap-5 mx-4 sm:mx-5 md:mx-6 ml:mx-8 lg:mx-12 mt-6 md:mt-8">
        <div className="all-sides-shadow-xl rounded-[15px] py-8 hidden md:block">
          <Sidebar />
        </div>
        <div className="flex flex-col gap-5 md:gap-6 lg:gap-8 font-geologica text-[#00000099] all-sides-shadow-xl rounded-[15px] md:px-4 lg:px-6 md:pb-10 mb-16">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-[clamp(16px,1.8vw,22px)] font-medium leading-tight">
                Order Details
              </h1>
              <p className="text-[clamp(12px,1.4vw,15px)]">
                Order ID: {order.orderId}
              </p>
            </div>
            {order.orderStatus !== "DELIVERED" && (
              <div>
                <Button variant="secondary" size="sm" className="h-10 w-fit">
                  <Link href={`/order/${order.orderId}/track-order`}>
                    Track Order
                  </Link>
                </Button>
              </div>
            )}
          </div>
          <div className="grid ml:grid-cols-[1.2fr_1.1fr] xl:grid-cols-2 gap-5">
            <div className="rounded-[15px] border-[0.5px] border-[#0000001A] pt-4 pb-6 flex flex-col gap-4 divide-y divide-[#0000001A]">
              <span className="px-5 pb-4">
                <h2 className="font-medium text-[clamp(15px,1.6vw,20px)]">
                  Order Items
                </h2>
              </span>
              <div className="h-[400px] overflow-y-auto hide-scrollbar">
                <div className="flex flex-col gap-6 divide-y divide-[#0000001A] font-poppins text-black">
                  {order.items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex flex-col ml:items-center gap-5 pb-6 px-3 md:px-5"
                    >
                      <div className="grid grid-cols-[auto_1fr] gap-3">
                        <div className="border border-[#0000001A] rounded-[15px] p-2 flex items-center justify-center">
                          <Image
                            src={item.productImage}
                            alt={item.productName}
                            width={50}
                            height={50}
                            className="object-contain w-[85px] h-[80px] lg:w-[100px] lg:h-[80px]"
                          />
                        </div>
                        <div className="flex flex-col gap-3 md:gap-4 ">
                          <div>
                            <h3 className="text-[clamp(14px,1.5vw,18px)]">
                              {item.productName} ({item.unit})
                            </h3>
                            <p className="font-light mt-1 md:mt-0 text-[clamp(9px,1.3vw,14px)]">
                              By: {item.famersDetails.farmerName}
                            </p>
                          </div>
                          <div className="flex items-center sm:gap-6 ml:gap-0 text-[clamp(12px,1.2vw,14px)]">
                            <p>Price: ₦ {item.price.toLocaleString()}</p>
                            <p className="font-light ml-auto sm:ml-0 ml:ml-auto">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                          <div className="border border-[#03601A] bg-[#8FE6A24D] flex items-center justify-center p-2 rounded-[5px] w-fit text-[clamp(10px,1.2vw,14px)]">
                            <p>
                              Add-on:{" "}
                              {item.addOns
                                ?.map((addon) => addon.title)
                                .join(", ")}{" "}
                              (+₦
                              {item.addOns?.reduce(
                                (total, addon) => total + addon.price,
                                0,
                              )}
                              )
                            </p>
                          </div>
                        </div>
                      </div>
                      {order.orderStatus === "DELIVERED" && (
                        <div className="flex flex-col md:flex-row items-center gap-4 justify-between w-full">
                          <Button
                            variant="secondary"
                            size="lg"
                            className="text-[clamp(13px,1.4vw,16px)] w-full px-3"
                          >
                            Leave a Review
                          </Button>
                          <Button
                            variant="default"
                            size="lg"
                            className="text-[clamp(13px,1.4vw,16px)] w-full px-3"
                          >
                            Buy Again
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="rounded-[15px] border-[0.5px] border-[#0000001A] py-4 flex flex-col gap-4 divide-y divide-[#0000001A]">
              <span className="px-5 pb-4">
                <h2 className="font-medium text-[clamp(15px,1.6vw,20px)]">
                  Payment Summary
                </h2>
              </span>
              <div className="flex flex-col gap-6 px-5">
                <table className="w-full border-collapse font-geologica">
                  <thead className="sticky top-0 z-10 text-[clamp(16px,1.7vw,18px)] text-nowrap">
                    <tr className="">
                      <th className="py-3 font-medium text-start ">
                        Description
                      </th>
                      <th className="py-3 font-medium text-end">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="text-[clamp(12px,1.4vw,16px)]">
                    <tr>
                      <td>Subtotal</td>
                      <td className="text-end">
                        ₦{" "}
                        {totalItemsPrice.toLocaleString("en-NG", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                    <tr>
                      <td className="pt-3">Add-ons</td>
                      <td className="pt-3 text-end">₦{totalAddOns}</td>
                    </tr>
                    <tr>
                      <td className="py-4 text-[clamp(12px,1.4vw,16px)]">
                        Delivery Fee
                      </td>
                      <td className="py-4 text-end">
                        ₦ {""}
                        {deliveryFee.toLocaleString()}
                      </td>
                    </tr>
                    <tr className="font-medium border-t md:border-b border-[#0000001A] text-[clamp(14px,1.4vw,16px)]">
                      <td className="py-3">Total:</td>
                      <td className="py-3 text-end">
                        ₦{" "}
                        {totalAmount.toLocaleString("en-NG", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="rounded-[15px] border-[0.5px] border-[#0000001A] py-4 flex flex-col gap-4 divide-y divide-[#0000001A] text-black">
            <span className="px-5 pb-4">
              <h2 className="font-medium text-[clamp(15px,1.6vw,20px)] text-[#00000099]">
                Order Summary
              </h2>
            </span>
            <div className="px-3 md:px-5 grid grid-cols-2 md:grid-cols-3 items-start justify-between gap-4 md:gap-6 gap-x-5 font-poppins">
              <div className="flex flex-col gap-1">
                <h4 className="text-[clamp(8px,1.3vw,14px)] font-light">
                  Order Date
                </h4>
                <p className="text-[clamp(12px,1.5vw,16px)]">
                  {formatOrderDate}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-[clamp(8px,1.3vw,14px)] font-light">
                  Payment Method
                </h4>
                <p className="text-[clamp(12px,1.5vw,16px)]">
                  {selectedPaymentMethod?.methodName}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-[clamp(8px,1.3vw,14px)] font-light">
                  Total Amount
                </h4>
                <p className="text-[clamp(12px,1.5vw,16px)]">
                  ₦{" "}
                  {totalAmount.toLocaleString("en-NG", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-[clamp(8px,1.3vw,14px)] font-light">
                  Expected Delivery
                </h4>
                <p className="text-[clamp(12px,1.5vw,16px)]">
                  {order.expectedDeliveryDate}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-[clamp(8px,1.3vw,14px)] font-light">
                  Status
                </h4>
                <p
                  className={`text-[clamp(12px,1.5vw,16px)] ${getStatusColor(order.orderStatus)}`}
                >
                  {capitalizeFirstLetter(order.orderStatus)}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-[clamp(8px,1.3vw,14px)] font-light">
                  Items
                </h4>
                <p className="text-[clamp(12px,1.5vw,16px)]">
                  {order.items.length} Products
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-[15px] border-[0.5px] border-[#0000001A] py-4 flex flex-col gap-4 divide-y divide-[#0000001A] text-black">
            <span className="px-5 pb-4">
              <h2 className="font-medium text-[clamp(15px,1.6vw,20px)] text-[#00000099]">
                Delivery Details
              </h2>
            </span>
            <div className="px-3 md:px-5 flex flex-col md:flex-row md:items-center justify-between gap-4 font-poppins">
              <div className="flex flex-col gap-1">
                <h4 className="text-[clamp(8px,1.3vw,14px)] font-light">
                  Delivery Type
                </h4>
                <p className="text-[clamp(12px,1.5vw,16px)]">
                  {order.deliveryType}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-[clamp(8px,1.3vw,14px)] font-light">
                  Expected Delivery
                </h4>
                <p className="text-[clamp(12px,1.5vw,16px)]">
                  {order.expectedDeliveryDate}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-[clamp(8px,1.3vw,14px)] font-light">
                  Delivery Address
                </h4>
                <p className="text-[clamp(12px,1.5vw,16px)]">
                  {order.deliveryAddress.fullAddress}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
