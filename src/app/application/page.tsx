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
  CancelIcon,
  CircleCheckIcon,
  ClockIcon,
  DateIcon,
  DeliveryTruckIcon,
  HourGlassIcon,
  ProcessedIcon,
  RejectedIcon,
  TotalApplicationIcon,
} from "@/Icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { APPLICATION_UPDATED_EVENT } from "@/lib/events";
import PopNotification from "@/components/PopNotification/PopNotification";
import { useRouter } from "next/navigation";
import { getApplications, IApplication } from "@/hooks/getApplication";
import { useMediaQuery } from "react-responsive";
import StatusView from "@/components/StatusView/StatusView";
import { capitalizeFirstLetter } from "@/utils/formatText";
import { formatDate } from "@/utils/formatDate";
import { DeliveryMethodOptions } from "@/components/Forms/SellProductForm";

const MyApplication = () => {
  const [application, setApplication] = useState<IApplication[]>([]);

  useEffect(() => {
    const loadApplications = () => {
      const plans = getApplications();
      setApplication(plans);
    };

    loadApplications();

    window.addEventListener(APPLICATION_UPDATED_EVENT, loadApplications);
    return () => {
      window.removeEventListener(APPLICATION_UPDATED_EVENT, loadApplications);
    };
  }, []);

  // Filter application by status
  const pendingApplication = application.filter(
    (item) => item.applicationStatus === "PENDING",
  );
  const approvedApplication = application.filter(
    (item) => item.applicationStatus === "APPROVED",
  );
  const processedApplication = application.filter(
    (item) => item.applicationStatus === "PROCESSED",
  );
  const rejectedApplication = application.filter(
    (item) => item.applicationStatus === "REJECTED",
  );

  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  return (
    <>
      <PageTitle
        title="My Applications"
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
                  <BreadcrumbPage>My Applications</BreadcrumbPage>
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
          <div className="grid grid-cols-3 items-center gap-2 md:gap-5 px-4 lg:px-4">
            {[
              {
                label: isMobile ? "Total" : "Total Applications",
                icon: (
                  <TotalApplicationIcon className="w-3 md:w-5 h-3 md:h-5" />
                ),
                iconBg: "#104ED6",
                digit: application.length,
              },
              {
                label: "Pending Review",
                icon: <HourGlassIcon className="w-3 md:w-5  h-3 md:h-5" />,
                iconBg: "#C09706",
                digit: pendingApplication.length,
              },
              {
                label: "Approved",
                icon: (
                  <ApprovedApplicationIcon className="w-3 md:w-5 h-3 md:h-5" />
                ),
                iconBg: "#03601A",
                digit: approvedApplication.length,
              },
              {
                label: "Processed",
                icon: <ProcessedIcon className="w-3 md:w-5 h-3 md:h-5" />,
                iconBg: "#8A38F5",
                digit: processedApplication.length,
              },
              {
                label: "Rejected",
                icon: <RejectedIcon className="w-3 md:w-5 h-3 md:h-5" />,
                iconBg: "#EA4435",
                digit: rejectedApplication.length,
              },
            ].map((item) => (
              <div key={item.label}>
                {isMobile ? (
                  <div className="flex items-center gap-2 bg-[#F5F5F5] rounded-[4px] px-2 py-3">
                    <span
                      style={{ backgroundColor: item.iconBg }}
                      className="w-4 h-3 rounded-full"
                    />

                    <div className="flex items-center justify-between w-full">
                      <h2 className="text-[clamp(8px,1.4vw,15px)] font-extralight">
                        {item.label}
                      </h2>
                      <div className="text-[clamp(10px,1.6vw,18px)]">
                        <p>{item.digit}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 rounded-2xl md:px-4 py-3 all-sides-shadow-xl">
                    <div
                      style={{ backgroundColor: item.iconBg }}
                      className={`p-2 md:p-3 rounded-[10px] md:rounded-[12px] flex items-center justify-center`}
                    >
                      {item.icon}
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-[clamp(9px,1.4vw,15px)] font-extralight">
                        {item.label}
                      </h2>
                      <div className="text-[clamp(14px,1.6vw,18px)]">
                        <p>{item.digit}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            <Tabs defaultValue="allApplications" className="w-full gap-0">
              <div className="border-t border-b border-[#0000001A]">
                <TabsList className="px-4 md:px-6 lg:px-10 h-8 md:h-12 lg:h-14 py-2 w-full justify-between gap-3 md:gap-5 lg:gap-8 font-geologica bg-transparent rounded-none">
                  <TabsTrigger
                    value="allApplications"
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-[2px] data-[state=active]:border-[#03601A] data-[state=active]:rounded-none text-[#333333] data-[state=active]:text-[#03601A] text-[clamp(10px,1.5vw,16px)] py-4"
                  >
                    {isMobile ? "All" : "All Applications"}
                  </TabsTrigger>
                  <TabsTrigger
                    value="pending"
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-[2px] data-[state=active]:border-[#03601A] data-[state=active]:rounded-none text-[#333333] data-[state=active]:text-[#03601A] text-[clamp(10px,1.5vw,16px)] py-4"
                  >
                    Pending
                  </TabsTrigger>
                  <TabsTrigger
                    value="approved"
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-[2px] data-[state=active]:border-[#03601A] data-[state=active]:rounded-none text-[#333333] data-[state=active]:text-[#03601A] text-[clamp(10px,1.5vw,16px)] py-4"
                  >
                    Approved
                  </TabsTrigger>
                  <TabsTrigger
                    value="processed"
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-[2px] data-[state=active]:border-[#03601A] data-[state=active]:rounded-none text-[#333333] data-[state=active]:text-[#03601A] text-[clamp(10px,1.5vw,16px)] py-4"
                  >
                    Processed
                  </TabsTrigger>
                  <TabsTrigger
                    value="rejected"
                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-[2px] data-[state=active]:border-[#03601A] data-[state=active]:rounded-none text-[#333333] data-[state=active]:text-[#03601A] text-[clamp(10px,1.5vw,16px)] py-4"
                  >
                    Rejected
                  </TabsTrigger>
                </TabsList>
              </div>
              <div className="py-5 px-4 sm:px-5 md:px-6 lg:px-[45px]">
                <TabsContent value="allApplications">
                  <>
                    {application.length === 0 ? (
                      <EmptyPage
                        title="You haven't applied to sell anything yet"
                        subtitle="When you apply to sell a product, it'll show up on this page so you can track approvals and updates"
                        image="/assets/avatars/emptyApplication.svg"
                        altText="empty application"
                        buttonText="See Available Products"
                        buttonIcon={null}
                        buttonhref="/shop"
                        className="py-14"
                        subtitleClassName="w-[90%] md:w-[70%]"
                      />
                    ) : (
                      <div className="flex flex-col gap-6">
                        {application.map((application) => (
                          <ApplicationCard
                            key={application.applicationId}
                            application={application}
                          />
                        ))}
                      </div>
                    )}
                  </>
                </TabsContent>
                <TabsContent value="pending">
                  <>
                    {pendingApplication.length === 0 ? (
                      <EmptyPage
                        title="You haven't applied to sell anything yet"
                        subtitle="When you apply to sell a product, it'll show up on this page so you can track approvals and updates"
                        image="/assets/avatars/emptyApplication.svg"
                        altText="empty application"
                        buttonText="See Available Products"
                        buttonIcon={null}
                        buttonhref="/shop"
                        className="py-14"
                        subtitleClassName="w-[90%] md:w-[70%]"
                      />
                    ) : (
                      <div className="flex flex-col gap-6">
                        {pendingApplication.map((application) => (
                          <ApplicationCard
                            key={application.applicationId}
                            application={application}
                          />
                        ))}
                      </div>
                    )}
                  </>
                </TabsContent>
                <TabsContent value="approved">
                  <>
                    {approvedApplication.length === 0 ? (
                      <EmptyPage
                        title="You haven't applied to sell anything yet"
                        subtitle="When you apply to sell a product, it'll show up on this page so you can track approvals and updates"
                        image="/assets/avatars/emptyApplication.svg"
                        altText="empty application"
                        buttonText="See Available Products"
                        buttonIcon={null}
                        buttonhref="/shop"
                        className="py-14"
                        subtitleClassName="w-[90%] md:w-[70%]"
                      />
                    ) : (
                      <div className="flex flex-col gap-6">
                        {approvedApplication.map((application) => (
                          <ApplicationCard
                            key={application.applicationId}
                            application={application}
                          />
                        ))}
                      </div>
                    )}
                  </>
                </TabsContent>
                <TabsContent value="processed">
                  <>
                    {processedApplication.length === 0 ? (
                      <EmptyPage
                        title="You haven't applied to sell anything yet"
                        subtitle="When you apply to sell a product, it'll show up on this page so you can track approvals and updates"
                        image="/assets/avatars/emptyApplication.svg"
                        altText="empty application"
                        buttonText="See Available Products"
                        buttonIcon={null}
                        buttonhref="/shop"
                        className="py-14"
                        subtitleClassName="w-[90%] md:w-[70%]"
                      />
                    ) : (
                      <div className="flex flex-col gap-6">
                        {processedApplication.map((application) => (
                          <ApplicationCard
                            key={application.applicationId}
                            application={application}
                          />
                        ))}
                      </div>
                    )}
                  </>
                </TabsContent>
                <TabsContent value="rejected">
                  <>
                    {rejectedApplication.length === 0 ? (
                      <EmptyPage
                        title="You haven't applied to sell anything yet"
                        subtitle="When you apply to sell a product, it'll show up on this page so you can track approvals and updates"
                        image="/assets/avatars/emptyApplication.svg"
                        altText="empty application"
                        buttonText="See Available Products"
                        buttonIcon={null}
                        buttonhref="/shop"
                        className="py-14"
                        subtitleClassName="w-[90%] md:w-[70%]"
                      />
                    ) : (
                      <div className="flex flex-col gap-6">
                        {rejectedApplication.map((application) => (
                          <ApplicationCard
                            key={application.applicationId}
                            application={application}
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

export default MyApplication;

interface ApplicationCardProps {
  application: IApplication;
}

export const ApplicationCard = ({ application }: ApplicationCardProps) => {
  const router = useRouter();
  const isMobile = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  return (
    <div className="bg-[#F5F5F5] rounded-2xl border border-[#0000001A] shadow-md shadow-[#0000000D] p-3 md:p-5 divide-y divide-[#0000001A] flex flex-col gap-4 font-poppins">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 text-black pb-4">
        <div className="flex items-start gap-3 ml:gap-4">
          <div className="bg-white rounded-2xl p-1 lg:p-2 flex items-center justify-center">
            <Image
              src={application.item.productImage}
              alt={application.item.productName}
              width={50}
              height={50}
              className="object-contain w-[80px] lg:w-[100px] h-[80px] lg:h-[100px]"
            />
          </div>
          <div className="text-[clamp(10px,1.2vw,14px)] font-light flex flex-col gap-3">
            <span className="flex items-center gap-3">
              <h2 className="text-[clamp(16px,1.8vw,20px)] font-medium line-clamp-1">
                {application.item.productName}
              </h2>
              <StatusView
                styleOption={true}
                classStyleName="text-[clamp(10px,1.2vw,13px)] px-2 md:px-4 py-1 rounded-full flex items-center gap-2"
                status={
                  application.applicationStatus === "PENDING"
                    ? "Pending"
                    : application.applicationStatus === "APPROVED"
                      ? "Approved"
                      : application.applicationStatus === "PROCESSED"
                        ? "Processed"
                        : application.applicationStatus === "REJECTED"
                          ? "Rejected"
                          : ""
                }
                icon={
                  application.applicationStatus === "PENDING" ? (
                    <ClockIcon className="w-4 h-5" />
                  ) : application.applicationStatus === "APPROVED" ? (
                    <CircleCheckIcon className="w-4 h-5" />
                  ) : application.applicationStatus === "PROCESSED" ? (
                    <CircleCheckIcon className="w-4 h-5" fill="#8A38F5" />
                  ) : application.applicationStatus === "REJECTED" ? (
                    <CancelIcon className="w-4 h-5" />
                  ) : null
                }
                orange="Pending"
                green="Approved"
                red="Rejected"
                purple="Processed"
              />
            </span>
            <p>{application.cropVariety}</p>
            <p>Application ID: {application.applicationId}</p>
          </div>
        </div>
        <div className="text-end hidden ml:block">
          <p className="text-[clamp(10px,1.2vw,14px)] font-light">
            Total Value
          </p>
          <h3 className="text-[clamp(14px,1.7vw,20px)] font-semibold text-[#03601A]">
            {application.totalValue}
          </h3>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pb-4 font-geologica">
        {[
          {
            title: "Quantity",
            value: `${application.quantityAvailable} ${capitalizeFirstLetter(application.packageMethod)}`,
          },
          {
            title: "Price per Unit",
            value: application.pricePerUnit,
          },
          {
            title: "Harvest Period",
            value: formatDate(application.harvestPeriod),
          },
          {
            title: "Package Method",
            value: capitalizeFirstLetter(application.packageMethod),
          },
        ].map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-[10px] bg-white rounded-[12px] p-3"
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
        {isMobile ? null : (
          <div className="flex items-center gap-4 text-black font-light divide-x divide-[#0000001A]">
            <div className="flex items-center gap-3 pr-4">
              <DeliveryTruckIcon className="w-5 h-5" />
              {DeliveryMethodOptions.find(
                (option) => option.optionValue === application.deliveryMethod,
              )?.optionTitle ?? application.deliveryMethod}
            </div>
            {(application.applicationStatus === "APPROVED" ||
              application.applicationStatus === "PROCESSED") && (
              <div className="flex items-center gap-3 pl-4">
                <DateIcon className="w-5 h-5" />
                <p>Delivery Date: {formatDate(application.deliveryDate)}</p>
              </div>
            )}
          </div>
        )}

        <PopNotification
          iconBgClassName="hidden"
          className={
            application.applicationStatus === "PENDING"
              ? "border-[#C09706] bg-[#F5A7211A]"
              : application.applicationStatus === "APPROVED"
                ? "border-[#03601A] bg-[#03601A0F]"
                : application.applicationStatus === "PROCESSED"
                  ? "border-[#8A38F5] bg-[#8A38F50F]"
                  : application.applicationStatus === "REJECTED"
                    ? "border-[#EA4435] bg-[#EA44350F]"
                    : ""
          }
          textContent={
            <p>
              <span
                className={`font-semibold mr-2 ${
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
                  ? "Submitted:"
                  : application.applicationStatus === "APPROVED"
                    ? "Approved:"
                    : application.applicationStatus === "PROCESSED"
                      ? "Delivered & Completed"
                      : application.applicationStatus === "REJECTED"
                        ? "Rejected:"
                        : ""}
              </span>
              {application.applicationStatus === "PENDING"
                ? `${application.submittedDate} • Your application is under review`
                : application.applicationStatus === "APPROVED"
                  ? `${application.approvedDate ?? "Nov 17, 2025"} • Please prepare for delivery on ${application.deliveryDate}`
                  : application.applicationStatus === "PROCESSED"
                    ? "• Payment processed"
                    : application.applicationStatus === "REJECTED"
                      ? `${application.rejectedDate ?? "Nov 17, 2025"} • Quality standards not met. Please review our quality guidelines.`
                      : ""}
            </p>
          }
        />

        <div className="flex items-center gap-5 justify-between">
          {isMobile ? (
            <div className="">
              <p className="text-[clamp(10px,1.2vw,14px)] font-light">
                Total Value
              </p>
              <h3 className="text-[clamp(14px,1.7vw,20px)] font-semibold text-[#03601A]">
                {application.totalValue}
              </h3>
            </div>
          ) : null}
          <Button
            variant="outline"
            size="lg"
            className="border-[0.5px] border-[#C09706] w-fit ml:w-full"
            onClick={() =>
              router.push(`/application/${application.applicationId}`)
            }
          >
            View Details
          </Button>
          {isMobile ? null : (
            <>
              {application.applicationStatus === "REJECTED" && (
                <Button
                  variant="default"
                  size="lg"
                  className="w-full"
                  onClick={() =>
                    router.push(`/sell-product/${application.item.productId}`)
                  }
                >
                  Reapply
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
