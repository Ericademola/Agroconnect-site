"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getOrderById, IOrder } from "@/hooks/getOrders";
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
import {
  ConfirmedOrderIcon,
  DeliveredOrderIcon,
  DispatchBusIcon,
  InfoIcon,
  OrderPlacedIcon,
  PackedOrderIcon,
  PersonIcon,
  PhoneIcon,
} from "@/Icons";
import OrderTrackingStepper from "@/components/OrderTrackingStepper/OrderTrackingStepper";

export default function TrackOrder() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<IOrder | null>(null);

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

  const driverInfo = {
    driverImage: "",
    driverName: "Yusuf Ahmed",
    driverPhoneNumber: "08123456789",
    vehicleNumber: "Toyota Hiace (LAG-234-KT)",
  };

  const deliverySteps = [
    {
      title: "Order Placed",
      description: "Your order has been received",
      date: "Sept 15, 2025",
      time: "10:45 AM",
      icon: <OrderPlacedIcon className="w-5 h-5 md:w-6 md:h-6" />,
      status: "ORDER PLACED" as const,
    },
    {
      title: "Confirmed",
      description: "Farmer confirmed your order",
      date: "Sept 15, 2025",
      time: "11:45 AM",
      icon: <ConfirmedOrderIcon className="w-5 h-5 md:w-6 md:h-6" />,
      status: "CONFIRMED" as const,
    },
    {
      title: "Packed",
      description: "Items carefully packed and ready",
      date: "Sept 16, 2025",
      time: "10:45 AM",
      icon: <PackedOrderIcon className="w-5 h-5 md:w-6 md:h-6" />,
      status: "PACKED" as const,
    },
    {
      title: "Dispatched",
      description: "Driver has picked up your order",
      date: "Sept 18, 2025",
      time: "10:45 AM",
      icon: <DispatchBusIcon className="w-5 h-5 md:w-6 md:h-6" fill="#fff" />,
      status: "DISPATCHED" as const,
    },
    {
      title: "Delivered",
      description: `Estimated arrival: ${order.expectedDeliveryDate}`,
      date: "Sept 20, 2025",
      time: "10:45 AM",
      icon: <DeliveredOrderIcon className="w-5 h-5 md:w-6 md:h-6" />,
      status: "DELIVERED" as const,
    },
  ];

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
                <BreadcrumbPage>Track Order</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
      />

      <div className="grid md:grid-cols-[auto_1fr] items-start md:gap-5 mx-4 sm:mx-5 md:mx-6 ml:mx-8 lg:mx-12 mt-6 md:mt-8">
        <div className="all-sides-shadow-xl rounded-2xl py-8 hidden md:block">
          <Sidebar />
        </div>
        <div className="flex flex-col gap-5 md:gap-6 lg:gap-8 font-geologica text-[#00000099] all-sides-shadow-xl rounded-2xl md:px-4 lg:px-6 md:py-5 md:pb-10 mb-16">
          <div>
            <h1 className="text-[clamp(16px,1.8vw,22px)] font-medium leading-tight">
              Track Order
            </h1>
            <p className="text-[clamp(12px,1.4vw,15px)]">
              Order ID: {order.orderId}
            </p>
          </div>
          <div>
            {/* Order Tracking Stepper */}
            <OrderTrackingStepper
              order={order}
              steps={deliverySteps}
              currentStepIndex={2}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-5 ml:gap-10 lg:gap-20 items-start">
            <div className="rounded-2xl border-[0.5px] border-[#0000001A] py-4 px-5 flex flex-col gap-4 all-sides-shadow-xl">
              <div className="flex items-center gap-2">
                <DispatchBusIcon className="w-5 h-5" />
                <h3 className="text-[clamp(16px,1.7vw,20px)] font-medium">
                  Driver Information
                </h3>
              </div>
              <div className="flex flex-col gap-5 divide-y divide-[#0000001A]">
                <div className="flex items-center gap-[10px] pb-5">
                  <div className="w-[50px] h-[50px] rounded-full bg-[#B4B4B4] flex items-center justify-center">
                    {driverInfo?.driverImage ? (
                      <Image
                        src={driverInfo.driverImage}
                        alt={driverInfo.driverName || "Driver"}
                        width={60}
                        height={60}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <PersonIcon className="w-8 h-8" fill="#fff" />
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-[clamp(16px,1.7vw,20px)] font-medium">
                      {driverInfo.driverName}
                    </h4>
                    <p className="text-[clamp(12px,1.4vw,15px)]">
                      Delivery Driver
                    </p>
                  </div>
                </div>
                <div className="flex flex-col ml:flex-row ml:items-center gap-4 justify-between">
                  <div>
                    <h4 className="text-[clamp(10px,1.3vw,14px)] font-light text-[#00000099]">
                      Phone Number
                    </h4>
                    <p className="text-[clamp(14px,1.6vw,17px)]  font-medium">
                      {driverInfo.driverPhoneNumber}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[clamp(10px,1.3vw,14px)] font-light text-[#00000099]">
                      Vehicle
                    </h4>
                    <p className="text-[clamp(14px,1.6vw,17px)] font-medium">
                      {driverInfo.vehicleNumber}
                    </p>
                  </div>
                </div>
              </div>
              <Button
                variant="default"
                size="lg"
                className="flex items-center gap-1 mt-2"
              >
                <PhoneIcon className="w-6 h-6" fill="#fff" /> Call Driver
              </Button>
            </div>
            <div className="rounded-2xl border-[0.5px] border-[#0000001A] py-4 px-5 flex flex-col gap-4 all-sides-shadow-xl">
              <div className="flex items-center gap-2">
                <InfoIcon className="w-5 h-5" />
                <h3 className="text-[clamp(16px,1.7vw,20px)] font-medium">
                  Estimated Arrival
                </h3>
              </div>
              <div className="flex flex-col gap-5 divide-y divide-[#0000001A]">
                <p className="text-[clamp(14px,1.5vw,17px)] pl-5 pb-5">
                  {order.expectedDeliveryDate}
                </p>
                <p className="text-[clamp(12px,1.4vw,15px)]">
                  Please be available to receive your order
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
