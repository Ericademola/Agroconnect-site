import { IAddresses, IFarmProducts } from "@/types";

export interface IApplication {
  applicationId: string;
  item: IFarmProducts;
  applicationStatus: "PENDING" | "APPROVED" | "PROCESSED" | "REJECTED";
  totalValue: string;
  quantityAvailable: number;
  cropVariety: string;
  pricePerUnit: string;
  harvestPeriod: Date;
  packageMethod: string;
  deliveryMethod: string;
  deliveryDate: Date;
  description: string | undefined;
  farmAddress: IAddresses | undefined;
  emergancyContact: string;
  submittedDate: string;
  approvedDate: string | null;
  paymentDate: string | null;
  rejectedDate: string | null;
}

const APPLICATION_KEY = "Applications";

// Save new apllication to localStorage
export const saveApplication = (application: IApplication): void => {
  const applications = getApplications();
  applications.unshift(application);
  localStorage.setItem(APPLICATION_KEY, JSON.stringify(applications));
};

// Get all apllications from localStorage
export const getApplications = (): IApplication[] => {
  const stored = localStorage.getItem(APPLICATION_KEY);
  return stored ? JSON.parse(stored) : [];
};

// Get apllication by ID
export const getApplicationById = (
  applicationId: string,
): IApplication | undefined => {
  const applications = getApplications();
  return applications.find(
    (application) => application.applicationId === applicationId,
  );
};

// Update apllication status
export const updateApplicationStatus = (
  applicationId: string,
  status: IApplication["applicationStatus"],
): void => {
  const applications = getApplications();
  const applicationIndex = applications.findIndex(
    (application) => application.applicationId === applicationId,
  );

  if (applicationIndex !== -1) {
    applications[applicationIndex].applicationStatus = status;
    localStorage.setItem(APPLICATION_KEY, JSON.stringify(applications));
  }
};

// Clear all apllications
export const clearApplications = (): void => {
  localStorage.removeItem(APPLICATION_KEY);
};
