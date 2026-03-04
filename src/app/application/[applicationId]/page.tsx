"use client";

import { DeliveryMethodOptions } from "@/components/Forms/SellProductForm";
import PopNotification from "@/components/PopNotification/PopNotification";
import { Button } from "@/components/ui/button";
import { getApplicationById, IApplication } from "@/hooks/getApplication";
import { useGoBack } from "@/hooks/useGoBack";
import {
  CancelIcon,
  CircleCheckIcon,
  ClockIcon,
  LeftIcon,
  TotalApplicationIcon,
} from "@/Icons";
import { formatDate } from "@/utils/formatDate";
import { capitalizeFirstLetter } from "@/utils/formatText";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ApplicationDetails = () => {
  const params = useParams();
  const router = useRouter();
  const [application, setApplication] = useState<IApplication | null>(null);

  useEffect(() => {
    if (params.applicationId) {
      const application = getApplicationById(params.applicationId as string);
      setApplication(application || null);
    }
  }, [params.applicationId]);

  const goBack = useGoBack();

  if (!application) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 font-geologica">
        <p className="text-[#000000B2] text-lg">Application not found</p>
        <Button onClick={() => router.push("/application")} size="lg">
          Back to Application
        </Button>
      </div>
    );
  }
  return (
    <div className="mx-4 sm:mx-5 md:mx-6 ml:mx-8 lg:mx-12 pt-3 md:pt-6 pb-32 flex flex-col gap-4 md:gap-7 font-geologica">
      <div className="flex items-start md:gap-4 pb-2 border-b border-[#0000001A]">
        <Button
          variant="ghost"
          onClick={goBack}
          className="h-fit w-fit p-0 hover:bg-transparent"
        >
          <LeftIcon className="w-4 h-4 md:w-5 md:h-5" />
        </Button>
        <div className=" text-[#000000CC] flex flex-col gap-1 text-center md:text-start w-full">
          <h1 className="text-[clamp(20px,2.8vw,30px)] font-medium leading-tight">
            Application Details
          </h1>
          <p className="text-[clamp(12px,1.4vw,16px)]">
            {application.applicationId}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-5 md:gap-[30px]">
        <PopNotification
          iconBgClassName="hidden"
          className={`  ${
            application.applicationStatus === "PENDING"
              ? "border-[#F5A721] bg-[#F5A7211A]"
              : application.applicationStatus === "APPROVED"
                ? "border-[#03601A] bg-[#03601A0F]"
                : application.applicationStatus === "PROCESSED"
                  ? "border-[#8A38F5] bg-[#8A38F50F]"
                  : application.applicationStatus === "REJECTED"
                    ? "border-[#EA4435] bg-[#EA44350F]"
                    : ""
          }`}
          textContent={
            <div className="flex flex-col gap-2 divide-y divide-[#0000001A]">
              <div className="flex items-center gap-3">
                <span>
                  {application.applicationStatus === "PENDING" ? (
                    <ClockIcon className="w-5 h-5 md:w-7 md:h-7" />
                  ) : application.applicationStatus === "APPROVED" ? (
                    <CircleCheckIcon className="w-5 h-5 md:w-7 md:h-7" />
                  ) : application.applicationStatus === "PROCESSED" ? (
                    <CircleCheckIcon
                      className="w-5 h-5 md:w-7 md:h-7"
                      fill="#8A38F5"
                    />
                  ) : application.applicationStatus === "REJECTED" ? (
                    <CancelIcon className="w-5 h-5 md:w-7 md:h-7" />
                  ) : null}
                </span>
                <div className="flex flex-col">
                  <h2
                    className={`font-semibold mr-2 text-[clamp(16px,1.8vw,20px)] ${
                      application.applicationStatus === "PENDING"
                        ? "text-[#C09706]"
                        : application.applicationStatus === "APPROVED"
                          ? "text-[#03601A]"
                          : application.applicationStatus === "PROCESSED"
                            ? "text-[#8A38F5]"
                            : application.applicationStatus === "REJECTED"
                              ? "text-[#EA4435]"
                              : ""
                    }`}
                  >
                    {application.applicationStatus === "PENDING"
                      ? "Pending"
                      : application.applicationStatus === "APPROVED"
                        ? "Approved"
                        : application.applicationStatus === "PROCESSED"
                          ? "Payment Processed"
                          : application.applicationStatus === "REJECTED"
                            ? "Rejected"
                            : ""}
                  </h2>
                  <p className="text-[clamp(12px,1.4vw,16px)]">
                    {application.applicationStatus === "PENDING"
                      ? `Submitted on ${application.submittedDate}`
                      : application.applicationStatus === "APPROVED"
                        ? `Approved on ${application.approvedDate ?? "Nov 17, 2025"}`
                        : application.applicationStatus === "PROCESSED"
                          ? `Paid on ${application.paymentDate ?? "Nov 17, 2025"}`
                          : application.applicationStatus === "REJECTED"
                            ? `Rejected on ${application.rejectedDate ?? "Nov 17, 2025"}`
                            : ""}
                  </p>
                </div>
              </div>
              <p>
                {application.applicationStatus === "PENDING"
                  ? `Your application is under review`
                  : application.applicationStatus === "APPROVED"
                    ? `Please prepare for delivery on ${application.deliveryDate}`
                    : application.applicationStatus === "PROCESSED"
                      ? "Payment processed"
                      : application.applicationStatus === "REJECTED"
                        ? `Quality standards not met. Please review our quality guidelines.`
                        : ""}
              </p>
            </div>
          }
        />

        {/* Product Information */}
        <div className="flex flex-col gap-[10px]">
          <h2 className="text-[clamp(14px,1.6vw,18px)] text-[#000000CC] font-geologica">
            Product Information
          </h2>
          <div className="bg-[#F5F5F5] rounded-2xl border border-[#0000001A] shadow-md shadow-[#0000000D] p-4 md:p-5 divide-y divide-[#0000001A] flex flex-col gap-4 font-poppins  text-black">
            <div className="flex items-center justify-between gap-3 pb-4">
              <div className="flex items-start gap-4">
                <div className="bg-white rounded-2xl p-1 lg:p-2 flex items-center justify-center">
                  <Image
                    src={application.item.productImage}
                    alt={application.item.productName}
                    width={50}
                    height={50}
                    className="object-contain w-[80px] lg:w-[100px] h-[80px] lg:h-[100px]"
                  />
                </div>
                <div className="text-[clamp(10px,1.4vw,16px)] font-light flex flex-col gap-3">
                  <h2 className="text-[clamp(16px,1.8vw,20px)] font-medium">
                    {application.item.productName}
                  </h2>
                  <p>{application.cropVariety}</p>
                  <div className="flex items-center gap-2 divide-x divide-[#0000001A] ">
                    <p className="pr-2">
                      Harvest:{" "}
                      <span className="font-medium">
                        {formatDate(application.harvestPeriod)}
                      </span>
                    </p>
                    <p>
                      Package:{" "}
                      <span className="font-medium">
                        {capitalizeFirstLetter(application.packageMethod)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-[clamp(14px,1.6vw,18px)]">Description</h3>
              <p className="text-[clamp(12px,1.4vw,16px)] font-light">
                {application.description}
              </p>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="flex flex-col gap-[10px] font-geologica">
          <h2 className="text-[clamp(14px,1.6vw,18px)] text-[#000000CC]">
            Order Details
          </h2>
          <div className="bg-[#F5F5F5] rounded-2xl border border-[#0000001A] shadow-md shadow-[#0000000D] p-4 md:p-5 flex flex-col gap-4 text-black">
            <div className="grid grid-cols-2 md:grid-cols-3">
              {[
                {
                  title: "Quantity",
                  value: `${application.quantityAvailable} ${capitalizeFirstLetter(application.packageMethod)}`,
                },
                {
                  title: "Price per Unit",
                  value: application.pricePerUnit.toString(),
                },
              ].map((item, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <h4 className="text-[clamp(10px,1.2vw,13px)] font-extralight">
                    {item.title}
                  </h4>
                  <p className="text-[clamp(14px,1.7vw,18px)]">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="bg-[#03601A0F] border-[0.5px] border-[#03601A] p-3 rounded-[10px] font-raleway">
              <p className="text-[clamp(12px,1.4vw,16px)] font-light">
                Total Value
              </p>
              <h3 className="text-[clamp(16px,1.8vw,22px)] font-semibold text-[#03601A]">
                {application.totalValue}
              </h3>
            </div>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="flex flex-col gap-[10px] font-geologica">
          <h2 className="text-[clamp(14px,1.6vw,18px)] text-[#000000CC]">
            Delivery Information
          </h2>
          <div className="bg-[#F5F5F5] rounded-2xl border border-[#0000001A] shadow-md shadow-[#0000000D] p-4 md:p-5 text-black">
            <div className="grid md:grid-cols-2 gap-5 ">
              {[
                {
                  title: "Delivery Method",
                  value:
                    DeliveryMethodOptions.find(
                      (option) =>
                        option.optionValue === application.deliveryMethod,
                    )?.optionTitle ?? application.deliveryMethod,
                },
                {
                  title: "Farm Address",
                  value: application.farmAddress?.fullAddress,
                },
                ...(application.applicationStatus === "APPROVED" ||
                application.applicationStatus === "PROCESSED"
                  ? [
                      {
                        title: "Scheduled Delivery",
                        value: formatDate(application.deliveryDate),
                      },
                    ]
                  : []),
                {
                  title: "Emergency Contact",
                  value: application.emergancyContact,
                },
              ].map((item, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <h4 className="text-[clamp(10px,1.2vw,13px)] font-extralight">
                    {item.title}
                  </h4>
                  <p className="text-[clamp(14px,1.7vw,18px)]">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Status */}
        <>
          {application.applicationStatus === "PROCESSED" && (
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
                        value: application.totalValue,
                      },
                      {
                        title: "Payment Date",
                        value: `${application.paymentDate ?? "Nov 17, 2025"}`,
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
          )}
        </>

        {/* Application Timeline */}
        <div className="flex flex-col gap-[10px] font-geologica">
          <h2 className="text-[clamp(14px,1.6vw,18px)] text-[#000000CC]">
            Application Timeline
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
                  value: application.submittedDate,
                },
                ...(application.applicationStatus === "APPROVED"
                  ? [
                      {
                        title: "Application Approved",
                        icon: (
                          <CircleCheckIcon className="w-3 md:w-5 h-4 md:h-5" />
                        ),
                        iconBg: "#03601A33",
                        value: `${application.approvedDate ?? "Nov 17, 2025"}`,
                      },
                    ]
                  : []),
                ...(application.applicationStatus === "PROCESSED"
                  ? [
                      {
                        title: "Application Approved",
                        icon: (
                          <CircleCheckIcon className="w-3 md:w-5 h-4 md:h-5" />
                        ),
                        iconBg: "#03601A33",
                        value: `${application.approvedDate ?? "Nov 17, 2025"}`,
                      },
                      {
                        title: "Delivered & Payment Processed",
                        icon: (
                          <CircleCheckIcon
                            className="w-3 md:w-5 h-4 md:h-5"
                            fill="#104ED6"
                          />
                        ),
                        iconBg: "#104ED633",
                        value: `${application.paymentDate ?? "Nov 17, 2025"}`,
                      },
                    ]
                  : []),
                ...(application.applicationStatus === "REJECTED"
                  ? [
                      {
                        title: "Application Rejected",
                        icon: <CancelIcon className="w-3 md:w-5 h-4 md:h-5" />,
                        iconBg: "#E6394633",
                        value: `${application.rejectedDate ?? "Nov 17, 2025"}`,
                      },
                    ]
                  : []),
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-[10px] text-[#000000CC]"
                >
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

        {application.applicationStatus === "REJECTED" && (
          <Button
            variant="default"
            size="lg"
            className="w-full mt-5"
            onClick={() =>
              router.push(`/sell-product/${application.item.productId}`)
            }
          >
            Reapply
          </Button>
        )}
      </div>
    </div>
  );
};

export default ApplicationDetails;
