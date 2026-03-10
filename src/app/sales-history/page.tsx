"use client";

import Image from "next/image";
import EmptyPage from "@/components/EmptyPage/EmptyPage";
import PageTitle from "@/components/PageTitle/PageTitle";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ApprovedApplicationIcon,
  CircleCheckIcon,
  ClockIcon,
  DownIcon,
  ExportIcon,
  MoneyBagIcon,
  TotalApplicationIcon,
  TotalOrdersIcon,
} from "@/Icons";
import Link from "next/link";
import PopNotification from "@/components/PopNotification/PopNotification";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import StatusView from "@/components/StatusView/StatusView";
import { capitalizeFirstLetter } from "@/utils/formatText";
import { formatDate } from "@/utils/formatDate";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

const SalesHistory = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("All Time");

  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const paidSales = salesRecordItems.filter(
    (item) => item.saleStatus === "PAID",
  );
  const processingSales = salesRecordItems.filter(
    (item) => item.saleStatus === "PROCESSING",
  );

  const FilterOptions = ({ onClose }: { onClose?: () => void }) => (
    <RadioGroup
      value={selectedFilter}
      onValueChange={(value) => {
        setSelectedFilter(value);
        onClose?.();
      }}
      className="gap-4"
    >
      {[
        { value: "All Time", label: "All Time" },
        { value: "Daily", label: "Daily" },
        { value: "Weekly", label: "Weekly" },
        { value: "Monthly", label: "Monthly" },
      ].map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <RadioGroupItem value={option.value} id={option.value} />
          <Label
            htmlFor={option.value}
            className="text-[#00000080] font-geologica font-extralight text-[clamp(12px,1.4vw,16px)]"
          >
            {option.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );

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

        <div className="flex flex-col gap-4 md:gap-10 lg:gap-14 font-geologica text-[#000000CC] all-sides-shadow-xl rounded-2xl md:py-5">
          {salesRecordItems && (
            <div className="grid grid-cols-2 lg:grid-cols-4 items-center gap-2 md:gap-5 px-4 lg:px-4">
              {[
                {
                  label: "Total Revenue",
                  icon: <MoneyBagIcon className="w-3 md:w-5 h-3 md:h-5" />,
                  iconBg: "#104ED6",
                  digit: `₦${salesRecordItems
                    .reduce((a, b) => a + b.totalValue, 0)
                    .toLocaleString()}`,
                  desc: "All-time earnings",
                },
                {
                  label: "Total Orders",
                  icon: <TotalOrdersIcon className="w-3 md:w-5  h-3 md:h-5" />,
                  iconBg: "#B900AC",
                  digit: salesRecordItems.length,
                  desc: "Completed sales",
                },
                {
                  label: "This Month",
                  icon: (
                    <ApprovedApplicationIcon className="w-3 md:w-5 h-3 md:h-5" />
                  ),
                  iconBg: "#C09706",
                  digit: `₦${salesRecordItems
                    .filter((item) => {
                      const saleDate = new Date(item.saleDate);
                      const now = new Date();
                      return (
                        saleDate.getMonth() === now.getMonth() &&
                        saleDate.getFullYear() === now.getFullYear()
                      );
                    })
                    .reduce((a, b) => a + b.totalValue, 0)
                    .toLocaleString()}`,
                  desc: `${new Date().toLocaleString("en-US", { month: "long" })} earnings`,
                },
                {
                  label: "Average Order",
                  icon: (
                    <TotalApplicationIcon className="w-3 md:w-5 h-3 md:h-5" />
                  ),
                  iconBg: "#03601A",
                  digit: `₦${Math.round(
                    salesRecordItems.reduce((a, b) => a + b.totalValue, 0) /
                      salesRecordItems.length,
                  ).toLocaleString()}`,
                  desc: "Per sale",
                },
              ].map((item) => (
                <div key={item.label}>
                  {isMobile ? (
                    <div className="flex flex-col items-start gap-1 bg-[#F5F5F5] rounded-[4px] px-2 py-2 md:py-3">
                      <div className="flex items-center gap-1">
                        <span
                          style={{ backgroundColor: item.iconBg }}
                          className="w-2 h-2 rounded-full"
                        />
                        <h2 className="text-[8px] font-extralight">
                          {item.label}
                        </h2>
                      </div>
                      <p className="text-[10px]">{item.digit}</p>
                      <p className="text-[6px] font-extralight">{item.desc}</p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 lg:gap-3 rounded-2xl md:px-4 py-3 all-sides-shadow-xl">
                      <div
                        style={{ backgroundColor: item.iconBg }}
                        className={`p-2 md:p-3 rounded-[10px] md:rounded-[12px] flex items-center justify-center`}
                      >
                        {item.icon}
                      </div>
                      <div className="flex flex-col gap-1 font-extralight">
                        <h2 className="text-[clamp(9px,1.4vw,16px)]">
                          {item.label}
                        </h2>

                        <p className="text-[clamp(14px,1.6vw,20px)] font-normal">
                          {item.digit}
                        </p>
                        <p className="text-xs">{item.desc}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col">
            {salesRecordItems.length === 0 ? (
              <EmptyPage
                title="No Sales Recorded Yet"
                subtitle="Once you start supplying products to the platform, all completed and fulfilled sales will appear here — including pricing, quantities, and payment summaries."
                image="/assets/avatars/emptyApplication.svg"
                altText="empty sales record"
                buttonText="Start Selling"
                buttonIcon={null}
                buttonhref="/shop"
                className="py-14"
                subtitleClassName="w-[90%] md:w-[70%]"
              />
            ) : (
              <>
                <div className="text-[#00000099] flex gap-4 justify-between items-center border-t border-b px-4 lg:px-6 py-2">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-[clamp(16px,2vw,26px)] font-medium">
                      Transaction History
                    </h2>
                    <p className="text-[clamp(12px,1.4vw,16px)]">
                      All your completed sales
                    </p>
                  </div>
                  <div className="flex items-center gap-5">
                    <Popover>
                      <PopoverTrigger>
                        <div className="cursor-pointer border border-[#0000001A] rounded-[10px] flex items-center gap-5 h-[40px] ml:h-[50px] px-3">
                          <p className="font-extralight">{selectedFilter}</p>
                          <DownIcon className="w-3 h-3 cursor-pointer" />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="mr-4 sm:mr-5 md:mr-6 ml:mr-8 lg:mr-12">
                        <div>
                          <FilterOptions />
                        </div>
                      </PopoverContent>
                    </Popover>
                    <div className="cursor-pointer border border-[#0000001A] rounded-[10px] flex items-center gap-5 h-[40px] ml:h-[50px] px-3">
                      <ExportIcon className="w-5 h-5" />
                      <p className="text-[clamp(12px,1.4vw,16px)] font-extralight">
                        Export
                      </p>
                    </div>
                  </div>
                </div>
                <Tabs defaultValue="allSales" className="w-full gap-0">
                  <div className="border-t border-b border-[#0000001A] pt-3">
                    <TabsList className="px-4 md:px-6 lg:px-7 h-8 md:h-12 lg:h-14 py-2 w-full ml:w-[70%]  lg:w-1/2 justify-between gap-3 md:gap-5 lg:gap-8 font-geologica bg-transparent rounded-none">
                      <TabsTrigger
                        value="allSales"
                        className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-[2px] data-[state=active]:border-[#03601A] data-[state=active]:rounded-none text-[#333333] data-[state=active]:text-[#03601A] text-[clamp(10px,1.4vw,16px)] py-4 md:py-6"
                      >
                        All Sales ({salesRecordItems.length})
                      </TabsTrigger>
                      <TabsTrigger
                        value="paid"
                        className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-[2px] data-[state=active]:border-[#03601A] data-[state=active]:rounded-none text-[#333333] data-[state=active]:text-[#03601A] text-[clamp(10px,1.4vw,16px)] py-4 md:py-6"
                      >
                        Paid ({paidSales.length})
                      </TabsTrigger>
                      <TabsTrigger
                        value="processing"
                        className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-[2px] data-[state=active]:border-[#03601A] data-[state=active]:rounded-none text-[#333333] data-[state=active]:text-[#03601A] text-[clamp(10px,1.4vw,16px)] py-4 md:py-6"
                      >
                        Processing ({processingSales.length})
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  <div className="py-5 px-4 sm:px-5 md:px-6 lg:px-7">
                    <TabsContent value="allSales">
                      <div className="flex flex-col gap-6">
                        {salesRecordItems.map((sale) => (
                          <SalesHistoryCard
                            key={sale.saleId}
                            salesRecord={sale}
                          />
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="paid">
                      <>
                        {paidSales.length === 0 ? (
                          <EmptyPage
                            title="No Sales Recorded Yet"
                            subtitle="No paid sales recorded yet"
                            image="/assets/avatars/emptyApplication.svg"
                            altText="empty application"
                            className="py-14"
                            subtitleClassName="w-[90%] md:w-[70%]"
                          />
                        ) : (
                          <div className="flex flex-col gap-6">
                            {paidSales.map((sale) => (
                              <SalesHistoryCard
                                key={sale.saleId}
                                salesRecord={sale}
                              />
                            ))}
                          </div>
                        )}
                      </>
                    </TabsContent>
                    <TabsContent value="processing">
                      <div className="flex flex-col gap-6">
                        {processingSales.map((sale) => (
                          <SalesHistoryCard
                            key={sale.saleId}
                            salesRecord={sale}
                          />
                        ))}
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesHistory;

// ===============================
// MOCK DATA
// ===============================

export interface ISalesRecordItem {
  saleId: string;
  item: {
    productImage: string;
    productName: string;
  };
  deliveryOption: string;
  saleStatus: string;
  totalValue: number;
  quantityAvailable: number;
  cropVariety: string;
  pricePerUnit: number;
  saleDate: string;
  buyerRef: string;
  packageMethod: string;
  applicationSubmitDate: string;
  applicationApprovedDate: string;
  productDeliveredDate: string;
  paymentReceivedDate: string | null;
}

export const salesRecordItems = [
  {
    saleId: "SAL20251123001",
    item: {
      productImage: "/assets/images/redOil.png",
      productName: "Red Oil",
    },
    deliveryOption: "Platform Pickup",
    saleStatus: "PAID",
    totalValue: 240000,
    quantityAvailable: 100,
    cropVariety: "Pure Groundnut Oil",
    pricePerUnit: 2400,
    packageMethod: "Liter",
    saleDate: "Nov 23, 2025",
    buyerRef: "AG-BYR-4521",
    applicationSubmitDate: "Nov 8, 2025",
    applicationApprovedDate: "Nov 9, 2025",
    productDeliveredDate: "Nov 22, 2025",
    paymentReceivedDate: "Nov 23, 2025",
  },
  {
    saleId: "SAL20251123005",
    item: {
      productImage: "/assets/images/groundnutOil.png",
      productName: "Groundnut Oil",
    },
    deliveryOption: "Self Delivery",
    saleStatus: "PROCESSING",
    totalValue: 900000,
    quantityAvailable: 100,
    packageMethod: "Liter",
    cropVariety: "Pure Groundnut Oil",
    pricePerUnit: 2400,
    saleDate: "Nov 23, 2025",
    buyerRef: "AG-BYR-4521",
    applicationSubmitDate: "Nov 8, 2025",
    applicationApprovedDate: "Nov 9, 2025",
    productDeliveredDate: "Nov 22, 2025",
    paymentReceivedDate: null,
  },
];

// ===============================
// SALES HISTORY CARD
// ===============================

interface SalesHistoryCardProps {
  salesRecord: ISalesRecordItem;
}

export const SalesHistoryCard = ({ salesRecord }: SalesHistoryCardProps) => {
  const router = useRouter();
  const isMobile = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  return (
    <div className="bg-[#F5F5F5] rounded-2xl border border-[#0000001A] shadow-md shadow-[#0000000D] p-3 md:p-5 divide-y divide-[#0000001A] flex flex-col gap-2 md:gap-4 font-poppins">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 text-black pb-2 md:pb-4">
        <div className="flex items-start gap-3 ml:gap-4">
          <div className="bg-white rounded-2xl p-1 lg:p-2 flex items-center justify-center">
            <Image
              src={salesRecord.item.productImage}
              alt={salesRecord.item.productName}
              width={50}
              height={50}
              className="object-contain w-[80px] lg:w-[100px] h-[80px] lg:h-[100px]"
            />
          </div>
          <div className="text-[clamp(10px,1.2vw,14px)] font-light flex flex-col gap-3">
            <span className="flex items-center gap-3">
              <h2 className="text-[clamp(16px,1.8vw,20px)] font-medium line-clamp-1">
                {salesRecord.item.productName}
              </h2>
              <StatusView
                styleOption={true}
                classStyleName="text-[clamp(10px,1.2vw,13px)] px-2 py-1 rounded-full flex items-center justify-between gap-2 md:gap-3"
                status={
                  salesRecord.saleStatus === "PAID"
                    ? "Paid"
                    : salesRecord.saleStatus === "PROCESSING"
                      ? "Processing"
                      : ""
                }
                icon={
                  salesRecord.saleStatus === "PAID" ? (
                    <CircleCheckIcon className="w-3 h-3 md:w-4 md:h-4" />
                  ) : salesRecord.saleStatus === "PROCESSING" ? (
                    <ClockIcon className="w-3 h-3 md:w-4 md:h-4" />
                  ) : null
                }
                green="Paid"
                orange="Processing"
              />
            </span>
            <p>{salesRecord.cropVariety}</p>
            <p>Sale ID: {salesRecord.saleId}</p>
          </div>
        </div>
        <div className="text-end hidden ml:block">
          <p className="text-[clamp(10px,1.2vw,14px)] font-light">
            Total Value
          </p>
          <h3 className="text-[clamp(14px,1.7vw,20px)] font-semibold text-[#03601A]">
            ₦{salesRecord.totalValue.toLocaleString()}
          </h3>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 pb-2 md:pb-4 font-geologica text-[#000000CC]">
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
            title: "Sale Date",
            value: formatDate(salesRecord.saleDate),
          },
          {
            title: "Buyer Ref",
            value: salesRecord.buyerRef,
          },
        ].map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-[10px] bg-white rounded-[12px] p-2 md:p-3"
          >
            <h4 className="text-[clamp(10px,1.2vw,13px)] font-extralight">
              {item.title}
            </h4>
            <p className="text-[clamp(14px,1.7vw,18px)]">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-4">
        {salesRecord.saleStatus === "PROCESSING" && (
          <PopNotification
            iconBgClassName="hidden"
            className="border-[#F5A721] bg-[#F5A7210F]"
            textContent={
              <p>
                <span className="font-semibold mr-2 text-[#F5A721] text-xs">
                  Submitted:
                </span>
                {formatDate(salesRecord.applicationSubmitDate)} • Your
                application is under review
              </p>
            }
          />
        )}

        <div className="flex items-center gap-5 justify-between">
          {isMobile ? (
            <div className="">
              <p className="text-[clamp(10px,1.2vw,14px)] font-light">
                Total Value
              </p>
              <h3 className="text-[clamp(14px,1.7vw,20px)] font-semibold text-[#03601A]">
                ₦{salesRecord.totalValue.toLocaleString()}
              </h3>
            </div>
          ) : null}
          <Button
            variant="outline"
            size="lg"
            className="border-[0.5px] border-[#C09706] w-fit ml:w-full"
            onClick={() => router.push(`/sales-history/${salesRecord.saleId}`)}
          >
            View Details
          </Button>
          {isMobile ? null : (
            <>
              {salesRecord.saleStatus === "PAID" && (
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[0.5px] border-[#C09706] w-fit ml:w-full"
                >
                  Download Receipt
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
