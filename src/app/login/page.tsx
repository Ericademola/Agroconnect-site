"use client";

import AuthPage from "@/components/AuthPage/AuthPage";
import { DrawerDialog } from "@/components/DrawerDialog/DrawerDialog";
import BuyerLoginForm from "@/components/Forms/BuyerLoginForm";
import ChangePasswordForm from "@/components/Forms/ChangePasswordForm";
import FarmerLoginForm from "@/components/Forms/FarmerLoginForm";
import ResetPasswordViaEmailForm, {
  ResetPasswordViaPhoneNumberForm,
} from "@/components/Forms/ResetPasswordForm";
import VerificationCodeInput from "@/components/Forms/VerificationCodeInput";
import ResetAuthCards from "@/components/ResetAuthCards/ResetAuthCards";
import { CloseIcon } from "@/Icons";
import { useState } from "react";

type ResetMethod = "email" | "phone";

const LoginPage = () => {
  const [onForgotPassWord, setOnForgotPassWord] = useState(false);
  const [resetMethod, setResetMethod] = useState<ResetMethod>("email");
  const [onVerify, setOnVerify] = useState(false);
  const [loadingVerifyBtn, setLoadingVerifyBtn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [changePassword, setChangePassword] = useState(false);

  const handleCloseForgotPassword = () => {
    setOnForgotPassWord(false);
    setTimeout(() => setResetMethod("email"), 300);
  };

  const handleEmailFormSubmit = (data: { email: string }) => {
    setUserEmail(data.email);
    setOnForgotPassWord(false);
    setOnVerify(true);
  };

  const handlePhoneFormSubmit = (data: { phoneNumber: string }) => {
    setUserPhoneNumber(data.phoneNumber);
    setOnForgotPassWord(false);
    setOnVerify(true);
  };

  const handleVerifyCode = async (code: string) => {
    setLoadingVerifyBtn(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Verification code:", code);

    setLoadingVerifyBtn(false);
    setOnVerify(false);
    setChangePassword(true);
  };

  return (
    <>
      <div>
        <AuthPage
          buyerForm={
            <BuyerLoginForm
              onForgotPassWord={() => setOnForgotPassWord(true)}
            />
          }
          farmerForm={
            <FarmerLoginForm
              onForgotPassWord={() => setOnForgotPassWord(true)}
            />
          }
          header="Login"
          text="New to Agriconnect?"
          linkhref="/create-account"
          linkText="Create an Account"
        />
      </div>

      {/* Reset Password Dialog - Shows Email or Phone based on resetMethod */}
      <DrawerDialog
        open={onForgotPassWord}
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
              <ResetPasswordViaEmailForm
                onPhoneNumberReset={() => setResetMethod("phone")}
                onSubmit={handleEmailFormSubmit}
              />
            ) : (
              <ResetPasswordViaPhoneNumberForm
                onEmailReset={() => setResetMethod("email")}
                onSubmit={handlePhoneFormSubmit}
              />
            )
          }
        />
      </DrawerDialog>

      {/* Verification Code Dialog */}
      <DrawerDialog
        open={onVerify}
        close={() => setOnVerify(false)}
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
          subTitle={`We sent a 6-digit code to ${resetMethod === "email" ? userEmail : userPhoneNumber}. Enter it below to continue`}
          cardContent={
            <VerificationCodeInput
              onVerify={handleVerifyCode}
              phoneNumber={userPhoneNumber}
              email={userEmail}
              loading={loadingVerifyBtn}
            />
          }
        />
      </DrawerDialog>

      {/* Change Password Dialog */}
      <DrawerDialog
        open={changePassword}
        close={() => setChangePassword(false)}
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
            <ChangePasswordForm onSubmit={() => setChangePassword(false)} />
          }
        />
      </DrawerDialog>
    </>
  );
};

export default LoginPage;
