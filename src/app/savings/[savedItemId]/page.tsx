"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
// import { capitalizeFirstLetter } from "@/utils/formatText";
import {
  calculateTargetDate,
  getSavedPlanById,
  ISavedItem,
  updateSavedPlan,
} from "@/hooks/getSavings";
import { GiftIcon, LeftIcon, MegaPhoneIcon } from "@/Icons";
import PopNotification from "@/components/PopNotification/PopNotification";
import { SavedPlanCard } from "../page";
import { DrawerDialog } from "@/components/DrawerDialog/DrawerDialog";
import PaymentCard from "@/components/PaymentCard/PaymentCard";
import PopUpUtility from "@/components/PopUtility/PopUtility";
import { getUserData } from "@/hooks/getUserData";

export default function SavedPlanDetails() {
  const params = useParams();
  const router = useRouter();
  const [savedPlan, setSavedPlan] = useState<ISavedItem | null>(null);
  const [isShowAddToSavings, setIsShowAddToSavings] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "success" | "processing" | "error"
  >("idle");
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(getUserData());

  useEffect(() => {
    const data = getUserData();
    setUserInfo(data);
  }, []);

  useEffect(() => {
    if (params.savedItemId) {
      const savedItem = getSavedPlanById(params.savedItemId as string);
      setSavedPlan(savedItem || null);
    }
  }, [params.savedItemId]);

  if (!savedPlan) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 font-geologica">
        <p className="text-[#000000B2] text-lg">Saved plan not found</p>
        <Button onClick={() => router.push("/savings")} size="lg">
          Back to Savings
        </Button>
      </div>
    );
  }

  const targetDate =
    savedPlan.targetDate ||
    calculateTargetDate(savedPlan.createdAt, savedPlan.planDuration);

  const remainingAmount = savedPlan.goalAmount - savedPlan.currentAmountSaved;

  const startDate = new Date(savedPlan.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleToggleAutoDebit = () => {
    if (!savedPlan) return;

    const updatedValue = !savedPlan.isAutoDebit;

    updateSavedPlan(savedPlan.savedItemId, {
      isAutoDebit: updatedValue,
    });

    setSavedPlan({
      ...savedPlan,
      isAutoDebit: updatedValue,
    });
  };

  const cashBack = 100;

  const isCompleted = savedPlan.saveStatus === "COMPLETED";

  const isRedeemed = savedPlan.saveStatus === "REDEEMED";

  const handleAddToSavings = () => {
    setIsShowAddToSavings(true);
  };

  const handleRedeemed = () => {
    // router.push(`/savings/${savedPlan.savedItemId}/summary`);
  };

  const handleRedeem = () => {
    // router.push(`/savings/${savedPlan.savedItemId}/redeem`);
  };

  let actionText = "Add to Savings";
  let handleAction = handleAddToSavings;

  if (isRedeemed) {
    actionText = "Redeemed";
    handleAction = handleRedeemed;
  } else if (isCompleted) {
    actionText = "Redeem";
    handleAction = handleRedeem;
  }

  const handlePaymentConfirm = () => {
    setTimeout(() => {
      setIsShowAddToSavings(false);
      setPaymentStatus("success");
    }, 1000);
  };

  const handleViewSavingStatus = () => {
    setLoading(true);
    setTimeout(() => {
      setPaymentStatus("idle");
    }, 1000);
  };

  return (
    <>
      <PageTitle
        title="Food Savings"
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
                <BreadcrumbPage>Food Savings</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
      />
      <div className="grid md:grid-cols-[auto_1fr] items-start md:gap-5 mx-4 sm:mx-5 md:mx-6 ml:mx-8 lg:mx-12 mt-6 md:mt-8">
        <div className="all-sides-shadow-xl rounded-2xl py-8 hidden md:block">
          <Sidebar />
        </div>
        <div className="flex flex-col gap-4 lg:gap-6 font-geologica text-[#000000CC] all-sides-shadow-xl rounded-2xl md:px-4 lg:px-6 md:pb-10 mb-16 md:py-5">
          <div className="flex items-start justify-between">
            <Button
              variant="ghost"
              onClick={() => router.push("/savings")}
              className="flex items-center gap-3 p-0 hover:bg-transparent"
            >
              <LeftIcon className="w-4 h-4" />
              <p className="text-[clamp(14px,1.6vw,18px)] text-black font-poppins">
                Back to Savings
              </p>
            </Button>
            {savedPlan.saveStatus === "ACTIVE" && (
              <div>
                <Button
                  variant="default"
                  size="sm"
                  className="h-10 w-fit hidden ml:block"
                >
                  Change Product
                </Button>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 md:gap-5 ml:gap-[30px] text-[#000000CC]">
            <div>
              <SavedPlanCard
                key={savedPlan.savedItemId}
                plan={savedPlan}
                showDetailsPageBtn={false}
                detailsPage=""
                cardBtn={
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleAction}
                      className={`ml-4 border-[0.5px] h-10 w-fit px-3 hidden ml:block text-[clamp(13px,1.3vw,15px)] ${savedPlan.saveStatus === "REDEEMED" ? "rounded-[35px] bg-[#BFBFBF] hover:bg-[#BFBFBF]/90" : "border-[#C09706]"}`}
                    >
                      {actionText}
                    </Button>
                  </>
                }
              />
            </div>
            {savedPlan.saveStatus === "ACTIVE" && (
              <div className="flex items-center justify-between ml:hidden">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[0.5px] border-[#C09706] h-10 w-fit px-2"
                >
                  Add to Savings
                </Button>

                <div>
                  <Button variant="default" size="sm" className="h-10 w-fit">
                    Change Product
                  </Button>
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 items-center justify-between gap-3 gap-x-8 md:gap-4 lg:gap-5">
              {[
                {
                  title: "Goal",
                  value: `₦${savedPlan.goalAmount.toLocaleString()}`,
                },
                {
                  title: "Saved",
                  value: `₦${savedPlan.currentAmountSaved.toLocaleString()}`,
                },
                {
                  title: "Remaining",
                  value: `₦${remainingAmount.toLocaleString()}`,
                },
                {
                  title: "Target Date",
                  value: targetDate,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white border border-[#0000001A] shadow-sm rounded-[10px] md:rounded-2xl px-3 py-3 md:py-4 flex flex-col gap-2"
                >
                  <h4 className="text-[clamp(10px,1.4vw,15px)] font-extralight">
                    {item.title}
                  </h4>
                  <p
                    className={`text-[clamp(14px,1.6vw,20px)] font-medium ${item.title === "Saved" ? "text-[#03601A] " : "text-[#000000CC]"} `}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
            <div
              className={`bg-[#F5F5F5] rounded-2xl shadow-xs px-3 sm:px-5 md:px-12 py-6 md:py-8 grid grid-cols-2 gap-6 md:gap-8 gap-x-2 ${savedPlan.saveStatus === "REDEEMED" ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-2"}`}
            >
              {savedPlan.saveStatus === "REDEEMED" ? (
                <>
                  {[
                    {
                      title: "Start Date",
                      value: startDate,
                    },
                    {
                      title: "End Date",
                      value: targetDate,
                    },
                    {
                      title: "Interval",
                      value: savedPlan.paymentInterval,
                    },
                    {
                      title: "Redeemed on",
                      value: "Oct 8, 2026",
                    },
                    {
                      title: "Delivered on",
                      value: "Oct 10, 2026",
                    },
                    {
                      title: "Delivered to",
                      value: userInfo.deliveryAddresses[0].fullAddress,
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col gap-[10px]">
                      <h4 className="text-[clamp(10px,1.4vw,15px)] font-extralight">
                        {item.title}
                      </h4>
                      <p className="text-[clamp(14px,1.7vw,18px)]">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {[
                    {
                      title: "Start Date",
                      value: startDate,
                    },
                    {
                      title: "Interval",
                      value: savedPlan.paymentInterval,
                    },
                    {
                      title: "Next Payment",
                      value: savedPlan.nextPaymentDate,
                    },
                    {
                      title: "Auto-Debit",
                      value: savedPlan.isAutoDebit ? "Enabled" : "Disabled",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col gap-[10px]">
                      <h4 className="text-[clamp(10px,1.4vw,15px)] font-extralight">
                        {item.title}
                      </h4>
                      <div className="text-[clamp(14px,1.7vw,18px)]">
                        {item.title === "Auto-Debit" ? (
                          <Button
                            variant="ghost"
                            onClick={handleToggleAutoDebit}
                            className={`p-0 hover:bg-transparent w-fit h-fit text-[clamp(14px,1.7vw,18px)] ${
                              savedPlan.isAutoDebit
                                ? "text-[#03601A]"
                                : "text-[#E63946]"
                            }`}
                          >
                            {savedPlan.isAutoDebit ? "Enabled" : "Disabled"}
                          </Button>
                        ) : (
                          <p>{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
            <div className="text-[clamp(14px,1.7vw,18px)] rounded-2xl border-[0.5px] border-[#0000001A] px-3 md:px-6 py-5 ">
              <h2>Savings History</h2>
              <div className="flex flex-col gap-4 mt-5">
                {[
                  {
                    paymentDate: "01/01/2026",
                    paymentAmount: "₦10,000",
                    paymentStatus: "Success",
                  },
                  {
                    paymentDate: "01/01/2026",
                    paymentAmount: "₦10,000",
                    paymentStatus: "Success",
                  },
                  {
                    paymentDate: "01/01/2026",
                    paymentAmount: "₦10,000",
                    paymentStatus: "Success",
                  },
                  {
                    paymentDate: "01/01/2026",
                    paymentAmount: "₦10,000",
                    paymentStatus: "Success",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-[#F5F5F5] rounded-2xl px-2 py-2 md:px-5 md:py-4"
                  >
                    <p>{item.paymentDate}</p>
                    <div className="flex flex-col gap-1">
                      <p>+{item.paymentAmount}</p>
                      <p
                        className={`${
                          item.paymentStatus === "Success"
                            ? "text-[#03601A]"
                            : "text-[#E63946]"
                        } text-[clamp(10px,1.4vw,15px)] text-right`}
                      >
                        {item.paymentStatus}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <PopNotification
              icon={<GiftIcon className="w-5 h-5" />}
              textContent={
                <div>
                  <p className="text-black font-medium">
                    {savedPlan.saveStatus === "COMPLETED"
                      ? "Congratulations 🎉"
                      : "Almost There! 🎉"}
                  </p>
                  <p>
                    {savedPlan.saveStatus === "COMPLETED"
                      ? `You have been rewarded with ₦${cashBack} cashback for your next purchase for completing this savings`
                      : `Just ₦${remainingAmount.toLocaleString()} away! Complete to get ₦${cashBack} cashback for your next purchase.`}
                  </p>
                </div>
              }
            />
          </div>
        </div>
      </div>

      {/* payment modal */}
      <DrawerDialog
        open={isShowAddToSavings}
        close={() => setIsShowAddToSavings(false)}
        size="md"
        title="Add to Your Savings"
        subTitle="Send your savings amount to the account details below. The payment will be automatically verified and added to your balance."
        contentCSS="px-[30px] "
        headerClassName="mb-6"
      >
        <PaymentCard
          bankName="Zenith Bank"
          accountNumber="1234567890"
          accountName="Agriconnect Savings"
          amount={`₦0`}
          onCancel={() => setIsShowAddToSavings(false)}
          handlePaymentConfirm={handlePaymentConfirm}
          savingsNotification={
            <PopNotification
              icon={<MegaPhoneIcon className="w-5 h-5" />}
              textContent={
                <p>
                  Your savings will reflect automatically within 10-15 minutes
                  after payment confirmation.
                </p>
              }
            />
          }
        />
      </DrawerDialog>
      {/* Success Modal */}
      <DrawerDialog
        open={paymentStatus === "success"}
        close={() => setPaymentStatus("idle")}
        size="sm"
        title="Payment in Progress"
        titleCSS="sr-only text-xs"
        contentCSS=" h-fit"
        headerClassName="border-none py-0"
        scrollAreaClassName="h-fit pb-5"
      >
        <PopUpUtility
          className="w-fit py-5 border-none"
          header="Payment in Progress"
          desc="We're verifying your transfer. Your savings will be updated once payment is confirmed"
          icon={
            <Image
              width={100}
              height={100}
              src="/assets/avatars/paymentInProgress.svg"
              alt=""
              className="w-[100px] md:w-[120px] ml:w-[140px] lg:w-[150px] h-auto object-cover"
            />
          }
          buttonTitle="View Savings Status"
          hrClassName="hidden"
          handleFirstBtnAtn={handleViewSavingStatus}
          disabledFirstBtn={loading}
          loadingFirstBtnAtn={loading}
        />
      </DrawerDialog>
    </>
  );
}
