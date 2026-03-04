import { ReactNode } from "react";

export interface IProducts {
  productId: number;
  productImage: string;
  productName: string;
  unit: string;
  tagText: string;
  price: number;
  description: string;
  productDetailImages: string[];
  productDetails: string;
  bestUsedFor: string;
  storageTips: string;
  reviews: IReview[];
  famersDetails: IFarmerDetails;
  productAverageRating: number;
  addOns: IAddOns[];
  quantity?: number;
}

export interface IReview {
  reviewId: number;
  userId: number;
  userFullName: string;
  reviewDate: string;
  reviewText: string;
  rate: number;
}

export interface IFarmerDetails {
  farmerId: number;
  farmerName: string;
  farmerProfilePic: string;
  verificationStatus: string;
  description: string;
  farmerState: string;
  farmerCountry: string;
  yearJoined: number;
  totalReviews: number;
  farmerAverageRating: number;
  totalOrders: number;
  satisfactionRate: number;
}

export interface IAddOns {
  title: string;
  price: number;
}

export type CartItem = IProducts & { quantity: number };

export type WishlistItem = IProducts & { quantity: number };

export interface IPaymentMethod {
  methodName: string;
  description: string;
  icon: ReactNode | string;
  value: string;
}

export interface IuserData {
  userId: number;
  userFullName: string;
  userName: string;
  profilePicture: string;
  email: string;
  phoneNumber: string;
  country: string;
  state: string;
  city: string;
  accountType: string[];
  isLoggedIn: boolean;
  dateJoined: string;
  wishlistItems: number;
  myCashback: string;
  deliveryAddresses: IAddresses[];
  bankDetails: IBankDetails[];
  isActiveLoan: boolean;
  userPassword: string;
  isFarmerDetails: IsFarmerDetails;
}

export interface IAddresses {
  id: number;
  fullName: string;
  phoneNumber: string;
  state: string;
  city: string;
  fullAddress: string;
  houseNumber?: string;
  area?: string;
  addtionalInfo?: string;
  isDefault: boolean;
  farmLongitude?: string;
  farmLatitude?: string;
}

export interface IBankDetails {
  id: number;
  bankName: string;
  accountName: string;
  accountNumber: string;
  bvn: string;
  isPrimary: boolean;
  dateAdded: string;
}

export interface IFarmProducts {
  productId: number;
  productImage: string;
  productName: string;
  unit: string;
  tagText: string;
  price: number;
  demandLevel: string;
  supplyStatus: string;
  priceRate: string;
  priceRateType: string;
  marketTrend: string;
  season: string;
  sellersCount: number;
  delivery: string;
  marketFocast: string;
  quantity?: number;
}

export interface IWatchlistItem extends IFarmProducts {
  quantity: number;
  dateAdded: string;
}

export interface IsFarmerDetails {
  farmName: string;
  farmAddress: IAddresses[];
  farmLongitude: string;
  farmLatitude: string;
  farmEmail: string;
  farmPhoneNumber: string;
  farmProducts: string[];
  farmerProfilePicture: string;
  farmType: string[];
}

export interface IByProducts {
  productId: number;
  productImage: string;
  productName: string;
  unit: string;
  tagText: string;
  price: number;
  quantity?: number;
}
