import { ReactNode } from "react";

export interface IProducts {
  productId: number;
  productImage: string;
  productName: string;
  unit: string;
  tagText: string;
  price: number;
  description: string;
  isWatchList: boolean;
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
  userName: string;
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
  userName: string;
  profilePicture: string;
  email: string;
  phoneNumber: string;
  addresses: {
    address: string;
  }[];
  isLoggedIn: boolean;
}
