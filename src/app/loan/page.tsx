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
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { LOAN_UPDATED_EVENT } from "@/lib/events";
import {
  getLoanedPlans,
  getLoanTransactionStatus,
  ILoanItem,
} from "@/hooks/getLoans";
import { getUserData } from "@/hooks/getUserData";
import {
  CheckIcon,
  CreditCardIcon,
  DownloadIcon,
  MegaPhoneIcon,
  NewLoanIcon,
  NoticeIcon,
} from "@/Icons";
import { generatePaymentSchedule } from "@/utils/loanPaymentSchedule";
import { DrawerDialog } from "@/components/DrawerDialog/DrawerDialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import PopNotification from "@/components/PopNotification/PopNotification";
import { bankDetails, IuserData } from "@/types";

const LoanPage = () => {
  const [loanPlans, setLoanPlans] = useState<ILoanItem[]>([]);
  const [userInfo, setUserInfo] = useState<IuserData | null>(null);
  const [activeTab, setActiveTab] = useState("activeLoans");
  const [isShowViewReceipt, setIsShowViewReceipt] = useState(false);
  const [selectedLoanPlan, setSelectedLoanPlan] = useState<ILoanItem | null>(
    null,
  );
  const [isShowMakePayment, setIsShowMakePayment] = useState(false);
  const [isShowPaymentOverdue, setIsShowPaymentOverdue] = useState(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  useEffect(() => {
    const loadLoanedPlans = () => {
      const plans = getLoanedPlans();
      setLoanPlans(plans);
    };

    loadLoanedPlans();

    window.addEventListener(LOAN_UPDATED_EVENT, loadLoanedPlans);
    return () => {
      window.removeEventListener(LOAN_UPDATED_EVENT, loadLoanedPlans);
    };
  }, []);

  useEffect(() => {
    const data = getUserData();
    setUserInfo(data);
  }, []);

  function formatWithAnd(items: string[]) {
    if (items.length === 0) return "";
    if (items.length === 1) return items[0];
    if (items.length === 2) return items.join(" & ");
    return `${items.slice(0, -1).join(", ")} & ${items[items.length - 1]}`;
  }

  // Filter loan plans by status
  const activeLoanPlanItems = loanPlans.filter(
    (plan) => plan.loanStatus === "ACTIVE",
  );
  const completedLoanPlanItems = loanPlans.filter(
    (plan) => plan.loanStatus === "COMPLETED",
  );

  // Generate all transactions from loan plans - ONE transaction per plan
  const allTransactions = loanPlans.map((plan) => {
    const productNames = plan.items.map((item) => item.productName);
    const status = getLoanTransactionStatus(plan);

    return {
      loanPlanId: plan.loanPlanId,
      date: plan.createdAt,
      title: `${plan.rePaymentType} payment - ${formatWithAnd(productNames)} loan`,
      amount: plan.amountPaid,
      status: status,
      plan: plan,
    };
  });

  // Sort transactions by date (most recent first)
  allTransactions.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  // Check if loan payment is overdue
  const isLoanOverdue = (plan: ILoanItem): boolean => {
    const nextPaymentDate = new Date(plan.nextPaymentDate);
    const today = new Date();
    return today > nextPaymentDate && plan.loanStatus === "ACTIVE";
  };

  // handleMakePayment decide which modal to open
  const handleMakePayment = (plan: ILoanItem) => {
    setSelectedLoanPlan(plan);

    if (isLoanOverdue(plan)) {
      setIsShowPaymentOverdue(true);
    } else {
      setIsShowMakePayment(true);
    }
  };

  const handleViewReceipt = (plan: ILoanItem) => {
    setSelectedLoanPlan(plan);
    setIsShowViewReceipt(true);
  };

  const handleConfirmPayment = (amount: number) => {
    console.log("Processing payment:", amount);
    setIsShowMakePayment(false);
    setSelectedLoanPlan(null);
  };

  const handlePayNow = async () => {
    setIsPaymentLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsShowPaymentOverdue(false);
      setSelectedLoanPlan(null);
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setIsPaymentLoading(false);
    }
  };

  return (
    <>
      <PageTitle
        title="Food on Credit"
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
                  <BreadcrumbPage>Food on Credit</BreadcrumbPage>
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
        <div className="font-geologica text-[#000000CC] all-sides-shadow-xl rounded-2xl md:py-5">
          <div className="flex flex-col">
            <div className="block md:hidden ml-auto mr-4 sm:mr-5 lg:mr-6 mb-3">
              {loanPlans.length === 0 && (
                <Link href="/shop/shop-loans">
                  <Button
                    size="sm"
                    className="h-10 font-normal text-[clamp(12px,1.4vw,16px)]"
                  >
                    Buy Food on Credit
                  </Button>
                </Link>
              )}
            </div>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              defaultValue="activeLoans"
              className="w-full gap-0"
            >
              <div className="border-b border-[#0000001A] relative">
                <TabsList className="px-4 md:px-6 lg:px-10 h-8 md:h-12 lg:h-14 py-2 w-fit justify-between gap-5 md:gap-8 lg:gap-12 bg-transparent rounded-none ">
                  <TabsTrigger
                    value="activeLoans"
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-[2px] data-[state=active]:border-[#03601A] data-[state=active]:rounded-none text-[#333333] data-[state=active]:text-[#03601A] text-[clamp(10px,1.5vw,16px)] py-4"
                  >
                    Active Loans
                  </TabsTrigger>
                  <TabsTrigger
                    value="completedLoans"
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-[2px] data-[state=active]:border-[#03601A] data-[state=active]:rounded-none text-[#333333] data-[state=active]:text-[#03601A] text-[clamp(10px,1.5vw,16px)] py-4"
                  >
                    Completed Loans
                  </TabsTrigger>
                  <TabsTrigger
                    value="allTransactions"
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-[2px] data-[state=active]:border-[#03601A] data-[state=active]:rounded-none text-[#333333] data-[state=active]:text-[#03601A] text-[clamp(10px,1.5vw,16px)] py-4"
                  >
                    All Transactions
                  </TabsTrigger>

                  {/*only show on Active Loans tab */}
                  {activeTab === "activeLoans" && (
                    <div className="hidden md:block absolute right-4 md:right-6 lg:right-10 top-0">
                      {activeLoanPlanItems.length > 0 ? (
                        <Button
                          size="sm"
                          className="h-10 font-normal text-[clamp(12px,1.4vw,16px)]"
                          onClick={() =>
                            handleMakePayment(activeLoanPlanItems[0])
                          }
                        >
                          Make Payment
                        </Button>
                      ) : loanPlans.length === 0 ? (
                        <Link href="/shop/shop-loans">
                          <Button
                            size="sm"
                            className="h-10 font-normal text-[clamp(12px,1.4vw,16px)]"
                          >
                            Buy Food on Credit
                          </Button>
                        </Link>
                      ) : null}
                    </div>
                  )}
                </TabsList>
              </div>
              <div className="py-5 sm:px-5 lg:px-6">
                <TabsContent value="activeLoans">
                  <>
                    {activeLoanPlanItems.length === 0 ? (
                      <EmptyPage
                        title="No Active Food Loan Yet"
                        subtitle="Buy now and pay later with ease. Get the food you need today and pay in installments."
                        image="/assets/avatars/emptyLoan.svg"
                        altText="empty loans"
                        buttonText="Buy Food on Credit"
                        buttonIcon={null}
                        buttonhref="/shop/shop-loans"
                        className="py-14"
                      />
                    ) : (
                      <div className="flex flex-col">
                        <div className="block md:hidden ml-auto mb-3 px-4 sm:px-0">
                          {activeLoanPlanItems.length > 0 && (
                            <Button
                              size="sm"
                              className="h-10 font-normal text-[clamp(12px,1.4vw,16px)]"
                              onClick={() =>
                                handleMakePayment(activeLoanPlanItems[0])
                              }
                            >
                              Make Payment
                            </Button>
                          )}
                        </div>

                        <div>
                          {activeLoanPlanItems.map((plan) => {
                            const planProgress =
                              plan.totalAmount > 0
                                ? (plan.amountPaid / plan.totalAmount) * 100
                                : 0;

                            return (
                              <div
                                key={plan.loanPlanId}
                                className="flex flex-col gap-7"
                              >
                                <div className="md:border border-[#0000001A] rounded-2xl md:py-5 divide-y divide-[#0000001A] flex flex-col gap-4">
                                  <div className="flex flex-col gap-4 pb-4 px-4 lg:px-6">
                                    <div className="flex items-start gap-[14px] font-poppins rounded-2xl bg-[#F5F5F5] border border-[#0000001A] px-2 md:px-5 py-4 shadow-xs overflow-x-auto">
                                      {plan.items.map((item) => (
                                        <div
                                          key={item.productId}
                                          className="flex flex-col items-center gap-1"
                                        >
                                          <div className="bg-white rounded-[10px] p-1 inline-block w-fit">
                                            <Image
                                              src={item.productImage}
                                              alt={item.productName}
                                              width={50}
                                              height={50}
                                              className="object-contain w-[80px] h-[90px]"
                                            />
                                          </div>
                                          <p className="text-black text-xs text-center line-clamp-1">
                                            {item.productName}
                                          </p>
                                        </div>
                                      ))}
                                    </div>

                                    <div className="grid grid-cols-3 items-center gap-2 md:gap-5">
                                      {[
                                        {
                                          label: "Total Amount",
                                          containerBg: "#EFF6FF",
                                          digit: `₦ ${plan.totalAmount.toLocaleString()}`,
                                        },
                                        {
                                          label: "Amount Paid",
                                          containerBg: "#F0FDF4",
                                          digit: `₦ ${plan.amountPaid.toLocaleString()}`,
                                        },
                                        {
                                          label: "Balance",
                                          containerBg: "#FFF8DF",
                                          digit: `₦ ${plan.balanceAmount.toLocaleString()}`,
                                        },
                                      ].map((item) => (
                                        <div
                                          key={item.label}
                                          style={{
                                            backgroundColor: item.containerBg,
                                          }}
                                          className={`flex flex-col items-center gap-2 rounded-2xl px-2 md:px-4 py-3`}
                                        >
                                          <h2 className="text-[clamp(9px,1.5vw,16px)] font-extralight">
                                            {item.label}
                                          </h2>
                                          <div className="text-[clamp(14px,1.8vw,20px)]">
                                            <p>{item.digit}</p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="flex flex-col gap-2 px-4 lg:px-6 pb-2 md:pb-4">
                                    <h3 className="text-[clamp(12px,1.4px,16px)]  font-extralight">
                                      Repayment Progress
                                    </h3>
                                    <div className="flex items-center gap-2">
                                      <Progress
                                        value={planProgress}
                                        max={100}
                                        className="h-2"
                                      />
                                      <p>{planProgress.toFixed(0)}%</p>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 ml:grid-cols-4 items-start gap-7 gap-x-0 md:gap-x-5 px-4 lg:px-6">
                                    {[
                                      {
                                        label: "Start Date",
                                        digit: `${plan.createdAt}`,
                                      },
                                      {
                                        label: "Next Payment",
                                        digit: `${plan.nextPaymentDate}`,
                                      },
                                      {
                                        label: "Repayment Plan",
                                        digit: `${plan.rePaymentType}`,
                                      },
                                      {
                                        label: "Payment Account",
                                        digit: (() => {
                                          const primary =
                                            userInfo?.bankDetails.find(
                                              (b) => b.isPrimary,
                                            ) ?? userInfo?.bankDetails[0];
                                          return primary
                                            ? `${primary.accountNumber} (${primary.bankName.slice(0, 3)})`
                                            : "No account linked";
                                        })(),
                                      },
                                    ].map((item) => (
                                      <div
                                        key={item.label}
                                        className="flex flex-col gap-2"
                                      >
                                        <h2 className="text-[clamp(9px,1.3vw,14px)] font-extralight">
                                          {item.label}
                                        </h2>
                                        <div className="text-[clamp(14px,1.6vw,18px)]">
                                          <p>{item.digit}</p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div className="border border-[#0000001A] rounded-2xl mx-4 py-5 px-4 lg:px-6 ">
                                  <h3 className="text-[clamp(14px,1.4vw,18px)]">
                                    Payment Schedule
                                  </h3>
                                  <div className="flex flex-col gap-2 md:gap-4 mt-5">
                                    {generatePaymentSchedule(
                                      plan.createdAt,
                                      plan.rePaymentType,
                                      plan.numberOfPayments,
                                      plan.paymentPerInstallment,
                                      plan.amountPaid,
                                    ).map((item, index) => (
                                      <div
                                        key={index}
                                        className="flex items-center justify-between bg-[#F5F5F5] shadow-xs shadow-[#0000000D] rounded-2xl px-2 py-2 md:px-5 md:py-4 text-[clamp(12px,1.6vw,18px)]"
                                      >
                                        <div className="flex items-center gap-2">
                                          {item.paymentStatus === "paid" ? (
                                            <CheckIcon className="w-6 h-6" />
                                          ) : (
                                            <span className="w-6 h-6 rounded-full border border-[#00000033]"></span>
                                          )}
                                          <p>{item.paymentDate}</p>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                          <p>₦{item.paymentAmount}</p>
                                          <p
                                            className={`${
                                              item.paymentStatus === "paid"
                                                ? "text-[#00AC47]"
                                                : "text-[#6D6D6D]"
                                            } text-[clamp(10px,1.3vw,15px)] text-right`}
                                          >
                                            {item.paymentStatus}
                                          </p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </>
                </TabsContent>
                <TabsContent value="completedLoans">
                  <>
                    {completedLoanPlanItems.length === 0 ? (
                      <EmptyPage
                        title="No Completed Loans Yet"
                        subtitle="Your completed loan payments will appear here."
                        image="/assets/avatars/emptyLoan.svg"
                        altText="empty loans"
                        className="py-14"
                        isButton={false}
                      />
                    ) : (
                      <>
                        <div className="flex flex-col gap-5 px-4 sm:px-0">
                          {completedLoanPlanItems.map((plan) => (
                            <div
                              key={plan.loanPlanId}
                              className="flex flex-col gap-3 md:gap-5"
                            >
                              <div className="border border-[#0000001A] rounded-2xl py-3 md:py-5 md:divide-y divide-[#0000001A] flex flex-col gap-2 md:gap-4">
                                <div className="px-3 md:px-4 lg:px-6 pb-2 md:pb-4">
                                  <div className="flex items-start gap-[14px] font-poppins rounded-2xl bg-[#F5F5F5] border-[#0000001A] border px-3 md:px-5 py-4 shadow-xs overflow-x-auto hide-scrollbar w-full">
                                    {plan.items.map((item) => (
                                      <div
                                        key={item.productId}
                                        className="flex flex-col items-center gap-1 flex-shrink-0"
                                      >
                                        <div className="bg-white rounded-[10px] p-1 inline-block w-fit">
                                          <Image
                                            src={item.productImage}
                                            alt={item.productName}
                                            width={50}
                                            height={50}
                                            className="object-contain w-[60px] h-[70px] md:w-[80px] md:h-[90px]"
                                          />
                                        </div>
                                        <p className="text-black text-[clamp(10px,1.2vw,12px)] text-center">
                                          {item.productName}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div className="grid md:grid-cols-[1fr_auto] gap-3 md:gap-5 divide-y divide-[#0000001A] md:divide-none">
                                  <div className="grid grid-cols-2 md:grid-cols-4 items-start gap-5 px-4 lg:px-6 pb-3 md:mb-0">
                                    {[
                                      {
                                        label: "Start Date",
                                        digit: `${plan.createdAt}`,
                                      },
                                      {
                                        label: "Completion Date",
                                        digit: `${plan.targetDate}`,
                                      },
                                      {
                                        label: "Payment Duration",
                                        digit: `${plan.loanDuration}`,
                                      },
                                      {
                                        label: "Total Amount Paid",
                                        digit: `₦${plan.amountPaid.toLocaleString()}`,
                                      },
                                    ].map((item) => (
                                      <div
                                        key={item.label}
                                        className="flex flex-col gap-2"
                                      >
                                        <h2 className="text-[clamp(9px,1.3vw,14px)] font-extralight">
                                          {item.label}
                                        </h2>
                                        <div className="text-[clamp(14px,1.6vw,18px)]">
                                          <p>{item.digit}</p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="px-4 lg:px-6">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="h-10 border-1 border-[#C09706] w-full"
                                      onClick={() => handleViewReceipt(plan)}
                                    >
                                      View Receipt
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </>
                </TabsContent>
                <TabsContent value="allTransactions">
                  <>
                    {allTransactions.length === 0 ? (
                      <EmptyPage
                        title="No Transactions Yet"
                        subtitle="Your loan payment history will appear here."
                        image="/assets/avatars/emptyLoan.svg"
                        altText="empty loans"
                        className="py-14"
                        isButton={false}
                      />
                    ) : (
                      <div className="flex flex-col gap-2 md:gap-4 px-4 sm:px-0">
                        {allTransactions.map((transaction) => {
                          const isCompleted =
                            transaction.status === "Completed";
                          const isOverdue = transaction.status === "Overdue";

                          return (
                            <div
                              key={transaction.loanPlanId}
                              className="flex items-center gap-3 md:gap-4 bg-[#F5F5F5] shadow-xs shadow-[#0000000D] rounded-2xl px-3 py-3 md:px-4 md:py-4"
                            >
                              {isCompleted ? (
                                <CheckIcon className="w-6 h-6 lg:w-7 lg:h-7 text-[#00AC47]" />
                              ) : (
                                <NewLoanIcon
                                  className={`w-7 h-7 lg:w-8 lg:h-8 ${isOverdue ? "fill-[#E63946]" : "fill-[#E4B304]"}`}
                                />
                              )}
                              <div className="grid md:grid-cols-[1fr_auto] gap-3 md:gap-4 w-full">
                                {/* Title and Date */}
                                <div className="flex flex-col">
                                  <p className="text-[clamp(14px,1.6vw,18px)] line-clamp-1">
                                    {transaction.title}
                                  </p>
                                  <p className="text-[clamp(10px,1.2vw,12px)] text-[#000000B2]">
                                    {transaction.date}
                                  </p>
                                </div>
                                {/* Amount and Status */}
                                <div className="flex flex-row md:flex-col md:items-end gap-1 justify-between">
                                  <p className="text-[clamp(14px,1.6vw,18px)]">
                                    ₦
                                    {transaction.amount.toLocaleString(
                                      "en-NG",
                                      {
                                        minimumFractionDigits: 2,
                                      },
                                    )}
                                  </p>
                                  <p
                                    className={`text-[clamp(10px,1.2vw,13px)] px-2 md:px-3 py-1 rounded-full ${
                                      isCompleted
                                        ? "bg-[#00AC471A] text-[#00AC47]"
                                        : isOverdue
                                          ? "bg-[#E639461A] text-[#E63946]"
                                          : "bg-[#E4B3041A] text-[#E4B304]"
                                    }`}
                                  >
                                    {transaction.status}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Completed loan receipt */}
      <DrawerDialog
        open={isShowViewReceipt}
        close={() => {
          setIsShowViewReceipt(false);
          setSelectedLoanPlan(null);
        }}
        size="md"
        title="Food Loan Receipt"
        contentCSS="px-0 gap-2 md:gap-5"
        max_height
        headerClassName="border-b-[1.5px] border-[#0000001A] pb-3 px-5"
      >
        {selectedLoanPlan && (
          <ViewReceipt selectedLoanPlan={selectedLoanPlan} />
        )}
      </DrawerDialog>

      {/* Make Payment modal */}
      <DrawerDialog
        open={isShowMakePayment}
        close={() => {
          setIsShowMakePayment(false);
          setSelectedLoanPlan(null);
        }}
        size="md"
        title="Make Payment"
        subTitle={`Loan ID: ${selectedLoanPlan?.loanPlanId}`}
        contentCSS="px-0 gap-2 md:gap-5"
        max_height
        headerClassName="border-b-[1.5px] border-[#0000001A] pb-3 px-5"
      >
        {selectedLoanPlan && (
          <MakeLoanPayment
            selectedLoanPlan={selectedLoanPlan}
            onConfirm={handleConfirmPayment}
            onCancel={() => {
              setIsShowMakePayment(false);
              setSelectedLoanPlan(null);
            }}
          />
        )}
      </DrawerDialog>

      {/* Payment Overdue modal */}
      <DrawerDialog
        open={isShowPaymentOverdue}
        close={() => {
          setIsShowPaymentOverdue(false);
          setSelectedLoanPlan(null);
        }}
        size="md"
        title="Payment Overdue"
        subTitle={`Immediate action required`}
        contentCSS="px-0 gap-2 md:gap-5"
        max_height
        headerClassName="border-b-[1.5px] border-[#0000001A] pb-3 px-5"
      >
        {selectedLoanPlan && (
          <OverDueLoanPayment
            selectedLoanPlan={selectedLoanPlan}
            onPayNow={handlePayNow}
            onCancel={() => {
              setIsShowMakePayment(false);
              setSelectedLoanPlan(null);
            }}
            paymentloading={isPaymentLoading}
          />
        )}
      </DrawerDialog>
    </>
  );
};

export default LoanPage;

// ============================================
// VIEW RECEIPT COMPONENT
// ============================================

interface ViewReceiptProps {
  selectedLoanPlan: ILoanItem;
  onDownload?: () => void;
}

export const ViewReceipt = ({
  selectedLoanPlan,
  onDownload,
}: ViewReceiptProps) => {
  return (
    <>
      {selectedLoanPlan && (
        <div className=" text-[#000000CC] font-geologica">
          <div className="flex flex-col items-center gap-4 mb-5 ">
            <div className="bg-[#F5F5F5] rounded-full p-3 flex items-center justify-center">
              <Image
                src={"/assets/avatars/receiptNote.svg"}
                alt={"receiptIcon"}
                width={50}
                height={50}
                className="object-contain w-7 h-7"
              />
            </div>
            <div className="text-center">
              <h3 className="text-[clamp(16px,2.2vw,24px)] font-medium">
                Payment Completed
              </h3>

              <p className="text-[clamp(10px,1.3vw,14px)] font-light">
                Loan ID: #{selectedLoanPlan.loanPlanId}
              </p>
            </div>
          </div>
          <div className="border-t border-[#00000080] border-dashed pt-5 px-5">
            <h3 className="text-[clamp(10px,1.3vw,14px)] font-light mb-2">
              Items Purchased
            </h3>

            <div className="rounded-2xl border border-[#0000001A] shadow-xs bg-[#F5F5F5] p-3 ">
              <div className="divide-y divide-[#0000001A] flex flex-col gap-2">
                {selectedLoanPlan.items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center justify-between gap-3 pb-2 text-[clamp(14px,1.5vw,17px)]"
                  >
                    <div className="flex flex-col gap-1">
                      <p>{item.productName}</p>
                      <p className="text-[clamp(10px,1.2vw,13px)]">
                        {item.quantity} {item.quantity > 1 ? "bags" : "bag"}
                      </p>
                    </div>
                    <p>₦{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 px-2 lg:px-4 mt-4">
              {(() => {
                const itemsSubtotal = selectedLoanPlan.items.reduce(
                  (sum, item) => sum + item.price * item.quantity,
                  0,
                );
                const interestAmount = selectedLoanPlan.interestAmount;

                return [
                  {
                    label: "Items Subtotal",
                    digit: `₦${itemsSubtotal.toLocaleString()}`,
                  },
                  {
                    label: "Delivery Fee",
                    digit: `₦${selectedLoanPlan.deliveryFee.toLocaleString()}`,
                  },
                  {
                    label: "Interest Amount",
                    digit: `₦${interestAmount.toLocaleString()}`,
                  },
                  {
                    label: "Repayment Type",
                    digit: `${selectedLoanPlan.rePaymentType}`,
                  },
                  {
                    label: "Start Date",
                    digit: `${selectedLoanPlan.createdAt}`,
                  },
                  {
                    label: "Completion Date",
                    digit: `${selectedLoanPlan.targetDate}`,
                  },
                ];
              })().map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-2 text-[#000000CC]"
                >
                  <h2 className="text-[clamp(10px,1.3vw,13px)] font-light">
                    {item.label}
                  </h2>
                  <div className="text-[clamp(14px,1.5vw,17px)]">
                    <p>{item.digit}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border border-[#0000001A] shadow-xs px-3 py-4 flex items-center justify-between gap-3 rounded-2xl mt-4">
              <p>Total Amount Paid</p>
              <p>₦{selectedLoanPlan.totalAmount.toLocaleString()}</p>
            </div>

            <div className="mt-8 md:mt-12">
              <Button
                variant="outline"
                size="lg"
                className="w-full flex items-center gap-2 border-[#C09706] border-[0.5px]"
                onClick={onDownload}
              >
                <DownloadIcon className="w-5 h-5 md:w-7 md:h-7" /> Download
                Receipt
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// ============================================
// MAKE PAYMENT COMPONENT
// ============================================

interface MakeLoanPaymentProps {
  selectedLoanPlan: ILoanItem;
  onConfirm: (amount: number) => void;
  onCancel: () => void;
}

export const MakeLoanPayment = ({
  selectedLoanPlan,
  onConfirm,
  onCancel,
}: MakeLoanPaymentProps) => {
  const [paymentType, setPaymentType] = useState("standard-payment");
  const [customAmount, setCustomAmount] = useState("");
  const [userInfo, setUserInfo] = useState<IuserData | null>(null);
  const [selectedBank, setSelectedBank] = useState<bankDetails | null>(null);
  const [openBankDialog, setOpenBankDialog] = useState(false);

  useEffect(() => {
    const data = getUserData();
    setUserInfo(data);
    const primary =
      data.bankDetails.find((b) => b.isPrimary) ?? data.bankDetails[0];
    setSelectedBank(primary ?? null);
  }, []);

  const PaymentAmountOptions = [
    {
      optionTitle: "Standard Payment",
      optionValue: "standard-payment",
      description: "Next scheduled payment",
      optionAmount: selectedLoanPlan.paymentPerInstallment,
    },
    {
      optionTitle: "Pay in Full",
      optionValue: "pay-in-full",
      description: "Clear entire balance",
      optionAmount: selectedLoanPlan.balanceAmount,
    },
    {
      optionTitle: "Custom Amount",
      optionValue: "custom-payment",
      description: "",
      optionAmount: null,
    },
  ];

  const getPaymentAmount = () => {
    if (paymentType === "custom-payment") {
      return parseFloat(customAmount) || 0;
    }
    const selected = PaymentAmountOptions.find(
      (opt) => opt.optionValue === paymentType,
    );
    return selected?.optionAmount || 0;
  };

  const handleConfirm = () => {
    const amount = getPaymentAmount();
    if (amount > 0 && amount <= selectedLoanPlan.balanceAmount) {
      onConfirm(amount);
    }
  };

  return (
    <div className="text-[#000000CC] font-geologica flex flex-col">
      <div className="px-5 flex flex-col gap-5 md:gap-7">
        {/* Loan Summary */}
        <div className="flex flex-col gap-2 rounded-2xl border border-[#0000001A] shadow-xs bg-[#F5F5F5] p-3">
          {[
            {
              label: "Total Loan",
              value: `₦${selectedLoanPlan.totalAmount.toLocaleString()}`,
            },
            {
              label: "Amount Paid",
              value: `₦${selectedLoanPlan.amountPaid.toLocaleString()}`,
            },
            {
              label: "Remaining Balance",
              value: `₦${selectedLoanPlan.balanceAmount.toLocaleString()}`,
              bold: true,
            },
          ].map((item) => (
            <div
              key={item.label}
              className={cn(
                "flex items-center justify-between gap-2 pb-2",
                item.bold && "border-t border-[#0000001A] pt-2",
              )}
            >
              <h2
                className={cn(
                  item.bold
                    ? "font-normal text-[clamp(14px,1.5vw,16px)]"
                    : "font-light text-[#000000B2] text-[clamp(12px,1.3vw,14px)]",
                )}
              >
                {item.label}
              </h2>
              <p
                className={cn(
                  "text-[clamp(14px,1.5vw,16px)]",
                  item.bold && "font-medium",
                )}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Payment Options */}
        <div className="flex flex-col gap-2">
          <h3 className="text-[clamp(12px,1.3vw,14px)] font-light">
            Select Payment Amount
          </h3>
          <RadioGroup
            value={paymentType}
            onValueChange={setPaymentType}
            className="gap-3"
          >
            {PaymentAmountOptions.map((option) => {
              const isSelected = paymentType === option.optionValue;
              const isCustomOption = option.optionValue === "custom-payment";

              return (
                <div
                  key={option.optionValue}
                  className={cn(
                    "flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer transition-colors",
                    isSelected
                      ? "bg-[#F5F5F5] border-[#03601A]"
                      : "bg-white border-[#00000033] hover:border-[#03601A]/30",
                  )}
                  onClick={() => setPaymentType(option.optionValue)}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <RadioGroupItem
                      value={option.optionValue}
                      id={option.optionValue}
                      className={cn(
                        "border-1  size-6",
                        isSelected ? "border-[#03601A]" : "border-[#00000033]",
                      )}
                      circleClassName="size-4 fill-[#03601A] stroke-[#03601A]"
                    />

                    <div className="flex flex-col gap-0.5 w-full">
                      <span className="text-[clamp(14px,1.5vw,17px)]">
                        {option.optionTitle}
                      </span>
                      {option.description ? (
                        <span className="text-[#000000B2] text-[clamp(10px,1.1vw,12px)]">
                          {option.description}
                        </span>
                      ) : (
                        isCustomOption && (
                          <Input
                            type="number"
                            placeholder="Enter amount"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            className="bg-[#ECECEC] border-[#F5F5F5] h-10 w-full text-sm"
                            min="0"
                            max={selectedLoanPlan.balanceAmount}
                            onClick={(e) => e.stopPropagation()}
                            disabled={!isSelected}
                            readOnly={!isSelected}
                          />
                        )
                      )}
                    </div>
                  </div>

                  <div className="ml-auto">
                    {option.optionAmount !== null && (
                      <p className="text-[clamp(14px,1.5vw,17px)]">
                        ₦{option.optionAmount.toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </RadioGroup>
        </div>

        {/* Payment Method */}
        <div className="flex flex-col gap-2">
          <h3 className="text-[clamp(12px,1.3vw,14px)] font-light">
            Payment Method
          </h3>
          <div className="flex items-center justify-between border border-[#1D44B3] rounded-lg px-4 py-3 bg-[#1D44B31A]">
            {selectedBank && (
              <div className="flex items-center gap-3">
                <CreditCardIcon className="w-5 h-5 md:w-7 md:h-7" />

                <div className="flex flex-col gap-0.5">
                  <p className="text-[clamp(14px,1.5vw,17px)]">
                    {selectedBank?.bankName} ••••
                    {selectedBank?.accountNumber?.slice(-4)}
                  </p>
                  <p className="text-[clamp(10px,1.1vw,12px)] text-[#000000B2]">
                    Linked to BVN •••• {selectedBank?.bvn?.slice(-4)}
                  </p>
                </div>
              </div>
            )}
            <div className="relative">
              <p
                className="text-[#1D44B3] hover:text-[#1D44B3]/80 cursor-pointer"
                onClick={() => setOpenBankDialog(!openBankDialog)}
              >
                Change
              </p>

              {openBankDialog && (
                <div className="absolute right-0 top-8 z-50 w-[300px] md:w-[400px] bg-white rounded-2xl border border-[#0000001A] shadow-lg flex flex-col gap-3 p-3 md:p-5">
                  {userInfo?.bankDetails.map((bank, index) => (
                    <div
                      key={index}
                      className={`font-geologica flex items-center gap-3 cursor-pointer hover:bg-[#F5F5F5] px-4 py-2 rounded-lg border transition-colors ${
                        selectedBank?.accountNumber === bank.accountNumber
                          ? "border-[#1D44B3] bg-[#1D44B31A]"
                          : "border-[#0000001A]"
                      }`}
                      onClick={() => {
                        setSelectedBank(bank);
                        setOpenBankDialog(false);
                      }}
                    >
                      <CreditCardIcon className="w-5 h-5 md:w-7 md:h-7" />
                      <div className="flex flex-col gap-0.5">
                        <p className="text-[clamp(14px,1.5vw,17px)]">
                          {bank.bankName} ••••{bank.accountNumber?.slice(-4)}
                        </p>
                        <p className="text-[clamp(10px,1.1vw,12px)] text-[#000000B2]">
                          Linked to BVN •••• {bank.bvn?.slice(-4)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Warning Notice */}
        <div className="mt-8 mx-3">
          <PopNotification
            icon={<MegaPhoneIcon className="w-5 h-5" />}
            textContent={
              <p>
                Payment will be processed immediately and your loan balance will
                be updated.
              </p>
            }
            textClassName="text-[clamp(10px,1.3vw,15px)]"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-[auto_1fr] gap-3 px-5 mt-12">
        <Button
          variant="secondary"
          size="lg"
          className="w-full border-[#E5E5E5] px-10"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          variant="default"
          size="lg"
          className="w-full bg-[#C09706] hover:bg-[#C09706]/90"
          onClick={handleConfirm}
          disabled={
            paymentType === "custom-payment" &&
            (!customAmount ||
              parseFloat(customAmount) <= 0 ||
              parseFloat(customAmount) > selectedLoanPlan.balanceAmount)
          }
        >
          Confirm Payment
        </Button>
      </div>
    </div>
  );
};

// ============================================
// MAKE OVERDUE PAYMENT COMPONENT
// ============================================

interface OverDueLoanPaymentProps {
  selectedLoanPlan: ILoanItem;
  onPayNow: () => void;
  onCancel: () => void;
  paymentloading: boolean;
}

export const OverDueLoanPayment = ({
  selectedLoanPlan,
  onPayNow,
  onCancel,
  paymentloading = false,
}: OverDueLoanPaymentProps) => {
  const [userInfo, setUserInfo] = useState<IuserData | null>(null);
  const [selectedBank, setSelectedBank] = useState<bankDetails | null>(null);
  const [openBankDialog, setOpenBankDialog] = useState(false);

  useEffect(() => {
    const data = getUserData();
    setUserInfo(data);
    const primary =
      data.bankDetails.find((b) => b.isPrimary) ?? data.bankDetails[0];
    setSelectedBank(primary ?? null);
  }, []);

  // Calculate loan late fee
  const loanLateFee = 1000;

  // Calculate grace period (7 days after target date)
  const gracePeriodDays = 14;
  const targetDate = new Date(selectedLoanPlan.targetDate);
  const gracePeriodEnd = new Date(targetDate);
  gracePeriodEnd.setDate(targetDate.getDate() + gracePeriodDays);

  // Calculate how many days into grace period we are
  const today = new Date();
  const daysIntoGracePeriod = Math.max(
    0,
    Math.floor(
      (today.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24),
    ),
  );
  const graceProgress = Math.min(
    100,
    (daysIntoGracePeriod / gracePeriodDays) * 100,
  );

  return (
    <div className="text-[#000000CC] font-geologica flex flex-col">
      <div className="px-5 flex flex-col gap-5 md:gap-7">
        {/* Warning Notice */}
        <div className="mt-3">
          <PopNotification
            icon={<NoticeIcon fill="#EA4435" className="w-5 h-5" />}
            textContent={
              <>
                <p className="text-[#EA4435]">Your loan payment is overdue</p>
                <p>
                  You have missed 2 payment(s). Please make a payment
                  immediately to avoid additional penalties.
                </p>
              </>
            }
            textClassName="text-[clamp(10px,1.3vw,14px)]"
            className="border-[#EA4435] bg-[#EA44351A] md:px-3 md:py-2"
            iconBgClassName="bg-[#EA443533]"
          />
        </div>

        {/* Loan Summary */}
        <div className="flex flex-col gap-2 rounded-2xl border border-[#0000001A] shadow-xs bg-[#F5F5F5] p-3">
          {[
            {
              label: "Overdue Amount",
              value: `₦${selectedLoanPlan.balanceAmount.toLocaleString()}`,
            },
            {
              label: "Late Fee",
              value: `₦${loanLateFee.toLocaleString()}`,
            },
            {
              label: "Total Due Now",
              value: `₦${(selectedLoanPlan.balanceAmount + loanLateFee).toLocaleString()}`,
              bold: true,
            },
          ].map((item) => (
            <div
              key={item.label}
              className={cn(
                "flex items-center justify-between gap-2 pb-2",
                item.bold && "border-t border-[#0000001A] pt-2",
              )}
            >
              <h2
                className={cn(
                  item.bold
                    ? "font-normal text-[clamp(14px,1.5vw,16px)]"
                    : "font-light text-[#000000B2] text-[clamp(12px,1.3vw,14px)]",
                )}
              >
                {item.label}
              </h2>
              <p
                className={cn(
                  "text-[clamp(14px,1.5vw,16px)]",
                  item.bold && "font-medium",
                )}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Grace progress */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3 text-[clamp(12px,1.3vw,14px)] font-poppins text-black">
            <div className="flex flex-col gap-1">
              <h6 className="font-light">Original Due Date</h6>
              <p>{selectedLoanPlan.targetDate}</p>
            </div>
            <div className="flex flex-col gap-1 text-right">
              <h6 className="font-light">Grace Period Ends</h6>
              <p className="text-[#E63946]">
                {gracePeriodEnd.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <Progress
            value={graceProgress}
            max={100}
            className="h-2"
            indicatorClassName="bg-[#E63946]"
          />
        </div>

        {/* What happens if I don't pay */}
        <div className="bg-[#F5A7211A] rounded-[10px] border-[0.5px] border-[#F5A721] p-4 font-raleway text-[clamp(12px,1.5vw,16px)]">
          <h3 className="font-medium">{`What happens if I don't pay?`}</h3>
          {[
            "Additional late fees will be applied.",
            "Your credit score may be affected.",
            "Future loan applications may be denied.",
            "Legal action may be taken., and it may be deducted from other accounts linked to your BVN",
          ].map((item) => (
            <p key={item} className="flex items-center gap-2">
              <span>•</span> {item}
            </p>
          ))}
        </div>

        {/* Payment Method */}
        <div className="flex flex-col gap-2">
          <h3 className="text-[clamp(12px,1.3vw,14px)] font-light">
            Payment Method
          </h3>
          <div className="flex items-center justify-between border border-[#1D44B3] rounded-lg px-4 py-3 bg-[#1D44B31A]">
            {selectedBank && (
              <div className="flex items-center gap-3">
                <CreditCardIcon className="w-5 h-5 md:w-7 md:h-7" />

                <div className="flex flex-col gap-0.5">
                  <p className="text-[clamp(14px,1.5vw,17px)]">
                    {selectedBank?.bankName} ••••
                    {selectedBank?.accountNumber?.slice(-4)}
                  </p>
                  <p className="text-[clamp(10px,1.1vw,12px)] text-[#000000B2]">
                    Linked to BVN •••• {selectedBank?.bvn?.slice(-4)}
                  </p>
                </div>
              </div>
            )}
            <div className="relative">
              <p
                className="text-[#1D44B3] hover:text-[#1D44B3]/80 cursor-pointer"
                onClick={() => setOpenBankDialog(!openBankDialog)}
              >
                Change
              </p>

              {openBankDialog && (
                <div className="absolute right-0 top-8 z-50 w-[300px] md:w-[400px] bg-white rounded-2xl border border-[#0000001A] shadow-lg flex flex-col gap-3 p-3 md:p-5">
                  {userInfo?.bankDetails.map((bank, index) => (
                    <div
                      key={index}
                      className={`font-geologica flex items-center gap-3 cursor-pointer hover:bg-[#F5F5F5] px-4 py-2 rounded-lg border transition-colors ${
                        selectedBank?.accountNumber === bank.accountNumber
                          ? "border-[#1D44B3] bg-[#1D44B31A]"
                          : "border-[#0000001A]"
                      }`}
                      onClick={() => {
                        setSelectedBank(bank);
                        setOpenBankDialog(false);
                      }}
                    >
                      <CreditCardIcon className="w-5 h-5 md:w-7 md:h-7" />
                      <div className="flex flex-col gap-0.5">
                        <p className="text-[clamp(14px,1.5vw,17px)]">
                          {bank.bankName} ••••{bank.accountNumber?.slice(-4)}
                        </p>
                        <p className="text-[clamp(10px,1.1vw,12px)] text-[#000000B2]">
                          Linked to BVN •••• {bank.bvn?.slice(-4)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-[auto_1fr] gap-3 px-5 mt-12">
        <Button
          variant="secondary"
          size="lg"
          className="w-full border-[#E5E5E5] px-10"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          variant="default"
          size="lg"
          className="w-full bg-[#C09706] hover:bg-[#C09706]/90"
          onClick={onPayNow}
          disabled={paymentloading}
          loading={paymentloading}
        >
          {` Pay Now - ₦${(selectedLoanPlan.balanceAmount + loanLateFee).toLocaleString()}`}
        </Button>
      </div>
    </div>
  );
};
