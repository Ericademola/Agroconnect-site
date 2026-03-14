// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

export interface IPlan {
  name: string;
  contacts: number;
  totalPerMonth: number;
}

export interface IAddon {
  name: string;
  units: string;
  totalPerMonth: number;
}

export interface INextPayment {
  date: string;
  frequency: string;
  amount: number;
}

export interface INonrecurringAddon {
  name: string;
  unitPrice: number;
  availableBalance: number;
}

export interface ITier {
  contacts: number;
  price: number;
}

export interface IPlanOption {
  id: string;
  name: string;
  tagline: string;
  features: string[];
  tiers: ITier[];
}

export interface ISubscriptionPlan {
  subscriptionId: string;
  renewalDate: string;
  currentPlan: {
    name: string;
    contacts: number;
    totalPerMonth: number;
  };
  addons: { name: string; units: string; totalPerMonth: number }[];
  nextPayment: {
    date: string;
    frequency: string;
    amount: number;
  };
  nonrecurringAddons: {
    name: string;
    unitPrice: number;
    availableBalance: number;
  }[];
  plans: {
    id: string;
    name: string;
    tagline: string;
    features: string[];
    tiers: {
      contacts: number;
      price: number;
    }[];
  }[];
}
