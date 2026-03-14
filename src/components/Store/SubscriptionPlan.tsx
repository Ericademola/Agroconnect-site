"use client";

import { IStore } from "@/app/about/page";
import { STEPS, SUBSCRIPTION_PLAN } from "./constant";
import { useState } from "react";
import { IPlanOption, ITier } from "./types";

type SubscriptionPlanProps = {
  setDisplayedScreen: React.Dispatch<React.SetStateAction<IStore>>;
};

const SubscriptionPlan = ({ setDisplayedScreen }: SubscriptionPlanProps) => {
  const plans: IPlanOption[] = SUBSCRIPTION_PLAN.plans;
  const currentPlanId: string = "standard";
  const currentContacts: number = SUBSCRIPTION_PLAN.currentPlan.contacts;

  const [step, setStep] = useState<number>(0);
  const [selectedPlanId, setSelectedPlanId] = useState<string>(currentPlanId);
  const [selectedContacts, setSelectedContacts] = useState<
    Record<string, number>
  >(
    Object.fromEntries(
      plans.map((p) => [
        p.id,
        p.id === currentPlanId ? currentContacts : p.tiers[0].contacts,
      ]),
    ),
  );

  const selectedPlan: IPlanOption | undefined = plans.find(
    (p) => p.id === selectedPlanId,
  );
  const selectedTier: ITier | undefined =
    selectedPlan?.tiers.find(
      (t) => t.contacts === selectedContacts[selectedPlanId],
    ) || selectedPlan?.tiers[0];

  const handleOnGoBack = () => {
    setDisplayedScreen((prev) => ({
      ...prev,
      subscriptionPlan: false,
      campaign: true,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-12">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-8">
          Manage your Zoho Campaigns Subscription
        </h1>

        {/* ── Stepper ── */}
        <div className="flex items-center justify-center mb-10">
          {STEPS.map((label, i) => (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center">
                <span
                  className={`mb-1 text-xs ${
                    i <= step ? "text-sky-600 font-medium" : "text-gray-400"
                  }`}
                >
                  {label}
                </span>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    i <= step
                      ? "bg-sky-500 border-sky-500"
                      : "bg-white border-gray-300"
                  }`}
                >
                  {i < step && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`h-px w-24 mt-4 mx-1 ${
                    i < step ? "bg-sky-500" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* ── Step 0: Select Plan ── */}
        {step === 0 && (
          <div className="flex flex-col">
            <button
              onClick={handleOnGoBack}
              className="mb-4 text-gray-400 hover:text-gray-700 leading-none border rounded-full h-8 w-8 p-2 flex items-center justify-center"
            >
              {`<`}
            </button>
            <div className="grid grid-cols-2 gap-5">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="bg-white rounded-[4px] border-[0.5px] py-5 shadow-xs flex flex-col"
                >
                  <h2 className="text-sky-500 font-bold text-xl text-center mb-12">
                    {plan.name}
                  </h2>
                  <p className="text-sm text-sky-300 font-medium text-center mb-3 tracking-wide border-t border-b border-gray-300 py-3 ">
                    {plan.tagline}
                  </p>
                  <ul className="mb-4  divide-y divide-gray-300 ">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 px-5 py-3">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="rounded-full"
                        >
                          <path
                            d="M16 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V16C0 16.5304 0.210714 17.0391 0.585786 17.4142C0.960859 17.7893 1.46957 18 2 18H16C16.5304 18 17.0391 17.7893 17.4142 17.4142C17.7893 17.0391 18 16.5304 18 16V2C18 1.46957 17.7893 0.960859 17.4142 0.585786C17.0391 0.210714 16.5304 0 16 0ZM7 14L2 9L3.41 7.59L7 11.17L14.59 3.58L16 5L7 14Z"
                            fill="#0EB26B"
                          />
                        </svg>

                        <span className="text-sm text-gray-700">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <span className="bg-gray-200 border border-gray-500 rounded-2xl px-3 mx-auto">
                    •••
                  </span>

                  <div className="bg-gray-50 mt-8 py-2">
                    <div className="grid grid-cols-2 text-sm font-semibold text-gray-500 mb-2 px-5">
                      <span>Contacts</span>
                      <span className="text-right">Price/month</span>
                    </div>
                    <div className="space-y-1 ">
                      {plan.tiers.map((tier) => {
                        const isSelected =
                          selectedContacts[plan.id] === tier.contacts &&
                          selectedPlanId === plan.id;
                        return (
                          <label
                            key={tier.contacts}
                            className={`flex items-center justify-between px-5 py-2 cursor-pointer transition-colors ${
                              isSelected ? "bg-green-100" : "hover:bg-gray-50"
                            }`}
                            onClick={() => {
                              setSelectedPlanId(plan.id);
                              setSelectedContacts((prev) => ({
                                ...prev,
                                [plan.id]: tier.contacts,
                              }));
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <input
                                type="radio"
                                name={`contacts-${plan.id}`}
                                checked={isSelected}
                                onChange={() => {}}
                                className="accent-black"
                              />
                              <div className="border-[1.5px] border-gray-500 rounded-sm w-[80px] px-2 flex items-center gap-2 justify-between">
                                <span className="text-sm text-gray-700">
                                  {tier.contacts.toLocaleString()}
                                </span>
                                <span className="text-gray-500 text-xs">▾</span>
                              </div>
                            </div>
                            <span className="text-sm text-gray-700">
                              ₦{tier.price.toLocaleString()}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                  <div className="px-5 mt-auto mx-auto">
                    <button
                      onClick={() => {
                        setSelectedPlanId(plan.id);
                        setStep(1);
                      }}
                      className="mt-4 w-fit py-2 px-4 bg-sky-400 hover:bg-sky-500 text-white text-sm font-semibold rounded-full transition-colors"
                    >
                      CHANGE
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-6 ml-auto">
              <button className="text-gray-500 text-sm underline hover:text-gray-700">
                Cancel Subscription
              </button>
            </div>
          </div>
        )}

        {/* ── Step 1: Confirm Order ── */}
        {step === 1 && selectedPlan && selectedTier && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 max-w-lg mx-auto">
            <h2 className="text-lg font-semibold text-gray-800 mb-6 text-center">
              Confirm Your Order
            </h2>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Plan</span>
                <span className="text-sky-600 font-semibold">
                  {selectedPlan.name}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Contacts</span>
                <span>{selectedTier.contacts.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Price / Month</span>
                <span className="font-semibold">
                  ₦{selectedTier.price.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="font-semibold text-gray-800">Total</span>
                <span className="font-bold text-gray-800">
                  ₦{selectedTier.price.toLocaleString()} *
                </span>
              </div>
              <p className="text-xs text-gray-400">* Excluding Tax</p>
            </div>
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setStep(0)}
                className="flex-1 py-2 border border-gray-300 text-gray-600 text-sm rounded-full hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-2 bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold rounded-full transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        )}

        {/* ── Step 2: Confirmation ── */}
        {step === 2 && selectedPlan && selectedTier && (
          <div className="bg-white rounded-xl border border-gray-200 p-10 max-w-lg mx-auto text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Plan Updated!
            </h2>
            <p className="text-sm text-gray-500 mb-1">
              You are now on the{" "}
              <span className="font-semibold text-sky-600">
                {selectedPlan.name}
              </span>{" "}
              plan.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              {selectedTier.contacts.toLocaleString()} contacts · ₦
              {selectedTier.price.toLocaleString()} / month
            </p>
            <button
              onClick={handleOnGoBack}
              className="px-8 py-2 bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold rounded-full transition-colors"
            >
              Back to Campaigns
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionPlan;
