"use client";

import { DrawerDialog } from "@/components/DrawerDialog/DrawerDialog";
import EmptyPage from "@/components/EmptyPage/EmptyPage";
import BankForm, { TypeBankFormSchema } from "@/components/Forms/BankForm";
import PageTitle from "@/components/PageTitle/PageTitle";
import Sidebar from "@/components/Sidebar/Sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { getUserData, updateUserData } from "@/hooks/getUserData";
import { CreditCardIcon, Delete2Icon, EditIcon } from "@/Icons";
import { cn } from "@/lib/utils";
import { IuserData } from "@/types";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";
import { useEffect, useState } from "react";

const AccountDetails = () => {
  const [userInfo, setUserInfo] = useState<IuserData | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [onEditAccount, setOnEditAccount] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);

  useEffect(() => {
    const data = getUserData();
    setUserInfo(data);
  }, []);

  const handleDefaultSelection = (index: number) => {
    if (!userInfo) return;
    const updatedAccounts = userInfo.bankDetails.map((account, i) => ({
      ...account,
      isPrimary: i === index,
    }));

    const updatedData = updateUserData({
      bankDetails: updatedAccounts,
    });

    setUserInfo(updatedData);
  };

  const handleAddNewAccountDetails = () => {
    setIsAddingNew(true);
    setOnEditAccount(true);
  };

  const handleEditAccount = (index: number) => {
    setSelectedIndex(index);
    setIsAddingNew(false);
    setOnEditAccount(true);
  };

  const handleAddAccount = (data: TypeBankFormSchema) => {
    if (!userInfo) return;
    const updatedAccounts = [...(userInfo.bankDetails ?? [])];

    const currentDate = new Date();

    if (isAddingNew) {
      updatedAccounts.push({
        ...data,
        isPrimary: false,
        dateAdded: formatDate(currentDate),
      });
    } else {
      updatedAccounts[selectedIndex] = {
        ...data,
        isPrimary: updatedAccounts[selectedIndex].isPrimary || false,
        dateAdded:
          updatedAccounts[selectedIndex].dateAdded || formatDate(currentDate),
      };
    }

    const updatedData = updateUserData({ bankDetails: updatedAccounts });
    setUserInfo(updatedData);
    setOnEditAccount(false);
    setIsAddingNew(false);
  };

  const handleDeleteAccount = (index: number) => {
    if (!userInfo) return;
    if (userInfo.bankDetails.length === 1) {
      alert("You must have at least one bank account");
      return;
    }

    const updatedAccounts = [...(userInfo.bankDetails ?? [])];
    const wasDefault = updatedAccounts[index].isPrimary;
    updatedAccounts.splice(index, 1);

    if (wasDefault && updatedAccounts.length > 0) {
      updatedAccounts[0].isPrimary = true;
    }

    const updatedData = updateUserData({
      bankDetails: updatedAccounts,
    });

    setUserInfo(updatedData);

    if (selectedIndex >= updatedAccounts.length) {
      setSelectedIndex(0);
    }
  };

  const getInitialData = () => {
    if (isAddingNew || !userInfo) {
      return {
        bankName: "",
        accountName: "",
        accountNumber: "",
        bvn: "",
      };
    }

    const account = userInfo.bankDetails[selectedIndex];
    return account
      ? {
          bankName: account.bankName,
          accountName: account.accountName,
          accountNumber: account.accountNumber,
          bvn: account.bvn,
        }
      : {
          bankName: "",
          accountName: "",
          accountNumber: "",
          bvn: "",
        };
  };

  return (
    <>
      <PageTitle
        title="Account Details"
        breadcrumb={
          <div>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Account Details</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        }
      />
      <div className="grid md:grid-cols-[auto_1fr] md:gap-5 md:mx-6 ml:mx-8 lg:mx-12 mt-6 md:mt-8">
        <div className="all-sides-shadow-xl rounded-2xl py-8 hidden md:block">
          <Sidebar />
        </div>
        <div className="font-geologica text-[#000000CC] all-sides-shadow-xl rounded-2xl">
          {userInfo === null ? null : userInfo.bankDetails.length === 0 ? (
            <div className="bg-[#F5F5F5] border border-[#0000001A] rounded-2xl flex items-center justify-center sm:my-3 md:my-8 mx-4 md:mx-10">
              <EmptyPage
                title="No Account Details Yet"
                subtitle="Add your bank account details so we can process payments, food savings, and loan deductions automatically."
                image="/assets/avatars/emptyBankAcct.svg"
                altText="empty bank account"
                buttonText="Add Account Details"
                buttonhref=""
                className="py-14"
                btnAction={handleAddNewAccountDetails}
                subtitleClassName="md:w-[70%] lg:w-[65%]"
              />
            </div>
          ) : (
            <div className="flex flex-col gap-8 mb-32">
              <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b md:border border-[#0000001A] rounded-t-2xl">
                <h2 className="text-[#333333] text-[clamp(16px,2.2vw,28px)] font-medium">
                  Account Details
                </h2>
                <Button
                  variant="default"
                  size="sm"
                  className="h-10"
                  onClick={handleAddNewAccountDetails}
                >
                  Add new Account
                </Button>
              </div>
              <div className="flex flex-col gap-6 px-4 md:px-6">
                {userInfo.bankDetails.map((account, index) => (
                  <div
                    key={index}
                    className={cn(
                      "grid lg:grid-cols-[1.2fr_auto_0.7fr] border border-[#0000001A] shadow shadow-[#0000000D] bg-[#F5F5F5] rounded-2xl divide-y md:divide-x divide-[#0000001A]",
                    )}
                  >
                    <div className="grid grid-cols-[auto_1fr] items-start lg:items-center gap-4 py-4 px-5 ">
                      <CreditCardIcon className="w-8 h-8" />
                      <div className="flex flex-col gap-2 md:gap-3">
                        <div className="flex items-center justify-between gap-4">
                          <h2 className="text-[clamp(16px,1.6vw,18px)]">
                            {account.bankName}
                          </h2>
                          {account.isPrimary ? (
                            <div className="bg-[#3333331A] text-[#333333] text-[clamp(12px,1.2vw,14px)] rounded-full px-3 py-1">
                              Primary
                            </div>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-[#C09706] text-[clamp(12px,1.2vw,14px)] hover:text-[#C09706]/80 font-light p-0 w-fit h-fit"
                              onClick={() => handleDefaultSelection(index)}
                            >
                              Set as primary
                            </Button>
                          )}
                        </div>
                        <div className="text-[#000000B2]">
                          <p className="text-[clamp(15px,1.5vw,17px)]">
                            {account.accountName}
                          </p>
                          <p className="text-[clamp(12px,1.2vw,14px)] font-light">
                            {account.accountNumber.slice(0, 5)}••••
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 divide-x divide-[#0000001A]">
                      <div className="flex flex-col gap-2 md:gap-3 py-4 px-5 justify-center">
                        <p className="text-[clamp(12px,1.4vw,15px)] font-extralight">
                          Bvn
                        </p>
                        <p className="text-[clamp(15px,1.6vw,18px)]">
                          •••••••{account.bvn.slice(-4)}
                        </p>
                      </div>

                      <div className="flex flex-col gap-2 md:gap-3 py-4 px-5 justify-center">
                        <p className="text-[clamp(12px,1.4vw,15px)] font-extralight">
                          Date Added
                        </p>
                        <p className="text-[clamp(15px,1.6vw,18px)]">
                          {account.dateAdded}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-row lg:flex-col lg:ml-auto gap-2 py-6 lg:py-4 px-5 items-end justify-center">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="bg-[#FFFFFF] hover:bg-[#FFFFFF]/80 flex items-center gap-2 font-light text-[#000000CC] h-10 w-full"
                        onClick={() => handleEditAccount(index)}
                      >
                        <EditIcon className="w-5 h-5" />
                        Edit
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="bg-[#FFFFFF] hover:bg-[#FFFFFF]/80 flex items-center gap-2 font-light text-[#E63946] h-10 w-full"
                        onClick={() => handleDeleteAccount(index)}
                      >
                        <Delete2Icon className="w-5 h-5" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <DrawerDialog
        open={onEditAccount}
        close={() => {
          setOnEditAccount(false);
          setIsAddingNew(false);
        }}
        size="md"
        title={isAddingNew ? "Add New Account" : "Edit Account"}
        contentCSS="pt-[20px] px-[30px]"
        max_height
      >
        <BankForm initialData={getInitialData()} onSubmit={handleAddAccount} />
      </DrawerDialog>
    </>
  );
};

export default AccountDetails;
