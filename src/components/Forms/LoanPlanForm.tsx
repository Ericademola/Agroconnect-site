"use client";

import { Button } from "@/components/ui/button";
import { Form, FormLabel } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Spinner } from "../ui/spinner";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CartItem } from "@/types";
import PopNotification from "../PopNotification/PopNotification";
import { CreditCardIcon, NoticeIcon } from "@/Icons";
import { getUserData, updateUserData } from "@/hooks/getUserData";
import { DrawerDialog } from "../DrawerDialog/DrawerDialog";
import { formatDate } from "@/utils/formatDate";
import LoanBankForm, { TypeLoanBankFormSchema } from "./LoanBankForm";

const LoanPlanFormSchema = z.object({
  duration: z.string(),
  paymentInterval: z.string(),
});

type TypeLoanPlanFormSchema = z.infer<typeof LoanPlanFormSchema>;

interface LoanPlanFormProps {
  loanPlan: CartItem[];
  totalAmount: number;
  interestAmount: number;
  onSubmit: (data: TypeLoanPlanFormSchema) => void;
}

const LoanPlanForm = ({
  loanPlan,
  totalAmount,
  interestAmount,
  onSubmit,
}: LoanPlanFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userInfo, setUserInfo] = useState(getUserData());
  const [isShowAddBankDetails, setIsShowAddBankDetails] = useState(false);

  const form = useForm<TypeLoanPlanFormSchema>({
    resolver: zodResolver(LoanPlanFormSchema),
    defaultValues: {
      duration: "1 month",
      paymentInterval: "Daily",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { handleSubmit, formState, reset } = form;

  useEffect(() => {
    reset({
      duration: "1 month",
      paymentInterval: "Daily",
    });
  }, [loanPlan, totalAmount, reset]);

  useEffect(() => {
    const data = getUserData();
    setUserInfo(data);
  }, []);

  const LOAN_PLAN_CONFIG_KEY = "LoanPlanConfig";

  const handleFormSubmit = async (data: TypeLoanPlanFormSchema) => {
    if (!userInfo?.bankDetails) {
      setIsShowAddBankDetails(true);
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Save loan config to localStorage so checkout page can use it
      const loanConfig = {
        duration: data.duration,
        paymentInterval: data.paymentInterval,
        totalAmount: loanDetails?.totalAmount ?? 0,
        interestAmount: loanDetails?.interestAmount ?? 0,
        numberOfPayments: loanDetails?.numberOfPayments ?? 0,
        paymentPerInstallment: loanDetails?.paymentPerInstallment ?? 0,
        startDate: dateDetails?.startDate ?? "",
        endDate: dateDetails?.endDate ?? "",
      };

      localStorage.setItem(LOAN_PLAN_CONFIG_KEY, JSON.stringify(loanConfig));

      onSubmit(data);
    } catch (error) {
      console.error("Failed to create loan plan", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const DurationArray = [
    { label: "1 month", value: { day: 30, week: 4, month: 1 } },
    { label: "2 months", value: { day: 60, week: 8, month: 2 } },
    { label: "3 months", value: { day: 90, week: 12, month: 3 } },
    { label: "4 months", value: { day: 120, week: 16, month: 4 } },
    { label: "5 months", value: { day: 150, week: 20, month: 5 } },
    { label: "6 months", value: { day: 180, week: 24, month: 6 } },
  ];

  const RepaymentType = [
    { label: "Daily", value: "day" },
    { label: "Weekly", value: "week" },
    { label: "Bi-Weekly", value: "bi-weekly" },
    { label: "Monthly", value: "month" },
  ];

  const calculateLoanDetails = () => {
    const selectedDuration = form.watch("duration");
    const selectedInterval = form.watch("paymentInterval");

    const durationObj = DurationArray.find((d) => d.label === selectedDuration);
    const repaymentObj = RepaymentType.find(
      (r) => r.label === selectedInterval,
    );

    if (!durationObj || !repaymentObj) return null;

    let numberOfPayments = 0;

    switch (repaymentObj.value) {
      case "day":
        numberOfPayments = durationObj.value.day;
        break;
      case "week":
        numberOfPayments = durationObj.value.week;
        break;
      case "bi-weekly":
        numberOfPayments = Math.ceil(durationObj.value.week / 2);
        break;
      case "month":
        numberOfPayments = durationObj.value.month;
        break;
    }

    const totalLoanAmount = totalAmount + interestAmount;
    const paymentPerInstallment = totalLoanAmount / numberOfPayments;

    return {
      numberOfPayments,
      paymentPerInstallment,
      totalAmount: totalLoanAmount,
      interestAmount: interestAmount,
      loanAmount: totalAmount,
    };
  };

  const calculateDates = () => {
    const selectedDuration = form.watch("duration");
    const durationObj = DurationArray.find((d) => d.label === selectedDuration);

    if (!durationObj) return null;

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + durationObj.value.day);

    return {
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      startDateRaw: startDate,
      endDateRaw: endDate,
    };
  };

  const loanDetails = calculateLoanDetails();
  const dateDetails = calculateDates();

  const handleAddBankDetails = () => {
    setIsShowAddBankDetails(true);
  };

  const handleLoanBankFormSubmit = (data: TypeLoanBankFormSchema) => {
    const currentBankDetails = userInfo?.bankDetails ?? [];
    const dateAdded = new Date();

    const updatedUserInfo = updateUserData({
      bankDetails: [
        ...currentBankDetails,
        {
          bankName: data.bankName,
          accountNumber: data.accountNumber,
          bvn: data.bvn,
          accountName: userInfo?.userFullName ?? "",
          isPrimary: false,
          dateAdded: formatDate(dateAdded),
        },
      ],
    });

    setUserInfo(updatedUserInfo);
    setIsShowAddBankDetails(false);
    console.log("Bank details added successfully!");
  };

  return (
    <div>
      <Form {...form}>
        <form
          className="flex flex-col gap-6 pb-3"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div className="flex flex-col text-[#000000CC] font-poppins gap-3">
            <h2 className="text-[clamp(14px,1.5vw,16px)] font-geologica">
              Order Items
            </h2>
            <div className=" flex flex-col gap-3 ">
              {loanPlan.map((item) => (
                <div
                  key={item.productId}
                  className="grid grid-cols-[auto_1fr_auto] gap-3 rounded-[12px] shadow shadow-[#0000000D] px-3 py-4 bg-[#F5F5F5] border border-[#0000001A] "
                >
                  <Link
                    href={`/shop/loan-${item.productId}`}
                    className="bg-white rounded-[10px] p-1 inline-block"
                  >
                    <Image
                      src={item.productImage}
                      alt={item.productName}
                      width={50}
                      height={50}
                      className="object-contain w-[50px] h-[70px]"
                    />
                  </Link>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-[clamp(14px,1.4vw,16px)] text-black font-medium">
                      {item.productName} ({item.unit})
                    </h3>
                    <p className="font-geologica text-[#000000CC] text-xs">
                      {item.quantity > 1
                        ? `${item.quantity} bags `
                        : `${item.quantity} bag `}
                    </p>
                    <div className="flex items-center gap-3 mt-auto">
                      <p className="text-[#1E1E1E] text-[clamp(14px,1.4vw,16px)]">
                        ₦{item.price.toLocaleString()}
                      </p>
                      <p className="text-[#000000CC] text-[clamp(12px,1.2vw,14px)]">
                        {item.addOns?.length > 0 && (
                          <>
                            + ₦
                            {item.addOns
                              .reduce((sum, addOn) => sum + addOn.price, 0)
                              .toLocaleString()}{" "}
                            add on
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  <p className="text-black text-[clamp(14px,1.4vw,16px)] my-auto">
                    ₦
                    {(
                      item.price * item.quantity +
                      (item.addOns?.reduce(
                        (sum, addOn) => sum + addOn.price,
                        0,
                      ) ?? 0)
                    ).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between gap-2 border border-[#0000001A] rounded-xl p-4 shadow-xs">
              <h3 className="text-[clamp(12px,1.6vw,18px)]">
                Total Loan Amount
              </h3>
              <p className="text-[clamp(14px,1.7vw,20px)]">
                {`₦${(totalAmount ?? "").toLocaleString()}`}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 text-[#525252] font-geologica">
            <h3 className="text-[#000000CC] text-[clamp(12px,1.4vw,16px)]">
              Repayment Plan
            </h3>
            <div className="flex flex-col gap-5 bg-[#F5F5F5] border border-[#0000001A] rounded-2xl px-6 py-4">
              <div className="flex flex-col gap-1">
                <FormLabel className="text-[clamp(13px,1.2vw,14px)]">
                  Duration
                </FormLabel>
                <div className="flex flex-wrap items-center gap-3 w-full">
                  {DurationArray.map((duration) => {
                    const isActive = form.watch("duration") === duration.label;

                    return (
                      <button
                        key={duration.label}
                        type="button"
                        onClick={() =>
                          form.setValue("duration", duration.label, {
                            shouldValidate: true,
                          })
                        }
                        className={`text-nowrap py-3 px-4 bg-[#ECECEC] rounded-md border text-[clamp(12px,1.4vw,15px)] 
          ${isActive ? "border-[#C09706] text-[#C09706]" : "border-[#F5F5F5] text-[#00000066]"}
        `}
                      >
                        {duration.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <FormLabel className="text-[clamp(13px,1.2vw,14px)]">
                  Repayment Type
                </FormLabel>
                <div className="grid grid-cols-3 gap-5">
                  {RepaymentType.map((interval) => {
                    const isActive =
                      form.watch("paymentInterval") === interval.label;

                    return (
                      <button
                        key={interval.label}
                        type="button"
                        onClick={() =>
                          form.setValue("paymentInterval", interval.label, {
                            shouldValidate: true,
                          })
                        }
                        className={`p-3 bg-[#ECECEC] rounded-md border text-[clamp(12px,1.4vw,15px)]
          ${isActive ? "border-[#C09706] text-[#C09706]" : "border-[#F5F5F5] text-[#00000066]"}
        `}
                      >
                        {interval.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="text-[#000000CC] grid grid-cols-2 gap-8 gap-x-0">
                {loanDetails &&
                  dateDetails &&
                  [
                    {
                      title: `${form.watch("paymentInterval")} Amount`,
                      value: `₦${loanDetails.paymentPerInstallment.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`,
                    },
                    {
                      title: "Installments",
                      value: `${loanDetails.numberOfPayments}x payments`,
                    },
                    {
                      title: "Interest Amount",
                      value: `₦${loanDetails.interestAmount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`,
                    },
                    {
                      title: "Total Amount",
                      value: `₦${loanDetails.totalAmount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`,
                    },
                    {
                      title: "Start Date",
                      value: dateDetails.startDate,
                    },
                    {
                      title: "End Date",
                      value: dateDetails.endDate,
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
              </div>
              <div className="flex items-center gap-2 border-t border-[#0000001A] py-5 w-full">
                <CreditCardIcon className="w-6 h-6" />
                {userInfo?.bankDetails ? (
                  <p className="text-[clamp(12px,1.4vw,14px)]">
                    {userInfo.bankDetails[0].bankName} ••••
                    {userInfo.bankDetails[0].accountNumber?.slice(-4) ||
                      "****"}{" "}
                    (BVN •••
                    {userInfo.bankDetails[0].bvn?.slice(-4) || "****"})
                  </p>
                ) : (
                  <div className="flex items-center justify-between gap-3 w-full">
                    <p className="text-[clamp(12px,1.4vw,14px)] text-[#00000066]">
                      No bank details available
                    </p>
                    <Button
                      type="button"
                      size="sm"
                      className="h-10 text-[clamp(10px,1.3vw,14px)]"
                      onClick={handleAddBankDetails}
                    >
                      Add Bank Details
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 border border-[#0000001A] shadow shadow-[#0000000D] rounded-2xl p-5">
              <h3 className="text-[clamp(12px,1.6vw,18px)]">
                Total Payable (with Interest)
              </h3>
              <p className="text-[clamp(14px,1.7vw,20px)]">
                {`₦${(totalAmount + interestAmount).toLocaleString()}`}
              </p>
            </div>
          </div>
          <PopNotification
            className="items-start"
            icon={<NoticeIcon className="w-5 h-5" />}
            textClassName="text-[clamp(10px,1.2vw,14px)]"
            textContent={
              <>
                <p className="text-[#F5A721]">Important Notice</p>
                <p>
                  If your primary account has insufficient funds, deductions may
                  occur from other bank accounts linked to your BVN. By
                  proceeding, you authorize automatic repayment of this loan.
                </p>
              </>
            }
          />
          <Button
            type="submit"
            variant="default"
            size="lg"
            className="w-full"
            disabled={
              isSubmitting || !formState.isValid || !userInfo?.bankDetails
            }
          >
            {isSubmitting ? (
              <Spinner className="h-5 w-5" />
            ) : (
              "Proceed with loan"
            )}
          </Button>
        </form>
      </Form>

      {/* BANK FORM */}
      <DrawerDialog
        open={isShowAddBankDetails}
        close={() => setIsShowAddBankDetails(false)}
        size="md"
        title="Link Your Bank Account"
        subTitle="Required to access Food on Credit"
        contentCSS="px-7"
        max_height
      >
        <LoanBankForm
          onCancel={() => setIsShowAddBankDetails(false)}
          onSubmit={handleLoanBankFormSubmit}
        />
      </DrawerDialog>
    </div>
  );
};

export default LoanPlanForm;
