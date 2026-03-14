"use client";

import { CONFETTI_COLORS, SUBSCRIPTION_PLAN } from "./constant";
import { IStore } from "@/app/about/page";

type CampaignPageProps = {
  setDisplayedScreen: React.Dispatch<React.SetStateAction<IStore>>;
};

const CampaignPage = ({ setDisplayedScreen }: CampaignPageProps) => {
  const fmt = (n: number): string =>
    `₦${Number(n).toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;

  const netTotal: number =
    SUBSCRIPTION_PLAN.currentPlan.totalPerMonth +
    SUBSCRIPTION_PLAN.addons.reduce((sum, a) => sum + a.totalPerMonth, 0);

  const handleChangePlan = () => {
    setDisplayedScreen((prev) => ({
      ...prev,
      campaign: false,
      subscriptionPlan: true,
    }));
  };

  return (
    <div className=" bg-gray-100 relative text-gray-700 px-12">
      {SUBSCRIPTION_PLAN && (
        <div className="mt-12">
          {/* ── Yearly Promo Banner ── */}
          <div className="bg-white shadow-sm px-8 py-6 flex flex-col gap-6 mx-auto">
            <div className="relative overflow-hidden py-6">
              {[...Array(7)].map((_, i) => (
                <span
                  key={i}
                  className="absolute rounded-full opacity-60 pointer-events-none"
                  style={{
                    width: `${6 + (i % 4) * 2}px`,
                    height: `${6 + (i % 4) * 2}px`,
                    top: `${2 + (i % 2) * 20}%`,
                    left: `${(i * 3) % 100}%`,
                    backgroundColor:
                      CONFETTI_COLORS[i % CONFETTI_COLORS.length],
                  }}
                />
              ))}
              <div className="flex items-center gap-10 w-full">
                <p>
                  SUBSCRIBE YEARLY PLAN AND GET UP TO <span>12%</span> OF YOUR
                  SUBSCRIPTION VALUE AS WALLET CREDIT
                </p>
                <div className="text-white relative inline-block text-sm">
                  <p className="pb-3 px-6 bg-orange-500 [clip-path:polygon(20px_0,calc(100%-20px)_0,100%_100%,0_100%)]">
                    Go YEARLY &
                  </p>

                  <p className="absolute top-6 left-6 pb-2 px-8 bg-sky-400 whitespace-nowrap [clip-path:polygon(0_0,100%_0,80%_100%,20%_100%)]">
                    EARN CREDITS
                  </p>
                </div>
                <button className="bg-transparent cursor-pointer underline ml-auto mt-auto text-sm text-gray-600">
                  T&C APPLY
                </button>
              </div>
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className="absolute rounded-full opacity-60 pointer-events-none"
                  style={{
                    width: `${6 + (i % 4) * 2}px`,
                    height: `${6 + (i % 4) * 2}px`,
                    top: `${0 + (i % 2) * 20}%`,
                    right: `${(i * 3) % 100}%`,
                    backgroundColor:
                      CONFETTI_COLORS[i % CONFETTI_COLORS.length],
                  }}
                />
              ))}
            </div>

            <div className="flex flex-col w-full gap-3">
              <div className="flex items-center gap-5">
                <span className="relative w-8 h-8 rounded-[3px] bg-sky-500 flex items-center justify-center text-white shrink-0">
                  {/* Info icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                    className="w-6 h-6"
                    fill="white"
                  >
                    <path d="M272 112C272 85.5 293.5 64 320 64C346.5 64 368 85.5 368 112C368 138.5 346.5 160 320 160C293.5 160 272 138.5 272 112zM224 256C224 238.3 238.3 224 256 224L320 224C337.7 224 352 238.3 352 256L352 512L384 512C401.7 512 416 526.3 416 544C416 561.7 401.7 576 384 576L256 576C238.3 576 224 561.7 224 544C224 526.3 238.3 512 256 512L288 512L288 288L256 288C238.3 288 224 273.7 224 256z" />
                  </svg>

                  {/* Pointy bottom */}
                  <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-sky-500"></div>
                </span>

                <p className="text-base ">
                  Your Renewal Date is on{" "}
                  <span className="font-semibold">
                    {SUBSCRIPTION_PLAN.renewalDate}
                  </span>
                  , To Enjoy Uninterrupted Services, Please renew your
                  subscription.
                </p>
              </div>

              <button className="px-8 py-2 bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold rounded-full transition-colors mx-auto">
                Renew now
              </button>
            </div>
          </div>

          {/* ── Main Content ── */}
          <div className="mx-auto py-8 flex flex-col items-center">
            {/* Header */}

            <div className="flex items-center gap-3 w-full mb-12">
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  width="512"
                  height="512"
                  x="0"
                  y="0"
                  viewBox="0 0 682.667 682.667"
                  className="w-14 h-14"
                >
                  <g>
                    <defs>
                      <clipPath id="a" clipPathUnits="userSpaceOnUse">
                        <path
                          d="M0 512h512V0H0Z"
                          fill="#000000"
                          opacity="1"
                          data-original="#000000"
                        ></path>
                      </clipPath>
                    </defs>
                    <g
                      clipPath="url(#a)"
                      transform="matrix(1.33333 0 0 -1.33333 0 682.667)"
                    >
                      <path
                        d="M0 0c-40.921-34.892-81.391-63.759-123.625-82.477-48.026-21.285-98.323-28.045-147.47-27.334v-213.028c49.147.712 99.444-6.001 147.47-27.286 41.817-18.533 81.905-47.049 122.414-81.462"
                        transform="translate(420.095 487.978)"
                        fill="none"
                        stroke="#000000"
                        strokeWidth="30"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="22.926"
                        strokeDasharray="none"
                        strokeOpacity=""
                        data-original="#000000"
                      ></path>
                      <path
                        d="M0 0c33.046 0 60 101.074 60 225S33.046 450 0 450c-33.047 0-60-101.074-60-225S-33.047 0 0 0Z"
                        transform="translate(437 47)"
                        fill="none"
                        stroke="#000000"
                        strokeWidth="30"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="22.926"
                        strokeDasharray="none"
                        strokeOpacity=""
                        data-original="#000000"
                      ></path>
                      <path
                        d="M0 0c32.95-5.104 58.383-33.775 58.383-68.098 0-33.087-23.633-60.921-54.853-67.456"
                        transform="translate(380.617 340.206)"
                        fill="none"
                        stroke="#000000"
                        strokeWidth="30"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="22.926"
                        strokeDasharray="none"
                        strokeOpacity=""
                        data-original="#000000"
                      ></path>
                      <path
                        d="M0 0h-68c-36.352 0-66-29.648-66-66v-81c0-36.352 29.648-66 66-66H0Z"
                        transform="translate(149 377.926)"
                        fill="none"
                        stroke="#000000"
                        strokeWidth="30"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="22.926"
                        strokeDasharray="none"
                        strokeOpacity=""
                        data-original="#000000"
                      ></path>
                      <path
                        d="m0 0-40.276-117.696C-45.125-131.797-57.639-141-72.55-141H-74c-18.727 0-34 15.273-34 34V8.926"
                        transform="translate(212 156)"
                        fill="none"
                        stroke="#000000"
                        strokeWidth="30"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="22.926"
                        strokeDasharray="none"
                        strokeOpacity=""
                        data-original="#000000"
                      ></path>
                    </g>
                  </g>
                </svg>
                <h1 className="text-4xl font-medium text-gray-800">
                  Campaigns
                </h1>
              </div>
              <p className="text-base text-gray-600 mx-auto">
                Subscription ID: {SUBSCRIPTION_PLAN.subscriptionId}
              </p>
            </div>

            <div className="grid grid-cols-[2fr_1.5fr] gap-10 w-full">
              {/* ── Left Column ── */}
              <div className="flex flex-col gap-12">
                {/* Subscription Details Table */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-end justify-between">
                    <h2 className="text-lg font-semibold text-gray-800">
                      Subscription Details
                    </h2>
                    <button
                      onClick={handleChangePlan}
                      className="px-5 py-2 bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold rounded-full transition-colors shadow-sm"
                    >
                      Change Plan
                    </button>
                  </div>
                  <div className="bg-white border border-gray-300 rounded-sm overflow-hidden shadow-sm">
                    <table className="w-full text-base">
                      <thead>
                        <tr className=" bg-gray-100 font-semibold text-sm uppercase">
                          <th className="text-left px-5 py-3">Item</th>
                          <th className="text-left px-5 py-3">No. of Units</th>
                          <th className="text-right px-5 py-3">Total /Month</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-200">
                          <td className="px-5 py-3.5 ">
                            {SUBSCRIPTION_PLAN.currentPlan.name}
                          </td>
                          <td className="px-5 py-3.5">
                            {SUBSCRIPTION_PLAN.currentPlan.contacts.toLocaleString()}{" "}
                            contacts
                          </td>
                          <td className="px-5 py-3.5 text-right ">
                            {fmt(SUBSCRIPTION_PLAN.currentPlan.totalPerMonth)}
                          </td>
                        </tr>
                        {SUBSCRIPTION_PLAN.addons.map((addon, i) => (
                          <tr
                            key={i}
                            className={`border-b border-gray-100 ${
                              i === SUBSCRIPTION_PLAN.addons.length - 1
                                ? "border-b-0"
                                : ""
                            }`}
                          >
                            <td className="px-5 py-3.5 ">{addon.name}</td>
                            <td className="px-5 py-3.5">{addon.units}</td>
                            <td className="px-5 py-3.5 text-right">
                              ₦ {addon.totalPerMonth.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                        <tr className="border-t border-gray-200">
                          <td className="px-5 py-3" />
                          <td className="px-5 py-3 text-right font-semibold text-sm">
                            Net Total
                          </td>
                          <td className="px-5 py-3 text-right font-bold text-gray-800">
                            {fmt(netTotal)} *
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Nonrecurring Add-ons */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-800">
                      Nonrecurring Add-ons
                    </h2>
                    <button className="px-5 py-2 border border-gray-300 text-gray-600 text-sm rounded-full hover:bg-gray-50 transition-colors shadow-sm">
                      Buy More
                    </button>
                  </div>
                  <div className="bg-white rounded-sm border border-gray-300 overflow-hidden shadow-sm">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-100 font-semibold text-sm uppercase">
                          <th className="text-left px-5 py-3">Item</th>
                          <th className="text-left px-5 py-3">Unit Price</th>
                          <th className="text-left px-5 py-3">
                            Available Balance
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {SUBSCRIPTION_PLAN.nonrecurringAddons.map(
                          (addon, i) => (
                            <tr key={i}>
                              <td className="px-5 py-3.5 ">{addon.name}</td>
                              <td className="px-5 py-3.5">
                                ₦{addon.unitPrice.toFixed(2)} /credits
                              </td>
                              <td className="px-5 py-3.5 text-center">
                                {addon.availableBalance}
                              </td>
                            </tr>
                          ),
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* ── Right Column ── */}
              <div className="flex flex-col">
                <button className="px-5 py-2 bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold rounded-full transition-colors shadow-sm mr-auto mb-4">
                  Upgrade Add-Ons
                </button>

                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Next Payment
                  </h3>
                  <button className="text-sky-500 text-sm underline">
                    Payment History
                  </button>
                </div>

                <div className="bg-white rounded-[4px] shadow-sm">
                  <div className="flex items-start justify-between gap-2 p-5">
                    <div>
                      <p className="text-base font-semibold text-gray-800">
                        {SUBSCRIPTION_PLAN.nextPayment.date}
                      </p>
                      <p className="text-xs text-gray-500">
                        ({SUBSCRIPTION_PLAN.nextPayment.frequency})
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-sky-200  font-bold text-sm px-3 py-1 rounded-full whitespace-nowrap">
                        ₦{SUBSCRIPTION_PLAN.nextPayment.amount.toLocaleString()}{" "}
                        *
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        * Excluding Tax
                      </p>
                    </div>
                  </div>
                  <button className="w-full bg-sky-200 hover:bg-sky-200/80 py-3 flex items-center justify-center gap-2 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      width="512"
                      height="512"
                      x="0"
                      y="0"
                      viewBox="0 0 50 50"
                      className="w-8 h-8"
                    >
                      <g>
                        <path
                          d="M6 23.82V45c0 1.65 1.35 3 3 3h32c1.65 0 3-1.35 3-3V23.82c1.16-.41 2-1.51 2-2.82v-4c0-1.65-1.35-3-3-3h-6.7c.59-.33 1.14-.71 1.63-1.16 1.38-1.29 2.08-2.91 2.08-4.84s-1.47-6-6-6-7.51 6.21-9 9.99c-1.49-3.78-4.6-9.99-9-9.99s-6 4.04-6 6 .7 3.55 2.08 4.84c.48.45 1.04.83 1.63 1.16H7c-1.65 0-3 1.35-3 3v4c0 1.3.84 2.4 2 2.82zM8 45V24h12v22H9c-.55 0-1-.45-1-1zm13-29h.91c.6.03 1.14.04 1.6.04.79 0 1.31-.03 1.49-.04.18.01.7.04 1.49.04.46 0 1.01-.01 1.6-.04H29v6h-8zm1 30V24h6v22zm20-1c0 .55-.45 1-1 1H30V24h12zm2-28v4c0 .55-.45 1-1 1H31v-6h12c.55 0 1 .45 1 1zM34 4c3.76 0 4 3.96 4 4 0 1.36-.47 2.47-1.44 3.37-2.1 1.95-5.95 2.5-8.61 2.63h-1.56c1.3-3.65 4.26-10 7.62-10zM12 8s.24-4 4-4c3.36 0 6.32 6.35 7.62 10h-1.6c-2.66-.13-6.48-.68-8.57-2.63-.97-.9-1.44-2.01-1.44-3.37zm-6 9c0-.55.45-1 1-1h12v6H7c-.55 0-1-.45-1-1z"
                          fill="#0c6fa9"
                          opacity="1"
                          data-original="#000000"
                        ></path>
                      </g>
                    </svg>

                    <span className="text-sky-700 text-base font-semibold">
                      Move to yearly
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignPage;
