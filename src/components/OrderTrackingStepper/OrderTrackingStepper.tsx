"use client";

import React from "react";
import { Order } from "@/hooks/getOrders";

interface DeliveryStep {
  title: string;
  description: string;
  date: string;
  time: string;
  icon: React.ReactNode;
  status: Order["deliveryStatus"];
}

interface OrderTrackingStepperProps {
  order: Order;
  steps: DeliveryStep[];
  currentStepIndex?: number;
}

const OrderTrackingStepper = ({
  order,
  steps,
  currentStepIndex: overrideStepIndex,
}: OrderTrackingStepperProps) => {
  const getCurrentStepIndex = () => {
    const statusMap: Record<NonNullable<Order["deliveryStatus"]>, number> = {
      "ORDER PLACED": 0,
      CONFIRMED: 1,
      PACKED: 2,
      DISPATCHED: 3,
      DELIVERED: 4,
    };
    return order.deliveryStatus ? statusMap[order.deliveryStatus] : 0;
  };

  const currentStepIndex =
    overrideStepIndex !== undefined ? overrideStepIndex : getCurrentStepIndex();

  const getStepStatus = (index: number) => {
    if (index < currentStepIndex) return "completed";
    if (index === currentStepIndex) return "active";
    return "pending";
  };

  const getIconBgColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-[#03601A] border-[#03601A]";
      case "active":
        return "bg-[#C09706] border-[#C09706]";
      case "pending":
        return "bg-[#929292] border-[#C2C2C2BD]";
      default:
        return "bg-[#929292] border-[#C2C2C2BD]";
    }
  };

  const completedPercentage =
    currentStepIndex > 0 ? (currentStepIndex / (steps.length - 1)) * 100 : 0;

  // Active (yellow): from current step to next step
  const activePercentage =
    currentStepIndex < steps.length - 1
      ? ((currentStepIndex + 1) / (steps.length - 1)) * 100
      : 100;

  return (
    <div className="w-full rounded-2xl border-[0.5px] border-[#0000001A] py-6 ml:py-8 px-4 ml:px-6 all-sides-shadow-xl font-poppins">
      <div className="relative max-w-7xl mx-auto">
        {/* Desktop Progress Line */}
        <div className="absolute top-[90px] lg:top-[100px] left-[8%] right-[8%] h-[3px] bg-[#C2C2C2BD] hidden ml:block z-0">
          {/* Green line for completed steps (from start through current step) */}
          {currentStepIndex >= 0 && (
            <div
              className="absolute top-0 left-0 h-full bg-[#03601A] transition-all duration-500 ease-in-out z-10"
              style={{
                width: `${completedPercentage}%`,
              }}
            />
          )}

          {/* Yellow line from current step to next step */}
          {currentStepIndex < steps.length - 1 && (
            <div
              className="absolute top-0 h-full bg-[#C09706] transition-all duration-500 ease-in-out z-20"
              style={{
                left: `${completedPercentage}%`,
                width: `${activePercentage - completedPercentage}%`,
              }}
            />
          )}
        </div>

        {/* Steps Container */}
        <div className="flex flex-col ml:flex-row justify-between items-start ml:items-center gap-6 ml:gap-2">
          {steps.map((step, index) => {
            const stepStatus = getStepStatus(index);
            const isLastStep = index === steps.length - 1;

            return (
              <div
                key={index}
                className="flex flex-row ml:flex-col items-start ml:items-center text-center relative z-10 flex-1 gap-4 ml:gap-0 w-full ml:w-auto"
              >
                {/* Mobile Vertical Connector Line */}
                {!isLastStep && (
                  <div className="absolute left-[20px] top-[40px] w-[3px] h-[calc(100%+1.5rem)] bg-[#C2C2C2BD] ml:hidden z-0">
                    {stepStatus === "completed" && (
                      <div className="absolute top-0 left-0 w-full bg-[#03601A] h-full transition-all duration-300" />
                    )}
                    {stepStatus === "active" && (
                      <div className="absolute top-0 left-0 w-full bg-[#C09706] h-full transition-all duration-300" />
                    )}
                  </div>
                )}

                <div className="flex flex-col items-center ml:contents shrink-0">
                  {/* Title and Description - Desktop Only */}
                  <div className="hidden ml:flex ml:flex-col ml:items-center mb-4">
                    <h3 className="text-[clamp(13px,1.4vw,16px)] font-medium text-black mb-1">
                      {step.title}
                    </h3>
                    <p className="text-[clamp(9px,0.9vw,11px)] text-[#00000099] max-w-[140px] font-light leading-tight">
                      {step.description}
                    </p>
                  </div>

                  {/* Icon Circle */}
                  <div
                    className={`w-[40px] h-[40px] ml:w-[50px] ml:h-[50px] lg:w-[60px] lg:h-[60px] z-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${getIconBgColor(
                      stepStatus,
                    )} mb-0 ml:mb-4`}
                  >
                    <div className="text-white [&>svg]:w-5 [&>svg]:h-5 ml:[&>svg]:w-6 ml:[&>svg]:h-6">
                      {step.icon}
                    </div>
                  </div>

                  {/* Date and Time - Desktop Only */}
                  <div className="hidden ml:flex ml:flex-col ml:items-center text-[clamp(9px,0.9vw,11px)] text-[#00000099]">
                    <p className="font-medium">{step.date}</p>
                    <p className="font-light">{step.time}</p>
                  </div>
                </div>

                {/* Title, Description, Date and Time - Mobile Only */}
                <div className="flex-1 text-left ml:hidden">
                  <h3 className="text-sm font-medium text-black mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#00000099] mb-2 font-light">
                    {step.description}
                  </p>
                  <div className="text-xs text-[#00000099]">
                    <p className="font-medium">{step.date}</p>
                    <p className="font-light">{step.time}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingStepper;
