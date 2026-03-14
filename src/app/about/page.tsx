"use client";
import Campaigns from "@/components/Store/Campaigns";
import SubscriptionPlan from "@/components/Store/SubscriptionPlan";
import { useState } from "react";

export interface IStore {
  campaign: boolean;
  subscriptionPlan: boolean;
}

const defaultScreen: IStore = {
  campaign: true,
  subscriptionPlan: false,
};

const StoreSubscription = () => {
  const [displayedScreen, setDisplayedScreen] = useState<IStore>(defaultScreen);

  return (
    <div>
      {/* ── Nav Bar ── */}
      <nav className="fixed top-0 left-0 right-0 flex items-center justify-between bg-white shadow-sm px-4 py-3 font-semibold z-99">
        <span className="text-sm font-medium text-gray-700">Store</span>
        <div className="flex gap-6 text-sm text-gray-500">
          <span className="cursor-pointer hover:text-gray-800">
            Your Store Details ▾
          </span>
          <span className="cursor-pointer hover:text-gray-800">Help ▾</span>
        </div>
      </nav>

      {displayedScreen.campaign && (
        <Campaigns setDisplayedScreen={setDisplayedScreen} />
      )}

      {displayedScreen.subscriptionPlan && !displayedScreen.campaign && (
        <SubscriptionPlan setDisplayedScreen={setDisplayedScreen} />
      )}
    </div>
  );
};

export default StoreSubscription;
