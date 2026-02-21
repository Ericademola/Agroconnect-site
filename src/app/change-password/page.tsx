"use client";

import { DrawerDialog } from "@/components/DrawerDialog/DrawerDialog";
import ChangePasswordForm from "@/components/Forms/ChangePasswordForm";
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
import { getUserData, updateUserData } from "@/hooks/getUserData";
import { IuserData } from "@/types";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ResetMethod } from "../login/page";
import { CloseIcon } from "@/Icons";
import ResetAuthCards from "@/components/ResetAuthCards/ResetAuthCards";
import ResetPasswordViaEmailForm, {
  ResetPasswordViaPhoneNumberForm,
} from "@/components/Forms/ResetPasswordForm";
import VerificationCodeInput from "@/components/Forms/VerificationCodeInput";
import CreateNewPasswordForm from "@/components/Forms/CreateNewPasswordForm";

const ChangePassword = () => {
  const [userInfo, setUserInfo] = useState<IuserData | null>(null);
  const [isShowForgotPassWord, setIsShowForgotPassWord] = useState(false);
  const [resetMethod, setResetMethod] = useState<ResetMethod>("email");
  const [isShowVerify, setIsShowVerify] = useState(false);
  const [loadingVerifyBtn, setLoadingVerifyBtn] = useState(false);
  const [isShowchangePassword, setIsShowChangePassword] = useState(false);

  useEffect(() => {
    const data = getUserData();
    setUserInfo(data);
  }, []);

  const handlePasswordUpdate = (newPassword: string) => {
    updateUserData({ userPassword: newPassword });
  };

  const handleCloseForgotPassword = () => {
    setIsShowForgotPassWord(false);
    setTimeout(() => setResetMethod("email"), 300);
  };

  const handleEmailFormSubmit = () => {
    setIsShowForgotPassWord(false);
    setIsShowVerify(true);
  };

  const handlePhoneFormSubmit = () => {
    setIsShowForgotPassWord(false);
    setIsShowVerify(true);
  };

  const handleVerifyCode = async (code: string) => {
    setLoadingVerifyBtn(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Verification code:", code);

    setLoadingVerifyBtn(false);
    setIsShowVerify(false);
    setIsShowChangePassword(true);
  };

  return (
    <>
      <PageTitle
        title="Address"
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
                  <BreadcrumbPage>Address</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        }
      />
      <div className="grid md:grid-cols-[auto_1fr] items-start md:gap-5 md:mx-6 ml:mx-8 lg:mx-12 mt-6 md:mt-8">
        <div className="all-sides-shadow-xl rounded-2xl py-8 hidden md:block">
          <Sidebar />
        </div>
        <div className="font-geologica text-[#000000CC] all-sides-shadow-xl rounded-2xl px-8 md:pt-5 pb-10">
          <div className="text-[#00000099] flex flex-col gap-1 mb-6">
            <h2 className="text-[clamp(16px,2.2vw,28px)] font-medium">
              Change Password
            </h2>
            <p className="text-[clamp(12px,1.4vw,16px)]">
              {`For your security, please don't reuse old passwords.`}
            </p>
          </div>
          <div className="w-full md:w-[70%] lg:w-1/2">
            {userInfo && (
              <ChangePasswordForm
                onSubmit={handlePasswordUpdate}
                initialData={{ userPassword: userInfo.userPassword }}
                onForgotPassWord={() => setIsShowForgotPassWord(true)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Reset Password Dialog - Shows Email or Phone based on resetMethod */}
      <DrawerDialog
        open={isShowForgotPassWord}
        close={handleCloseForgotPassword}
        size="sm"
        title="Reset Password"
        titleCSS="sr-only"
        contentCSS="md:px-[30px] h-fit pb-10"
        closeIcon={
          <div className="border border-[#0000001A] p-3 rounded-full">
            <CloseIcon className="w-2 h-2" />
          </div>
        }
      >
        <ResetAuthCards
          title="Reset Password"
          subTitle={
            resetMethod === "email"
              ? "Enter the email address linked to your account and we'll send you a link to reset your password."
              : "Enter the phone number linked to your account and we'll send you a verification code to reset your password."
          }
          cardContent={
            resetMethod === "email" ? (
              <>
                {userInfo && (
                  <ResetPasswordViaEmailForm
                    onPhoneNumberReset={() => setResetMethod("phone")}
                    onSubmit={handleEmailFormSubmit}
                    initialData={{ email: userInfo.email }}
                  />
                )}
              </>
            ) : (
              <>
                {userInfo && (
                  <ResetPasswordViaPhoneNumberForm
                    onEmailReset={() => setResetMethod("email")}
                    onSubmit={handlePhoneFormSubmit}
                    initialData={{ phoneNumber: userInfo.phoneNumber }}
                  />
                )}
              </>
            )
          }
        />
      </DrawerDialog>

      {/* Verification Code Dialog */}
      <DrawerDialog
        open={isShowVerify}
        close={() => setIsShowVerify(false)}
        size="md"
        title="Enter Verification Code"
        titleCSS="sr-only"
        contentCSS="md:px-[30px] h-fit pb-10"
        closeIcon={
          <div className="border border-[#0000001A] p-3 rounded-full">
            <CloseIcon className="w-2 h-2" />
          </div>
        }
      >
        <ResetAuthCards
          title="Enter Verification Code"
          subTitle={`We sent a 6-digit code to ${resetMethod === "email" ? userInfo?.email : userInfo?.phoneNumber}. Enter it below to continue`}
          cardContent={
            <VerificationCodeInput
              onVerify={handleVerifyCode}
              phoneNumber={userInfo?.phoneNumber}
              email={userInfo?.email}
              loading={loadingVerifyBtn}
            />
          }
        />
      </DrawerDialog>

      {/* Change Password Dialog */}
      <DrawerDialog
        open={isShowchangePassword}
        close={() => setIsShowChangePassword(false)}
        size="md"
        title="Change Password"
        titleCSS="sr-only"
        contentCSS="md:px-[30px] h-fit pb-10"
        closeIcon={
          <div className="border border-[#0000001A] p-3 rounded-full">
            <CloseIcon className="w-2 h-2" />
          </div>
        }
      >
        <ResetAuthCards
          title="Change Password"
          subTitle={`Choose a strong password you haven't used before.`}
          cardContent={
            <CreateNewPasswordForm
              onSubmit={() => setIsShowChangePassword(false)}
            />
          }
        />
      </DrawerDialog>
    </>
  );
};

export default ChangePassword;
