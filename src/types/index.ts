export interface IProducts {
  productId: number;
  productImage: string;
  productName: string;
  unit: string;
  tagText: string;
  price: number;
  description: string;
  isWatchList: boolean;
  productDetails: string;
  bestUsedFor: string;
  storageTips: string;
  reviews: IReview[];
  famersDetails: IFarmerDetails;
  quantity?: number;
}

export interface IReview {
  reviewId: number;
  userId: number;
  userName: string;
  reviewDate: string;
  reviewText: string;
  totalRatings: number;
}

export interface IFarmerDetails {
  farmerId: number;
  farmerName: string;
  verificationStatus: string;
  description: string;
  farmerState: string;
  farmerCountry: string;
  yearJoined: number;
  totalReviews: number;
  totalRating: number;
  totalOrders: number;
  satisfactionRate: number;
}

export type CartItem = IProducts & { quantity: number };

export type WishlistItem = IProducts & { quantity: number };
