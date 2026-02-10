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
  AddIcon,
  CompletedSavingsIcon,
  GiftIcon,
  HourGlassIcon,
  PiggyIcon,
  RightIcon,
} from "@/Icons";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { getSavedPlans, ISavedItem } from "@/hooks/getSavings";
import { SAVINGS_UPDATED_EVENT } from "@/lib/events";
import PopNotification from "@/components/PopNotification/PopNotification";

const SavingsPage = () => {
  const [savedPlans, setSavedPlans] = useState<ISavedItem[]>([]);

  useEffect(() => {
    const loadSavedPlans = () => {
      const plans = getSavedPlans();
      setSavedPlans(plans);
    };

    loadSavedPlans();

    window.addEventListener(SAVINGS_UPDATED_EVENT, loadSavedPlans);
    return () => {
      window.removeEventListener(SAVINGS_UPDATED_EVENT, loadSavedPlans);
    };
  }, []);

  // Filter saved plans by status
  const activePlanItems = savedPlans.filter(
    (plan) => plan.saveStatus === "ACTIVE",
  );
  const completedPlanItems = savedPlans.filter(
    (plan) => plan.saveStatus === "COMPLETED",
  );
  const redeemedItems = savedPlans.filter(
    (plan) => plan.saveStatus === "REDEEMED",
  );

  const totalAmountSaved = savedPlans.reduce(
    (sum, plan) => sum + plan.currentAmountSaved,
    0,
  );

  return (
    <>
      <PageTitle
        title="Food Savings"
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
                  <BreadcrumbPage>Food Savings</BreadcrumbPage>
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
        <div className="flex flex-col gap-6 font-geologica text-[#000000CC] all-sides-shadow-xl rounded-2xl md:py-5">
          <div className="grid grid-cols-3 items-center gap-2 md:gap-5 px-4 lg:px-6">
            {[
              {
                lable: "Total Saved",
                icon: (
                  <PiggyIcon className="w-3 md:w-5 lg:w-6 h-3 md:h-5 lg:h-6" />
                ),
                containerBg: "#F0FDF4",
                iconBg: "#03601A",
                digit: totalAmountSaved.toFixed(2),
              },
              {
                lable: "Active Plans",
                icon: (
                  <HourGlassIcon className="w-3 md:w-5 lg:w-6 h-3 md:h-5 lg:h-6" />
                ),
                containerBg: "#EFF6FF",
                iconBg: "#104ED6",
                digit: activePlanItems.length,
              },
              {
                lable: "Completed",
                icon: (
                  <CompletedSavingsIcon className="w-3 md:w-5 lg:w-6 h-3 md:h-5 lg:h-6" />
                ),
                containerBg: "#FFF8DF",
                iconBg: "#C09706",
                digit: completedPlanItems.length,
              },
            ].map((item) => (
              <div
                key={item.lable}
                style={{ backgroundColor: item.containerBg }}
                className={`flex items-center gap-2 text-[#000000CC] rounded-2xl px-2 md:px-4 py-3`}
              >
                <div
                  style={{ backgroundColor: item.iconBg }}
                  className={`p-2 md:p-3 lg:p-4 rounded-[10px] md:rounded-[12px] flex items-center justify-center`}
                >
                  {item.icon}
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-[clamp(9px,1.5vw,16px)] font-extralight">
                    {item.lable}
                  </h2>
                  <div className="text-[clamp(14px,1.8vw,20px)]">
                    {item.lable === "Total Saved" ? (
                      <p>₦ {item.digit}</p>
                    ) : (
                      <p>{item.digit}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            <Link href={"/savings-shop"}>
              <Button
                size="lg"
                className="ml-auto md:hidden flex items-center justify-center gap-1 h-9 lg:h-10 font-normal text-[clamp(10px,1.5vw,16px)] mb-3 mr-4 lg:mr-6"
              >
                <AddIcon className="w-3 h-3" /> New Plan
              </Button>
            </Link>
            <Tabs defaultValue="activePlans" className="w-full gap-0">
              <div className="border-t border-b border-[#0000001A]">
                <TabsList className="px-4 md:px-6 lg:px-10 h-8 md:h-12 lg:h-14 py-2 w-full justify-between gap-5 md:gap-8 lg:gap-12 font-geologica bg-transparent rounded-none">
                  <TabsTrigger
                    value="activePlans"
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-[2px] data-[state=active]:border-[#03601A] data-[state=active]:rounded-none text-[#333333] data-[state=active]:text-[#03601A] text-[clamp(10px,1.5vw,16px)] py-4"
                  >
                    Active Plans
                  </TabsTrigger>
                  <TabsTrigger
                    value="completedPlans"
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-[2px] data-[state=active]:border-[#03601A] data-[state=active]:rounded-none text-[#333333] data-[state=active]:text-[#03601A] text-[clamp(10px,1.5vw,16px)] py-4"
                  >
                    Completed Plans
                  </TabsTrigger>
                  <TabsTrigger
                    value="redeemedItems"
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-[2px] data-[state=active]:border-[#03601A] data-[state=active]:rounded-none text-[#333333] data-[state=active]:text-[#03601A] text-[clamp(10px,1.5vw,16px)] py-4"
                  >
                    Redeemed Items
                  </TabsTrigger>
                  <Link href={"/savings-shop"}>
                    <Button
                      size="lg"
                      className="hidden md:flex items-center justify-center gap-1 h-9 lg:h-10 font-normal text-[clamp(10px,1.5vw,16px)]"
                    >
                      <AddIcon className="w-3 h-3" /> New Plan
                    </Button>
                  </Link>
                </TabsList>
              </div>
              <div className="py-5 px-4 sm:px-5 md:px-6 lg:px-[45px]">
                <TabsContent value="activePlans">
                  <>
                    {activePlanItems.length === 0 ? (
                      <EmptyPage
                        title="No Food Savings Yet!"
                        subtitle="Start saving towards your favorite food items and get them easily when you need them."
                        image="/assets/avatars/emptySavings.svg"
                        altText="empty savings"
                        buttonText="Start a Food Saving Plan"
                        buttonIcon={null}
                        buttonhref="/savings-shop"
                        className="py-14"
                      />
                    ) : (
                      <div className="flex flex-col gap-3 md:gap-4 h-[400px] overflow-y-auto hide-scrollbar">
                        <PopNotification
                          icon={<GiftIcon className="w-5 h-5" />}
                          textContent={
                            <p>
                              <span className="text-black font-medium">
                                Earn cashback{" "}
                              </span>
                              by completing savings goals! Use them to buy
                              products when you have enough.
                            </p>
                          }
                        />
                        <div className="flex flex-col gap-4">
                          {activePlanItems.map((plan) => (
                            <SavedPlanCard
                              key={plan.savedItemId}
                              plan={plan}
                              detailsPage={`/savings/${plan.savedItemId}`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                </TabsContent>
                <TabsContent value="completedPlans">
                  <>
                    {completedPlanItems.length === 0 ? (
                      <EmptyPage
                        title="You haven't completed any savings yet."
                        subtitle="Start saving towards your favorite food items and get them easily when you need them."
                        image="/assets/avatars/emptySavings.svg"
                        altText="empty savings"
                        buttonText="Start a Food Saving Plan"
                        buttonIcon={null}
                        buttonhref="/shop"
                        className="py-14"
                      />
                    ) : (
                      <div className="flex flex-col gap-4">
                        {completedPlanItems.map((plan) => (
                          <SavedPlanCard
                            key={plan.savedItemId}
                            plan={plan}
                            detailsPage={`/savings/${plan.savedItemId}`}
                          />
                        ))}
                      </div>
                    )}
                  </>
                </TabsContent>
                <TabsContent value="redeemedItems">
                  <>
                    {redeemedItems.length === 0 ? (
                      <EmptyPage
                        title="You haven't redeemed any savings yet."
                        subtitle="Once you claim your items, they'll appear here."
                        image="/assets/avatars/emptySavings.svg"
                        altText="empty savings"
                        buttonText="Start a Food Saving Plan"
                        buttonIcon={null}
                        buttonhref="/shop"
                        className="py-14"
                      />
                    ) : (
                      <div className="flex flex-col gap-4">
                        {redeemedItems.map((plan) => (
                          <SavedPlanCard
                            key={plan.savedItemId}
                            plan={plan}
                            detailsPage={`/savings/${plan.savedItemId}`}
                          />
                        ))}
                      </div>
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

export default SavingsPage;

interface SavedPlanCardProps {
  plan: ISavedItem;
  detailsPage: string;
}

export const SavedPlanCard = ({ plan, detailsPage }: SavedPlanCardProps) => {
  // Calculate progress percentage
  const progressPercentage =
    plan.goalAmount > 0 ? (plan.currentAmountSaved / plan.goalAmount) * 100 : 0;

  // Display summary based on number of items
  const displayTitle =
    plan.items.length === 1
      ? `${plan.items[0].productName} (${plan.items[0].unit})`
      : `${plan.items[0].productName} (${plan.items[0].unit}) + ${plan.items.length - 1} more`;

  // Get first product image for display
  const displayImage = plan.items[0]?.productImage || "/placeholder.png";

  return (
    <>
      <div className="grid grid-cols-[auto_1fr_auto] gap-2 md:gap-4 border border-[#0000001A] bg-[#F5F5F5] shadow shadow-[#0000000D] pl-3 md:pl-5 rounded-2xl">
        <div className="bg-white rounded-2xl p-1 lg:p-2 flex items-center justify-center my-5">
          <Image
            src={displayImage}
            alt={displayTitle}
            width={50}
            height={50}
            className="object-contain w-[80px] h-[80px] lg:w-[100px] lg:h-[100px]"
          />
        </div>
        <div className="font-poppins text-black grid md:grid-cols-[1fr_auto] py-3 md:py-5 text-[clamp(10px,1.2vw,14px)] pr-2">
          <div className="flex flex-col md:gap-3">
            <h3 className="text-[clamp(14px,1.6vw,18px)]">{displayTitle}</h3>
            <div className="flex items-center gap-3 divide-x divide-[#0000001A]">
              <p className="font-light pr-3">{plan.paymentInterval}</p>
              <p>Next Deposit: {plan.nextPaymentDate}</p>
            </div>
          </div>
          <div className="flex flex-row md:flex-col items-center md:items-end gap-[10px]">
            <p className="font-medium text-[#03601A] text-[clamp(14px,1.6vw,18px)]">
              ₦{plan.currentAmountSaved.toLocaleString()} saved
            </p>
            <p>out of ₦{plan.goalAmount.toLocaleString()}</p>
          </div>
          <div className="flex items-center gap-2 md:col-span-2">
            <Progress value={progressPercentage} max={100} className="h-2" />
            <p>{progressPercentage.toFixed(0)}%</p>
          </div>
        </div>
        <Link
          href={detailsPage}
          className="border-l border-[#0000001A] px-4 hidden md:flex items-center justify-center"
        >
          <RightIcon className="w-4 h-4" />
        </Link>
      </div>
    </>
  );
};
