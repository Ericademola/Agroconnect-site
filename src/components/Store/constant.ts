import { ISubscriptionPlan } from "./types";

export const STEPS: string[] = ["Change Plan", "Confirm Order", "Confirmation"];

export const CONFETTI_COLORS: string[] = [
  "#f87171",
  "#34d399",
  "#60a5fa",
  "#fbbf24",
  "#a78bfa",
  "#f472b6",
];

export const SUBSCRIPTION_PLAN: ISubscriptionPlan = {
  subscriptionId: "RPCW2004718994943",
  renewalDate: "15 Jan 2026",
  currentPlan: {
    name: "Standard Plan",
    contacts: 13000,
    totalPerMonth: 43120.0,
  },
  addons: [
    { name: "SMS Credits Add-on", units: "Not Opted", totalPerMonth: 0.0 },
    {
      name: "US/Canada Long code Add-on",
      units: "Not Opted",
      totalPerMonth: 0.0,
    },
  ],
  nextPayment: {
    date: "15 Jan 2026",
    frequency: "Monthly",
    amount: 43120,
  },
  nonrecurringAddons: [
    {
      name: "Litmus Email Preview Credits Add-On",
      unitPrice: 885.5,
      availableBalance: 0,
    },
  ],
  plans: [
    {
      id: "standard",
      name: "STANDARD",
      tagline: "FEATURES FROM FOREVER-FREE +",
      features: [
        "Up to 100k contacts",
        "Unlimited emails",
        "10 users",
        "Basic segmentation",
        "Advanced email templates",
        "Basic drag-and-drop workflows",
      ],
      tiers: [
        { contacts: 500, price: 3080 },
        { contacts: 2500, price: 13080 },
        { contacts: 5000, price: 23870 },
        { contacts: 13000, price: 43120 },
        { contacts: 25000, price: 66220 },
        { contacts: 50000, price: 106260 },
        { contacts: 100000, price: 186340 },
      ],
    },
    {
      id: "professional",
      name: "PROFESSIONAL",
      tagline: "FEATURES FROM STANDARD +",
      features: [
        "More than 100k contacts",
        "Unlimited emails",
        "20 users",
        "Advanced segmentation",
        "Contact scoring and tags",
        "Advanced drag-and-drop workflows",
      ],
      tiers: [
        { contacts: 500, price: 4620 },
        { contacts: 2500, price: 22330 },
        { contacts: 5000, price: 40040 },
        { contacts: 10000, price: 62370 },
        { contacts: 25000, price: 110880 },
        { contacts: 50000, price: 177100 },
        { contacts: 100000, price: 310310 },
        { contacts: 200000, price: 575960 },
        { contacts: 300000, price: 796950 },
        { contacts: 400000, price: 930160 },
        { contacts: 500000, price: 1082600 },
      ],
    },
  ],
};
