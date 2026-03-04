"use client";
import EmptyPage from "@/components/EmptyPage/EmptyPage";
import PageTitle from "@/components/PageTitle/PageTitle";
import PopNotification from "@/components/PopNotification/PopNotification";
import Sidebar from "@/components/Sidebar/Sidebar";
import StatusView from "@/components/StatusView/StatusView";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { removeFromWatchlist } from "@/hooks/getFarmProducts";
import {
  BarChartIcon,
  Delete2Icon,
  GraphArrowDownIcon,
  GraphArrowUpIcon,
} from "@/Icons";
import { IWatchlistItem } from "@/types";
import { capitalizeFirstLetter } from "@/utils/formatText";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const ProductWatchList = () => {
  const [watchListItems, setWatchListItems] = useState<IWatchlistItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("WatchlistItems");
    if (stored) setWatchListItems(JSON.parse(stored));
  }, []);

  const handleRemove = (id: number) => {
    removeFromWatchlist(id);
    setWatchListItems((prev) => prev.filter((item) => item.productId !== id));
  };

  return (
    <div>
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
        <div className="flex flex-col gap-4 md:gap-6 font-geologica text-[#000000CC] all-sides-shadow-xl rounded-2xl md:py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-2 md:gap-5 px-4 lg:px-6">
            {[
              {
                label: "Products Watcheds",
                digit: watchListItems.length,
              },
              {
                label: "High Demand",

                digit: watchListItems.filter(
                  (item) => item.demandLevel === "HIGH",
                ).length,
              },
              {
                label: "Trending Up",

                digit: watchListItems.filter(
                  (item) => item.marketTrend === "RISING",
                ).length,
              },
              {
                label: "Best Opportunity",

                digit: "Beans",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col gap-1 rounded-[8px] md:rounded-[10px] lg:rounded-2xl px-2 md:px-4 py-3 border-[#0000001A] border"
              >
                <h2 className="text-[clamp(9px,1.4vw,15px)] font-extralight">
                  {item.label}
                </h2>
                <p className="text-[clamp(14px,1.6vw,18px)]">{item.digit}</p>
              </div>
            ))}
          </div>
          <div className="text-[#00000099] flex flex-col gap-1 border-t border-b px-4 lg:px-6 py-4">
            <h2 className="text-[clamp(16px,2vw,26px)]  font-medium">
              Your Watch List
            </h2>
            <p className="text-[clamp(14px,1.6vw,18px)]">{`Products you're monitoring`}</p>
          </div>
          <div>
            {watchListItems.length === 0 ? (
              <EmptyPage
                title="No Products in Your Watchlist Yet"
                subtitle="Keep track of the products you care about. Add items to your watchlist to monitor price trends, supply insights, and market predictions before submitting a supply application."
                image="/assets/avatars/emptyApplication.svg"
                altText="empty watchlist"
                buttonText="Browse Products"
                buttonIcon={null}
                buttonhref="/shop"
                className="py-14"
                subtitleClassName="w-[90%] md:w-[65%]"
              />
            ) : (
              <div className="flex flex-col gap-6 px-4 lg:px-6 ">
                {watchListItems.map((item) => (
                  <div key={item.productId}>
                    <WatchListCard watchList={item} onRemove={handleRemove} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductWatchList;

interface WatchListCardProps {
  watchList: IWatchlistItem;
  onRemove: (id: number) => void;
}

export const WatchListCard = ({ watchList, onRemove }: WatchListCardProps) => {
  const router = useRouter();
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  return (
    <div className="bg-[#F5F5F5] rounded-2xl border border-[#0000001A] shadow-md shadow-[#0000000D] p-3 md:p-5 divide-y divide-[#0000001A] flex flex-col gap-4 font-poppins">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 text-black pb-4">
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
            <div className="flex items-center justify-between">
              <h2 className="text-[clamp(16px,1.8vw,20px)] font-medium line-clamp-1">
                {watchList.productName}
              </h2>
              <div
                className="p-2 md:p-3 rounded-[10px] md:rounded-2xl bg-white block md:hidden"
                onClick={() => onRemove(watchList.productId)}
              >
                <Delete2Icon className="w-4 h-4 md:w-6 md:h-6" />
              </div>
            </div>
            <p>{watchList.unit}</p>
            <div className="flex items-center gap-2 md:gap-4">
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
        <div
          className="p-2 md:p-3 rounded-[10px] md:rounded-2xl bg-white hidden md:block"
          onClick={() => onRemove(watchList.productId)}
        >
          <Delete2Icon className="w-4 h-4 md:w-6 md:h-6" />
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pb-4 font-geologica">
        {[
          {
            title: "Current Price",
            value: `₦${watchList.price.toLocaleString()}`,
            sub: watchList.priceRate,
          },
          {
            title: "Market Trend",
            value: capitalizeFirstLetter(watchList.marketTrend),
            sub: null,
          },
          ...(!isMobile
            ? [
                {
                  title: "Season",
                  value: capitalizeFirstLetter(watchList.season),
                  sub: null,
                },
                { title: "Sellers", value: watchList.sellersCount, sub: null },
                { title: "Delivery", value: watchList.delivery, sub: null },
              ]
            : []),
        ].map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-[10px] bg-white rounded-[8px] md:rounded-[10px] lg:rounded-2xl p-3"
          >
            <h4 className="text-[clamp(10px,1.2vw,13px)] font-extralight">
              {item.title}
            </h4>

            {item.title === "Current Price" ? (
              <div className="flex items-center gap-2">
                <p className="text-[clamp(16px,1.8vw,20px)] font-medium">
                  {item.value}
                </p>
                <span
                  className={`flex items-center gap-1 text-[clamp(10px,1.1vw,12px)] ${
                    watchList.priceRateType === "POSITIVE"
                      ? "text-[#009D3F]"
                      : "text-[#EA4435]"
                  }`}
                >
                  {watchList.priceRateType === "NEGATIVE" ? (
                    <GraphArrowDownIcon className="w-4 h-4" />
                  ) : (
                    <GraphArrowUpIcon className="w-4 h-4" />
                  )}
                  {item.sub}
                </span>
              </div>
            ) : item.title === "Market Trend" ? (
              <p
                className={`text-[clamp(14px,1.7vw,18px)] flex items-center gap-2 ${
                  watchList.marketTrend === "RISING"
                    ? "text-[#009D3F]"
                    : watchList.marketTrend === "FALLING"
                      ? "text-[#EA4435]"
                      : "text-[#000000CC]"
                }`}
              >
                {watchList.marketTrend === "FALLING" ? (
                  <GraphArrowDownIcon className="w-4 h-4" />
                ) : watchList.marketTrend === "RISING" ? (
                  <GraphArrowUpIcon className="w-4 h-4" />
                ) : null}
                {item.value}
              </p>
            ) : (
              <p className="text-[clamp(14px,1.7vw,18px)] text-[#000000CC]">
                {item.value}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-4">
        <PopNotification
          iconBgClassName="hidden"
          className="border-[#1D44B3] bg-[#1D44B30F]"
          textContent={
            <div className="flex  gap-1">
              <span>
                <BarChartIcon className="w-4 h-4" />
              </span>
              <p className="text-black">
                <span className="font-semibold mr-2 text-[#1D44B3]">
                  Forecast:
                </span>
                {watchList.marketFocast}
              </p>
            </div>
          }
        />
        <div className="flex items-center gap-2 md:gap-5 justify-between">
          <Button
            variant="outline"
            size="lg"
            className="border-[0.5px] border-[#C09706] w-full"
            onClick={() => router.push(`/watch-list/${watchList.productId}`)}
          >
            View Full Stats
          </Button>

          <Button
            variant="default"
            size="lg"
            className="w-full"
            onClick={() => router.push(`/sell-product/${watchList.productId}`)}
          >
            Sell This Product
          </Button>
        </div>
      </div>
    </div>
  );
};
