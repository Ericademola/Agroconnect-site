"use client";

import PageTitle from "@/components/PageTitle/PageTitle";
import PopNotification from "@/components/PopNotification/PopNotification";
import Sidebar from "@/components/Sidebar/Sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useGoBack } from "@/hooks/useGoBack";
import {
  CircleCheckIcon,
  ClockIcon,
  LeftIcon,
  TotalApplicationIcon,
} from "@/Icons";
import { capitalizeFirstLetter } from "@/utils/formatText";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ISalesRecordItem, salesRecordItems } from "../page";

const SalesHistoryItemDetails = () => {
  const params = useParams();
  const router = useRouter();
  const [salesRecord, setSalesRecord] = useState<ISalesRecordItem | null>(null);

  useEffect(() => {
    if (params.saleId) {
      const found = salesRecordItems.find(
        (item) => item.saleId === params.saleId,
      );
      setSalesRecord(found || null);
    }
  }, [params.saleId]);

  const goBack = useGoBack();

  if (!salesRecord) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 font-geologica">
        <p className="text-[#000000B2] text-lg">Sales Record not found</p>
        <Button onClick={() => router.push("/sales-history")} size="lg">
          Back to Sales History
        </Button>
      </div>
    );
  }

  return (
    <>
      <PageTitle
        title="Sales History"
        breadcrumb={
          <div>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Sales History</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        }
      />
      <div className="grid md:grid-cols-[auto_1fr] items-start md:gap-5 md:mx-6 ml:mx-8 lg:mx-12 mt-6 md:mt-8">
        <div className="all-sides-shadow-xl rounded-2xl py-8 hidden md:block">
          <Sidebar />
        </div>
        <div className="flex flex-col gap-4 md:gap-7 px-4 md:px-6 md:py-5 font-geologica text-[#000000CC] all-sides-shadow-xl">
          <div className="flex items-start md:gap-4 pb-2 border-b border-[#0000001A]">
            <Button
              variant="ghost"
              onClick={goBack}
              className="h-fit w-fit p-0 hover:bg-transparent"
            >
              <LeftIcon className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
            <div className="flex flex-col gap-1 text-center md:text-start w-full">
              <h1 className="text-[clamp(20px,2.8vw,30px)] font-medium leading-tight">
                Sale Details
              </h1>
              <p className="text-[clamp(12px,1.4vw,16px)]">
                {salesRecord.saleId}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-5 md:gap-[30px]">
            {salesRecord.saleStatus === "PAID" ? (
              <PopNotification
                iconBgClassName="hidden"
                className="border-[#104ED6] bg-[#104ED60F]"
                textContent={
                  <div className="flex flex-col gap-3 divide-y divide-[#0000001A]">
                    <div className="flex items-center gap-3 pb-3">
                      <span>
                        <CircleCheckIcon
                          className="w-5 h-5 md:w-7 md:h-7"
                          fill="#104ED6"
                        />
                      </span>
                      <h2 className="font-semibold text-[clamp(16px,1.8vw,20px)] text-[#104ED6]">
                        Payment Completed
                      </h2>
                    </div>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 font-geologica text-[#000000CC]">
                      {[
                        {
                          title: "Amount Paid",
                          value: `₦${salesRecord.totalValue.toLocaleString()}`,
                        },
                        {
                          title: "Payment Date",
                          value: `${salesRecord.paymentReceivedDate}`,
                        },
                      ].map((item, index) => (
                        <div key={index} className="flex flex-col gap-2">
                          <h4 className="text-[clamp(10px,1.2vw,13px)] font-extralight">
                            {item.title}
                          </h4>
                          <p className="text-[clamp(14px,1.7vw,18px)]">
                            {item.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                }
              />
            ) : (
              <PopNotification
                iconBgClassName="hidden"
                className="border-[#C09706] bg-[#C097060F]"
                textContent={
                  <div className="flex items-center gap-3">
                    <span>
                      <ClockIcon className="w-5 h-5 md:w-7 md:h-7" />
                    </span>
                    <div className="flex flex-col">
                      <h2 className="font-semibold mr-2 text-[clamp(16px,1.8vw,20px)] text-[#C09706]">
                        Pending
                      </h2>
                      <p className="text-[clamp(12px,1.4vw,16px)]">
                        Submitted on {salesRecord.applicationApprovedDate}
                      </p>
                    </div>
                  </div>
                }
              />
            )}

            {/* Product Information */}
            <div className="flex flex-col gap-[10px]">
              <h2 className="text-[clamp(14px,1.6vw,18px)]">
                Product Information
              </h2>
              <div className="bg-[#F5F5F5] rounded-2xl border border-[#0000001A] shadow-md shadow-[#0000000D] p-4 md:p-5 flex items-center gap-4 font-poppins text-black">
                <div className="bg-white rounded-2xl p-1 lg:p-2 flex items-center justify-center">
                  <Image
                    src={salesRecord.item.productImage}
                    alt={salesRecord.item.productName}
                    width={50}
                    height={50}
                    className="object-contain w-[80px] lg:w-[100px] h-[80px] lg:h-[100px]"
                  />
                </div>
                <div className="text-[clamp(10px,1.4vw,16px)] font-light flex flex-col gap-3">
                  <h2 className="text-[clamp(16px,1.8vw,20px)] font-medium">
                    {salesRecord.item.productName}
                  </h2>
                  <p>{salesRecord.cropVariety}</p>
                  <p>Delivery: {salesRecord.deliveryOption}</p>
                </div>
              </div>
            </div>

            {/* Sale summary */}
            <div className="flex flex-col gap-[10px]">
              <h2 className="text-[clamp(14px,1.6vw,18px)] ">Sale Summary</h2>
              <div className="bg-[#F5F5F5] rounded-2xl border border-[#0000001A] shadow-md shadow-[#0000000D] p-4 md:p-5 flex flex-col gap-2 md:gap-4 divide-y divide-[#0000001A]">
                <div className="flex flex-col gap-3 pb-2 md:pb-4">
                  {[
                    {
                      title: "Quantity",
                      value: `${salesRecord.quantityAvailable} ${capitalizeFirstLetter(salesRecord.packageMethod)}`,
                    },
                    {
                      title: "Price per Unit",
                      value: `₦${salesRecord.pricePerUnit.toLocaleString()}`,
                    },
                    {
                      title: "Buyer Ref",
                      value: salesRecord.buyerRef,
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-2 text-[clamp(14px,1.5vw,17px)]"
                    >
                      <h4 className=" font-extralight">{item.title}</h4>
                      <p className="font-medium">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[clamp(12px,1.4vw,16px)] text-[#333333]">
                    Total Amount
                  </p>
                  <h3 className="text-[clamp(16px,1.8vw,22px)] font-semibold text-[#03601A]">
                    ₦{salesRecord.totalValue.toLocaleString()}
                  </h3>
                </div>
              </div>
            </div>

            {/* salesRecord Timeline */}
            <div className="flex flex-col gap-[10px]">
              <h2 className="text-[clamp(14px,1.6vw,18px)]">
                Transaction Timeline
              </h2>
              <div className="bg-[#F5F5F5] rounded-2xl border border-[#0000001A] shadow-md shadow-[#0000000D] p-4 md:p-5 text-black">
                <div className="flex flex-col gap-5 md:gap-7">
                  {[
                    {
                      title: "Application Submitted",
                      icon: (
                        <TotalApplicationIcon
                          className="w-3 md:w-5 h-4 md:h-5"
                          stroke="#104ED6"
                        />
                      ),
                      iconBg: "#104ED633",
                      value: salesRecord.applicationSubmitDate,
                    },
                    {
                      title: "Application Approved",
                      icon: (
                        <CircleCheckIcon className="w-3 md:w-5 h-4 md:h-5" />
                      ),
                      iconBg: "#03601A33",
                      value: `${salesRecord.applicationApprovedDate}`,
                    },
                    {
                      title: "Product Delivered",
                      icon: (
                        <CircleCheckIcon
                          className="w-3 md:w-5 h-4 md:h-5"
                          fill="#104ED6"
                        />
                      ),
                      iconBg: "#104ED633",
                      value: `${salesRecord.productDeliveredDate}`,
                    },
                    ...(salesRecord.saleStatus === "PAID"
                      ? [
                          {
                            title: "Payment Received",
                            icon: (
                              <CircleCheckIcon
                                className="w-3 md:w-5 h-4 md:h-5"
                                fill="#8A38F5"
                              />
                            ),
                            iconBg: "#8A38F533",
                            value: `${salesRecord.paymentReceivedDate}`,
                          },
                        ]
                      : []),
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-[10px]">
                      <span
                        style={{ backgroundColor: item.iconBg }}
                        className={`p-2 md:p-3 rounded-[10px] md:rounded-[12px] flex items-center justify-center`}
                      >
                        {item.icon}
                      </span>
                      <div>
                        <h4 className="text-[clamp(14px,1.7vw,18px)] mb-1">
                          {item.title}
                        </h4>
                        <p className=" text-[clamp(10px,1.2vw,13px)] font-extralight">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {salesRecord.saleStatus === "PAID" && (
              <Button variant="default" size="lg" className="w-full mt-5">
                Download Receipt
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesHistoryItemDetails;
