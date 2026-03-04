"use client";

import PopNotification from "@/components/PopNotification/PopNotification";
import Sidebar from "@/components/Sidebar/Sidebar";
import StatusView from "@/components/StatusView/StatusView";
import { Button } from "@/components/ui/button";
import { getWatchlistItemById } from "@/hooks/getFarmProducts";
import { useGoBack } from "@/hooks/useGoBack";
import {
  BarChartIcon,
  GraphArrowDownIcon,
  GraphArrowUpIcon,
  LeftIcon,
} from "@/Icons";

import { IWatchlistItem } from "@/types";
import { formatDate } from "@/utils/formatDate";
import { capitalizeFirstLetter } from "@/utils/formatText";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import PageTitle from "@/components/PageTitle/PageTitle";

const WatchListDetails = () => {
  const params = useParams();
  const router = useRouter();
  const [watchList, setWatchList] = useState<IWatchlistItem | null>(null);

  useEffect(() => {
    if (params.productId) {
      const item = getWatchlistItemById(Number(params.productId));
      setWatchList(item || null);
    }
  }, [params.productId]);

  const goBack = useGoBack();

  if (!watchList) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 font-geologica">
        <p className="text-[#000000B2] text-lg">WatchList not found</p>
        <Button onClick={() => router.push("/watch-list")} size="lg">
          Back to WatchList
        </Button>
      </div>
    );
  }
  return (
    <>
      <PageTitle
        title="Product Watchlist"
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
                  <BreadcrumbPage>Product Watchlist</BreadcrumbPage>
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
        <div className="flex flex-col gap-4 md:gap-7 px-4 md:px-6 md:pt-5 md:pb-8 font-geologica all-sides-shadow-xl">
          <div className="flex items-center gap-3 md:gap-4 pb-2 border-b border-[#0000001A]">
            <Button
              variant="ghost"
              onClick={goBack}
              className="h-fit w-fit p-0 hover:bg-transparent"
            >
              <LeftIcon className="w-4 h-4 md:w-5 md:h-5" />
            </Button>

            <h1 className="text-[clamp(20px,2.8vw,30px)] font-medium leading-tight text-center md:text-start">
              Product Stats
            </h1>
          </div>
          <div className="flex flex-col gap-[30px] text-[#000000CC]">
            <div className="flex items-start gap-3 ml:gap-4">
              <div className="bg-white rounded-2xl p-1 lg:p-2 flex items-center justify-center">
                <Image
                  src={watchList.productImage}
                  alt={watchList.productName}
                  width={50}
                  height={50}
                  className="object-contain w-[80px] lg:w-[100px] h-[80px] lg:h-[100px]"
                />
              </div>
              <div className="text-[clamp(10px,1.2vw,14px)] font-light flex flex-col gap-3">
                <h2 className="text-[clamp(16px,1.8vw,20px)] font-medium line-clamp-1">
                  {watchList.productName}
                </h2>
                <p>{watchList.unit}</p>
                <div className="flex items-center gap-4">
                  <StatusView
                    styleOption={true}
                    classStyleName="text-[clamp(10px,1.2vw,13px)] px-2 md:px-4 py-1 rounded-full flex items-center gap-2"
                    status={
                      watchList.demandLevel === "HIGH"
                        ? "High Demand"
                        : watchList.demandLevel === "MEDIUM"
                          ? "Medium Demand"
                          : watchList.demandLevel === "LOW"
                            ? "Low Demand"
                            : ""
                    }
                    orange="Medium Demand"
                    green="High Demand"
                    red="Low Demand"
                  />
                  <StatusView
                    styleOption={true}
                    classStyleName="text-[clamp(10px,1.2vw,13px)] px-2 md:px-4 py-1 rounded-full flex items-center gap-2"
                    status={
                      watchList.supplyStatus === "HIGH"
                        ? "High Supply"
                        : watchList.supplyStatus === "STABLE"
                          ? "Stable Supply"
                          : watchList.supplyStatus === "LOW"
                            ? "Low Supply"
                            : watchList.supplyStatus === "VERY LOW"
                              ? "Very Low Supply"
                              : ""
                    }
                    green="High Supply"
                    red={`${watchList.supplyStatus === "VERY LOW" ? "Very Low Supply" : "Low Supply"}`}
                    blue="Stable Supply"
                  />
                </div>
              </div>
            </div>
            <div className="bg-[#03601A0F] rounded-2xl p-3 md:p-5 text-black flex items-start justify-between gap-3">
              <div className="flex flex-col gap-3 font-light font-raleway ">
                <h2 className="text-[clamp(12px,1.4vw,16px)]">
                  Current Market Price
                </h2>
                <p className="font-semibold text-[#333333] text-[clamp(16px,1.9vw,24px)]">
                  ₦{watchList.price.toLocaleString()}
                </p>
                <p className="text-[clamp(9px,1w,12px)]">
                  Last 7 days price movement
                </p>
              </div>
              <div
                className={`bg-white rounded-[20px] md:rounded-[40px] py-[6px] md:py-2 px-3 flex items-center gap-1 text-[clamp(13px,1.3vw,14px)] ${
                  watchList.priceRateType === "POSITIVE"
                    ? "text-[#009D3F]"
                    : "text-[#EA4435]"
                }`}
              >
                {watchList.priceRateType === "POSITIVE" ? (
                  <GraphArrowUpIcon className="w-4 h-4" />
                ) : (
                  <GraphArrowDownIcon className="w-4 h-4" />
                )}
                {watchList.priceRate}
              </div>
            </div>
            <div>
              <h2 className="font-light text-[clamp(14px,1.6vw,20px)] mb-[10px]">
                Price Trend
              </h2>
              <div className="bg-[#F5F5F5] rounded-2xl border border-[#0000001A] shadow-xs shadow-[#0000000D] divide-y divide-[#0000001A] flex flex-col">
                <div className="h-80 p-3 md:p-5"></div>
                <div className="flex items-center justify-between gap-4 py-3 md:py-5 px-4 md:px-7">
                  {[
                    { title: "Min", value: 7800 },
                    { title: "Max", value: 8500 },
                    { title: "Avg", value: 8150 },
                  ].map((item) => (
                    <div key={item.title} className="text-sm">
                      <p>
                        {item.title}: {`₦${item.value.toLocaleString()}`}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 md:gap-10">
              {[
                {
                  title: "Demand Level",
                  value: capitalizeFirstLetter(watchList.demandLevel),
                  sub: `${watchList.sellersCount} active sellers`,
                },
                {
                  title: "Seasonality",
                  value: watchList.season,
                  sub: `Avg delivery: ${watchList.delivery}`,
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-[#F5F5F5] rounded-2xl border border-[#0000001A] shadow-xs shadow-[#0000000D ] p-2 md:p-4 flex flex-col gap-2"
                >
                  <h3 className="text-[clamp(12px,1.4vw,16px)] font-extralight">
                    {item.title}
                  </h3>
                  {item.title === "Demand Level" ? (
                    <p
                      className={`font-semibold font-raleway text-[clamp(16px,1.8vw,22px)] ${watchList.demandLevel === "HIGH" ? "text-[#009D3F]" : watchList.demandLevel === "MEDIUM" ? "text-[#C09706]" : "text-[#EA4435]"}`}
                    >
                      {item.value}
                    </p>
                  ) : (
                    <p className="font-semibold font-raleway text-[clamp(16px,1.8vw,22px)] text-[#333333] ">
                      {item.value}
                    </p>
                  )}

                  <p className="text-[clamp(10px,1.2vw,12px)] font-extralight">
                    {item.sub}
                  </p>
                </div>
              ))}
            </div>

            <PopNotification
              iconBgClassName="hidden"
              className="border-[#1D44B3] bg-[#1D44B30F]"
              textContent={
                <div className="flex flex-col gap-3">
                  <div className="flex  gap-1">
                    <BarChartIcon className="w-4 h-4" />
                    <p className="font-semibold mr-2 text-[#1D44B3]">
                      Market Forecast
                    </p>
                  </div>
                  <p className="text-black">{watchList.marketFocast}</p>
                </div>
              }
            />

            <div className="grid grid-cols-3 gap-3 md:gap-4 font-geologica">
              {[
                {
                  title: "Supply Status",
                  value: capitalizeFirstLetter(watchList.supplyStatus),
                },
                {
                  title: "Competition",
                  value: watchList.sellersCount,
                },
                {
                  title: "Added Date",
                  value: formatDate(watchList.dateAdded),
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-[8px] md:rounded-[10px] lg:rounded-2xl border border-[#0000001A] shadow-xs shadow-[#00000014] p-2 md:p-4 flex flex-col gap-2 text-center"
                >
                  <h4 className="text-[clamp(10px,1.2vw,13px)] font-extralight">
                    {item.title}
                  </h4>

                  <p className="text-[clamp(13px,1.7vw,18px)]">{item.value}</p>
                </div>
              ))}
            </div>

            <Button
              variant="default"
              size="lg"
              className="w-full"
              onClick={() =>
                router.push(`/sell-product/${watchList.productId}`)
              }
            >
              Sell This Product
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WatchListDetails;
