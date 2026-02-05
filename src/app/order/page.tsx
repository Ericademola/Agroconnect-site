"use client";

import Image from "next/image";
import Sidebar from "@/components/Sidebar/Sidebar";
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
import SearchInput from "@/components/SearchInput/SearchInput";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { getOrders, Order } from "@/hooks/getOrders";
import EmptyPage from "@/components/EmptyPage/EmptyPage";
import { CartIcon } from "@/Icons";
import { capitalizeFirstLetter } from "@/utils/formatText";
import { useMediaQuery } from "react-responsive";
const MyOrder = () => {
  const [searchText, setSearchText] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);

  useEffect(() => {
    const loadedOrders = getOrders();
    setOrders(loadedOrders);
    setFilteredOrders(loadedOrders);
  }, []);

  // Filter orders based on search text
  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(
        (order) =>
          order.orderId.toLowerCase().includes(searchText.toLowerCase()) ||
          order.items.some((item) =>
            item.productName.toLowerCase().includes(searchText.toLowerCase()),
          ),
      );
      setFilteredOrders(filtered);
    }
  }, [searchText, orders]);

  // Filter orders by status
  const activeOngoingOrders = filteredOrders.filter(
    (order) =>
      order.orderStatus === "CONFIRMED" || order.orderStatus === "DISPATCHED",
  );

  const deliveredOrders = filteredOrders.filter(
    (order) => order.orderStatus === "DELIVERED",
  );

  const cancelledOrders = filteredOrders.filter(
    (order) => order.orderStatus === "CANCELLED",
  );

  return (
    <>
      <PageTitle
        title="My Orders"
        breadcrumb={
          <div>
            <Breadcrumb>
              <BreadcrumbList className="text-white text-sm md:text-lg font-poppins">
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white/70">
                    My Orders
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        }
      />
      <div className="grid md:grid-cols-[auto_1fr] items-start md:gap-5 md:mx-6 ml:mx-8 lg:mx-12 mt-8">
        <div className="all-sides-shadow-xl rounded-[15px] py-8 hidden md:block">
          <Sidebar />
        </div>
        <div className="flex flex-col gap-6 font-geologica text-[#000000CC] all-sides-shadow-xl rounded-[15px] md:px-4 lg:px-6 md:py-5">
          <div className="flex items-center justify-between gap-4 w-full px-4 sm:px-5 md:px-0">
            <div className="w-full md:w-[300px] lg:w-[500px]">
              <SearchInput
                setSearchText={setSearchText}
                rightIcon={false}
                className="h-[40px] ml:h-[50px] border-[#0000001A] rounded-[5px] md:rounded-[10px]"
                placeholder="Search orders"
              />
            </div>
            <div className="ml-auto font-poppins text-[#00000080] text-[13px] sm:text-sm ml:text-base flex items-center gap-2">
              <div className="border border-[#0000001A] rounded-[10px] h-[40px] ml:h-[50px] flex items-center justify-center px-4">
                Date
              </div>
              <p>To</p>
              <div className="border border-[#0000001A] rounded-[10px] h-[40px] ml:h-[50px] flex items-center justify-center px-4">
                Date
              </div>
            </div>
          </div>
          <div className="md:border-[1.5px] border-[#0000001A] rounded-[15px]">
            <Tabs defaultValue="allOrders" className="w-full gap-0">
              <div className="">
                <TabsList className="w-full flex justify-center mx-auto px-5 md:px-4 md:gap-5 font-poppins bg-[#F5F5F5] h-[50px] md:h-[60px] rounded-[15px] md:rounded-none rounded-t-[15px]">
                  <TabsTrigger
                    value="allOrders"
                    className="data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:border-b-0 data-[state=active]:border-none data-[state=active]:rounded-[10px] text-[#000000CC] data-[state=active]:text-[#000000CC] text-[clamp(10px,1.5vw,20px)] h-[calc(100%-10px)] md:h-[calc(100%-12px)]"
                  >
                    All orders
                  </TabsTrigger>
                  <TabsTrigger
                    value="activeOngoing"
                    className="data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:border-b-0 data-[state=active]:border-none data-[state=active]:rounded-[10px] text-[#000000CC] data-[state=active]:text-[#000000CC] text-[clamp(10px,1.5vw,20px)] h-[calc(100%-10px)] md:h-[calc(100%-12px)]"
                  >
                    Active / Ongoing
                  </TabsTrigger>
                  <TabsTrigger
                    value="delivered"
                    className="data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:border-b-0 data-[state=active]:border-none data-[state=active]:rounded-[10px] text-[#000000CC] data-[state=active]:text-[#000000CC] text-[clamp(10px,1.5vw,20px)] h-[calc(100%-10px)] md:h-[calc(100%-12px)]"
                  >
                    Delivered
                  </TabsTrigger>
                  <TabsTrigger
                    value="cancelled"
                    className="data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:border-b-0 data-[state=active]:border-none data-[state=active]:rounded-[10px] text-[#000000CC] data-[state=active]:text-[#000000CC] text-[clamp(10px,1.5vw,20px)] h-[calc(100%-10px)] md:h-[calc(100%-12px)]"
                  >
                    Cancelled
                  </TabsTrigger>
                </TabsList>
              </div>
              <div className="mx-4 sm:mx-5 md:mx-0 mt-4 md:mt-0">
                <TabsContent value="allOrders">
                  <>
                    {filteredOrders.length === 0 ? (
                      <EmptyPage
                        title="No Orders Yet"
                        subtitle="Looks like you haven’t made any purchases yet. Start shopping and track your orders here."
                        image="/assets/avatars/emptyOrder.svg"
                        altText="empty order"
                        buttonText=" Start Shopping"
                        buttonIcon={
                          <CartIcon className="w-5 h-5" fill="#fff" />
                        }
                        buttonhref="/shop"
                        className="py-14"
                      />
                    ) : (
                      <>
                        <div className=" flex flex-col gap-4">
                          {filteredOrders.map((order) =>
                            order.items.map((item, itemIndex) => (
                              <OrderCard
                                key={`${order.orderId}-${item.productId}-${itemIndex}`}
                                orderId={order.orderId}
                                productName={item.productName}
                                unit={item.unit}
                                price={item.price * item.quantity}
                                farmName={item.famersDetails.farmerName}
                                productImage={item.productImage}
                                orderStatus={order.orderStatus}
                                expectedDeliveryDate={
                                  order.expectedDeliveryDate
                                }
                                detailsPage={`/order/${order.orderId}`}
                              />
                            )),
                          )}
                        </div>
                      </>
                    )}
                  </>
                </TabsContent>
                <TabsContent value="activeOngoing">
                  <>
                    {activeOngoingOrders.length === 0 ? (
                      <EmptyPage
                        title="No Orders Yet"
                        subtitle="Looks like you haven’t made any purchases yet. Start shopping and track your orders here."
                        image="/assets/avatars/emptyOrder.svg"
                        altText="empty order"
                        buttonText=" Start Shopping"
                        buttonIcon={
                          <CartIcon className="w-5 h-5" fill="#fff" />
                        }
                        buttonhref="/shop"
                        className="py-14"
                      />
                    ) : (
                      <>
                        <div className=" flex flex-col gap-4">
                          {activeOngoingOrders.map((order) =>
                            order.items.map((item, itemIndex) => (
                              <OrderCard
                                key={`${order.orderId}-${item.productId}-${itemIndex}`}
                                orderId={order.orderId}
                                productName={item.productName}
                                unit={item.unit}
                                price={item.price * item.quantity}
                                farmName={item.famersDetails.farmerName}
                                productImage={item.productImage}
                                orderStatus={order.orderStatus}
                                expectedDeliveryDate={
                                  order.expectedDeliveryDate
                                }
                                detailsPage={`/order/${order.orderId}`}
                              />
                            )),
                          )}
                        </div>
                      </>
                    )}
                  </>
                </TabsContent>
                <TabsContent value="delivered">
                  <>
                    {deliveredOrders.length === 0 ? (
                      <EmptyPage
                        title="No Orders Yet"
                        subtitle="Looks like you haven’t made any purchases yet. Start shopping and track your orders here."
                        image="/assets/avatars/emptyOrder.svg"
                        altText="empty order"
                        buttonText=" Start Shopping"
                        buttonIcon={
                          <CartIcon className="w-5 h-5" fill="#fff" />
                        }
                        buttonhref="/shop"
                        className="py-14"
                      />
                    ) : (
                      <>
                        <div className=" flex flex-col gap-4">
                          {deliveredOrders.map((order) =>
                            order.items.map((item, itemIndex) => (
                              <OrderCard
                                key={`${order.orderId}-${item.productId}-${itemIndex}`}
                                orderId={order.orderId}
                                productName={item.productName}
                                unit={item.unit}
                                price={item.price * item.quantity}
                                farmName={item.famersDetails.farmerName}
                                productImage={item.productImage}
                                orderStatus={order.orderStatus}
                                expectedDeliveryDate={
                                  order.expectedDeliveryDate
                                }
                                detailsPage={`/order/${order.orderId}`}
                              />
                            )),
                          )}
                        </div>
                      </>
                    )}
                  </>
                </TabsContent>
                <TabsContent value="cancelled">
                  <>
                    {cancelledOrders.length === 0 ? (
                      <EmptyPage
                        title="No Orders Yet"
                        subtitle="Looks like you haven’t made any purchases yet. Start shopping and track your orders here."
                        image="/assets/avatars/emptyOrder.svg"
                        altText="empty order"
                        buttonText=" Start Shopping"
                        buttonIcon={
                          <CartIcon className="w-5 h-5" fill="#fff" />
                        }
                        buttonhref="/shop"
                        className="py-14"
                      />
                    ) : (
                      <>
                        <div className=" flex flex-col gap-4">
                          {cancelledOrders.map((order) =>
                            order.items.map((item, itemIndex) => (
                              <OrderCard
                                key={`${order.orderId}-${item.productId}-${itemIndex}`}
                                orderId={order.orderId}
                                productName={item.productName}
                                unit={item.unit}
                                price={item.price * item.quantity}
                                farmName={item.famersDetails.farmerName}
                                productImage={item.productImage}
                                orderStatus={order.orderStatus}
                                expectedDeliveryDate={
                                  order.expectedDeliveryDate
                                }
                                detailsPage={`/order/${order.orderId}`}
                              />
                            )),
                          )}
                        </div>
                      </>
                    )}
                  </>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyOrder;

export interface OrderCardProps {
  orderId: string;
  productName: string;
  unit: string;
  price: number;
  farmName: string;
  productImage: string;
  orderStatus: Order["orderStatus"];
  expectedDeliveryDate: string;
  detailsPage: string;
}

export const OrderCard = ({
  orderId,
  productName,
  unit,
  price,
  farmName,
  productImage,
  orderStatus,
  expectedDeliveryDate,
  detailsPage,
}: OrderCardProps) => {
  const getStatusColor = (status: Order["orderStatus"]) => {
    const colors = {
      CONFIRMED: "text-[#4285F4]",
      DISPATCHED: "text-[#FFBA00]",
      DELIVERED: "text-[#00AC47]",
      CANCELLED: "text-[#E63946]",
    };
    return colors[status];
  };

  const isMobile = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  return (
    <>
      {isMobile ? (
        <>
          <Link
            href={detailsPage}
            className="px-4 py-3 grid grid-cols-[auto_1fr] gap-3 text-black font-poppins border border-[#0000001A] rounded-[15px]"
          >
            <div className="border border-[#0000001A] rounded-[15px] p-2 flex items-center justify-center">
              <Image
                src={productImage}
                alt={productName}
                width={50}
                height={50}
                className="object-contain w-[85px] h-[80px]"
              />
            </div>
            <div className="flex flex-col gap-5 text-[clamp(8px,1.3vw,12px)]">
              <div className="flex flex-col gap-1">
                <h3 className="text-base">
                  {productName} ({unit})
                </h3>
                <p className="font-light">Order ID: {orderId}</p>
              </div>
              <div className="flex items-center justify-between sm:justify-start sm:gap-10">
                <div>
                  <p className="">Status</p>
                  <p
                    className={`text-[clamp(12px,1.5vw,14px)] ${getStatusColor(orderStatus)}`}
                  >
                    {capitalizeFirstLetter(orderStatus)}
                  </p>
                </div>
                <div>
                  <p className="">Delivery Expected on</p>
                  <p className="text-[clamp(12px,1.5vw,14px)]">
                    {expectedDeliveryDate}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </>
      ) : (
        <div className="px-4 py-5 grid grid-cols-[2.4fr_1.2fr_1fr] gap-3 lg:gap-5 text-black font-poppins divide-x divide-[#0000001A] border-t border-b border-[#0000001A] ">
          <div className="grid grid-cols-[auto_1fr] gap-3">
            <div className="border border-[#0000001A] rounded-[15px] p-1 lg:p-2 flex items-center justify-center">
              <Image
                src={productImage}
                alt={productName}
                width={50}
                height={50}
                className="object-contain md:w-[80px] md:h-[60px] lg:w-[100px] lg:h-[80px]"
              />
            </div>
            <div className="flex flex-col gap-2 lg:gap-4 text-[clamp(8px,1.2vw,14px)]">
              <div className="flex flex-col gap-1">
                <h3 className="text-[clamp(14px,1.6vw,18px)]">
                  {productName} ({unit})
                </h3>
                <p className="font-light">By: {farmName}</p>
              </div>
              <p>Price: ₦ {price.toLocaleString()}</p>
              <p className="font-light">Order ID: {orderId}</p>
            </div>
          </div>
          <div className="text-[clamp(8px,1.2vw,14px)] flex flex-col gap-4 lg:gap-8">
            <div>
              <p className="">Status</p>
              <p
                className={`text-[clamp(12px,1.4vw,16px)] ${getStatusColor(orderStatus)}`}
              >
                {capitalizeFirstLetter(orderStatus)}
              </p>
            </div>
            <div>
              <p className="">Delivery Expected on</p>
              <p className="text-[clamp(12px,1.4vw,16px)]">
                {expectedDeliveryDate}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-5">
            <Button
              variant="secondary"
              size="sm"
              className="h-10 w-[90%] lg:w-[80%]"
            >
              <Link href={detailsPage}>View Details</Link>
            </Button>
            {orderStatus === "DELIVERED" ? (
              <Button
                variant="outline"
                size="sm"
                className="h-10 w-[90%] lg:w-[80%]"
              >
                Reorder
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="h-10 w-[90%] lg:w-[80%]"
              >
                <Link href={`/order/${orderId}/track-order`}>Track Order</Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
};
