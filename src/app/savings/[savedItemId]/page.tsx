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
// import Image from "next/image";
import { Button } from "@/components/ui/button";
// import { capitalizeFirstLetter } from "@/utils/formatText";
import {
  calculateTargetDate,
  getSavedPlanById,
  ISavedItem,
  updateSavedPlan,
} from "@/hooks/getSavings";
import { GiftIcon, LeftIcon } from "@/Icons";
import PopNotification from "@/components/PopNotification/PopNotification";

export default function SavedPlanDetails() {
  const params = useParams();
  const router = useRouter();
  const [savedPlan, setSavedPlan] = useState<ISavedItem | null>(null);

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
        <div className="flex flex-col gap-5 md:gap-6 lg:gap-8 font-geologica text-[#000000CC] all-sides-shadow-xl rounded-2xl md:px-4 lg:px-6 md:pb-10 mb-16 md:py-5">
          {savedPlan.saveStatus !== "REDEEMED" && (
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
                  <Button variant="default" size="sm" className="h-10 w-fit">
                    Change Product
                  </Button>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col gap-[30px] text-[#000000CC]">
            <div className="grid grid-cols-2 md:grid-cols-4 items-center justify-between gap-2 md:gap-5">
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
                  className="bg-white border border-[#0000001A] shadow-sm rounded-[10px] md:rounded-2xl px-1 md:px-3 py-3 md:py-4 flex flex-col gap-2"
                >
                  <h4 className="text-[clamp(10px,1.4vw,15px)] font-extralight">
                    {item.title}
                  </h4>
                  <p
                    className={`text-[clamp(14px,2.2vw,20px)] ${item.title === "Saved" ? "text-[#03601A] font-medium" : "text-[#000000CC] font-normal"} `}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
            <div className="bg-[#F5F5F5] rounded-2xl shadow-xs px-12 py-8 grid grid-cols-2 gap-6 md:gap-10 gap-x-2">
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
                  <div className="text-[clamp(14px,2.2vw,20px)]">
                    {item.title === "Auto-Debit" ? (
                      <Button
                        variant="ghost"
                        onClick={handleToggleAutoDebit}
                        className={`p-0 hover:bg-transparent w-fit h-fit text-[clamp(14px,2.2vw,20px)] ${
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
            </div>
            <div className="text-[clamp(14px,2.2vw,20px)] rounded-2xl border-[0.5px] border-[#0000001A] px-6 py-5 ">
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
                  <p className="text-black font-medium">Almost There! 🎉</p>
                  <p>
                    {`Just ₦${remainingAmount.toLocaleString()} away! Complete to get ₦${cashBack} cashback for your next purchase.`}
                  </p>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}

// "use client";
// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import PageTitle from "@/components/PageTitle/PageTitle";
// import {
//   Breadcrumb,
//   BreadcrumbList,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbSeparator,
//   BreadcrumbPage,
// } from "@/components/ui/breadcrumb";
// import Link from "next/link";
// import Sidebar from "@/components/Sidebar/Sidebar";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { capitalizeFirstLetter } from "@/utils/formatText";
// import { getSavedPlanById, ISavedItem } from "@/hooks/getSavings";
// import { LeftIcon } from "@/Icons";

// // Helper function to calculate target date
// const calculateTargetDate = (createdAt: string, duration: string): string => {
//   const createdDate = new Date(createdAt);
//   const targetDate = new Date(createdDate);

//   // Extract number from duration string (e.g., "3 months" -> 3, "1 month" -> 1)
//   const durationMatch = duration.match(/(\d+)/);
//   const durationNumber = durationMatch ? parseInt(durationMatch[1]) : 1;

//   // Add months to created date
//   targetDate.setMonth(targetDate.getMonth() + durationNumber);

//   return targetDate.toLocaleDateString("en-US", {
//     month: "short",
//     day: "numeric",
//     year: "numeric",
//   });
// };

// export default function SavedPlanDetails() {
//   const params = useParams();
//   const router = useRouter();
//   const [savedPlan, setSavedPlan] = useState<ISavedItem | null>(null);

//   useEffect(() => {
//     if (params.savedItemId) {
//       const savedItem = getSavedPlanById(params.savedItemId as string);
//       console.log("Found saved plan:", savedItem); // Debug log
//       setSavedPlan(savedItem || null);
//     }
//   }, [params.savedItemId]);

//   if (!savedPlan) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 font-geologica">
//         <p className="text-[#000000B2] text-lg">Saved plan not found</p>
//         <Button onClick={() => router.push("/savings")} size="lg">
//           Back to Savings
//         </Button>
//       </div>
//     );
//   }

//   // Use targetDate from saved plan or calculate it as fallback
//   const targetDate =
//     savedPlan.targetDate ||
//     calculateTargetDate(savedPlan.createdAt, savedPlan.planDuration);
//   const remainingAmount = savedPlan.goalAmount - savedPlan.currentAmountSaved;
//   const progressPercentage =
//     savedPlan.goalAmount > 0
//       ? (savedPlan.currentAmountSaved / savedPlan.goalAmount) * 100
//       : 0;

//   return (
//     <>
//       <PageTitle
//         title="Food Savings"
//         breadcrumb={
//           <Breadcrumb>
//             <BreadcrumbList>
//               <BreadcrumbItem>
//                 <BreadcrumbLink asChild>
//                   <Link href="/">Home</Link>
//                 </BreadcrumbLink>
//               </BreadcrumbItem>
//               <BreadcrumbSeparator />
//               <BreadcrumbItem>
//                 <BreadcrumbPage>Food Savings</BreadcrumbPage>
//               </BreadcrumbItem>
//             </BreadcrumbList>
//           </Breadcrumb>
//         }
//       />

//       <div className="grid md:grid-cols-[auto_1fr] items-start md:gap-5 mx-4 sm:mx-5 md:mx-6 ml:mx-8 lg:mx-12 mt-6 md:mt-8 mb-16">
//         <div className="all-sides-shadow-xl rounded-2xl py-8 hidden md:block">
//           <Sidebar />
//         </div>

//         <div className="flex flex-col gap-5 md:gap-6 lg:gap-8 font-geologica text-[#000000CC] all-sides-shadow-xl rounded-2xl md:px-4 lg:px-6 py-6 md:py-8">
//           {/* Back Button and Status */}
//           <div className="flex items-center justify-between px-4 md:px-0">
//             <Button
//               variant="ghost"
//               onClick={() => router.push("/savings")}
//               className="flex items-center gap-2 p-0 hover:bg-transparent"
//             >
//               <LeftIcon className="w-5 h-5" />
//               <p className="text-[clamp(14px,1.6vw,18px)] text-black font-poppins">
//                 Back to Savings
//               </p>
//             </Button>

//             <span
//               className={`px-4 py-2 rounded-full text-sm font-medium ${
//                 savedPlan.saveStatus === "ACTIVE"
//                   ? "bg-blue-100 text-blue-700"
//                   : savedPlan.saveStatus === "COMPLETED"
//                     ? "bg-green-100 text-green-700"
//                     : "bg-purple-100 text-purple-700"
//               }`}
//             >
//               {capitalizeFirstLetter(savedPlan.saveStatus)}
//             </span>
//           </div>

//           {/* Plan Statistics */}
//           <div className="px-4 md:px-0">
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
//               {[
//                 {
//                   title: "Goal Amount",
//                   value: `₦${savedPlan.goalAmount.toLocaleString()}`,
//                   color: "text-green-700",
//                 },
//                 {
//                   title: "Amount Saved",
//                   value: `₦${savedPlan.currentAmountSaved.toLocaleString()}`,
//                   color: "text-blue-700",
//                 },
//                 {
//                   title: "Remaining",
//                   value: `₦${remainingAmount.toLocaleString()}`,
//                   color: "text-orange-700",
//                 },
//                 {
//                   title: "Target Date",
//                   value: targetDate,
//                   color: "text-purple-700",
//                 },
//               ].map((item, index) => (
//                 <div
//                   key={index}
//                   className="bg-white border border-[#0000001A] shadow-md rounded-[10px] md:rounded-2xl px-3 md:px-4 py-3 md:py-4 flex flex-col gap-2"
//                 >
//                   <h4 className="text-[clamp(10px,1.2vw,14px)] font-light text-gray-600">
//                     {item.title}
//                   </h4>
//                   <p
//                     className={`text-[clamp(14px,1.8vw,20px)] font-bold ${item.color}`}
//                   >
//                     {item.value}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Progress Bar */}
//           <div className="px-4 md:px-0">
//             <div className="bg-gray-100 rounded-lg p-4">
//               <div className="flex justify-between mb-2">
//                 <span className="text-sm text-gray-600">Progress</span>
//                 <span className="text-sm font-semibold">
//                   {progressPercentage.toFixed(0)}%
//                 </span>
//               </div>
//               <div className="w-full bg-gray-300 rounded-full h-3">
//                 <div
//                   className="bg-green-600 h-3 rounded-full transition-all duration-300"
//                   style={{ width: `${progressPercentage}%` }}
//                 ></div>
//               </div>
//             </div>
//           </div>

//           {/* Plan Details */}
//           <div className="px-4 md:px-0">
//             <h3 className="text-[clamp(16px,1.8vw,20px)] font-semibold mb-4">
//               Plan Details
//             </h3>
//             <div className="bg-gray-50 rounded-2xl p-4 grid md:grid-cols-2 gap-4">
//               <div>
//                 <p className="text-sm text-gray-600 mb-1">Duration</p>
//                 <p className="font-medium">{savedPlan.planDuration}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600 mb-1">Payment Interval</p>
//                 <p className="font-medium">{savedPlan.paymentInterval}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600 mb-1">Next Payment Date</p>
//                 <p className="font-medium">{savedPlan.nextPaymentDate}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600 mb-1">Started On</p>
//                 <p className="font-medium">
//                   {new Date(savedPlan.createdAt).toLocaleDateString("en-US", {
//                     month: "short",
//                     day: "numeric",
//                     year: "numeric",
//                   })}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Items List */}
//           <div className="px-4 md:px-0">
//             <h3 className="text-[clamp(16px,1.8vw,20px)] font-semibold mb-4">
//               Items in This Plan ({savedPlan.items.length})
//             </h3>
//             <div className="flex flex-col gap-3">
//               {savedPlan.items.map((item, index) => {
//                 const addOnsTotal =
//                   item.addOns?.reduce((sum, addOn) => sum + addOn.price, 0) ??
//                   0;
//                 const itemTotal = (item.price + addOnsTotal) * item.quantity;

//                 return (
//                   <div
//                     key={`${item.productId}-${index}`}
//                     className="bg-white border border-[#0000001A] rounded-2xl p-4 flex gap-4"
//                   >
//                     <div className="flex-shrink-0">
//                       <Image
//                         src={item.productImage}
//                         alt={item.productName}
//                         width={80}
//                         height={80}
//                         className="object-contain w-[60px] h-[60px] md:w-[80px] md:h-[80px] rounded-lg"
//                       />
//                     </div>
//                     <div className="flex-1">
//                       <h4 className="font-semibold text-[clamp(14px,1.6vw,16px)] mb-2">
//                         {item.productName} ({item.unit})
//                       </h4>
//                       <div className="flex flex-wrap gap-3 text-sm text-gray-600">
//                         <p>
//                           Qty:{" "}
//                           <span className="text-black font-medium">
//                             {item.quantity}
//                           </span>
//                         </p>
//                         <p>
//                           Price:{" "}
//                           <span className="text-black font-medium">
//                             ₦{item.price.toLocaleString()}
//                           </span>
//                         </p>
//                       </div>
//                       {item.addOns && item.addOns.length > 0 && (
//                         <div className="mt-2">
//                           <p className="text-xs text-gray-500 mb-1">Add-ons:</p>
//                           <div className="flex flex-wrap gap-1">
//                             {item.addOns.map((addOn, idx) => (
//                               <span
//                                 key={idx}
//                                 className="text-xs bg-gray-100 px-2 py-1 rounded"
//                               >
//                                 {addOn.title} (+₦{addOn.price.toLocaleString()})
//                               </span>
//                             ))}
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                     <div className="text-right flex-shrink-0">
//                       <p className="text-xs text-gray-500 mb-1">Subtotal</p>
//                       <p className="font-bold text-[clamp(14px,1.6vw,18px)]">
//                         ₦{itemTotal.toLocaleString()}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Action Buttons */}
//           {savedPlan.saveStatus === "ACTIVE" && (
//             <div className="px-4 md:px-0 flex gap-3">
//               <Button variant="default" size="lg" className="flex-1">
//                 Add Money
//               </Button>
//               <Button variant="outline" size="lg" className="flex-1">
//                 View History
//               </Button>
//             </div>
//           )}

//           {savedPlan.saveStatus === "COMPLETED" && (
//             <div className="px-4 md:px-0">
//               <Button variant="default" size="lg" className="w-full">
//                 Redeem Items
//               </Button>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }
