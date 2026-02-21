"use client";

import AuthPage from "@/components/AuthPage/AuthPage";
import { DrawerDialog } from "@/components/DrawerDialog/DrawerDialog";
import CreateNewPasswordForm from "@/components/Forms/CreateNewPasswordForm";
import ResetPasswordViaEmailForm, {
  ResetPasswordViaPhoneNumberForm,
} from "@/components/Forms/ResetPasswordForm";
import VerificationCodeInput from "@/components/Forms/VerificationCodeInput";
import ResetAuthCards from "@/components/ResetAuthCards/ResetAuthCards";
import { getUserData, updateUserData } from "@/hooks/getUserData";
import { CloseIcon } from "@/Icons";
import { IuserData } from "@/types";
import { useEffect, useState } from "react";
import LoginForm from "@/components/Forms/LoginForm";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/navigation";

export type ResetMethod = "email" | "phone";

const LoginPage = () => {
  const [isShowForgotPassWord, setIsShowForgotPassWord] = useState(false);
  const [resetMethod, setResetMethod] = useState<ResetMethod>("email");
  const [isShowVerify, setIsShowVerify] = useState(false);
  const [loadingVerifyBtn, setLoadingVerifyBtn] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [userInfo, setUserInfo] = useState<IuserData | null>(null);
  // const [isShowForgotPassword, setIsShowForgotPassword] = useState(false);

  useEffect(() => {
    const data = getUserData();
    setUserInfo(data);
  }, []);

  const isMobile = useMediaQuery({
    query: "(max-width: 640px)",
  });

  const router = useRouter();

  const handleForgotPassword = () => {
    // setIsShowForgotPassword(true);
    if (isMobile) {
      router.push("/reset-password");
    } else {
      setIsShowForgotPassWord(true);
    }
  };

  // useEffect(() => {
  //   if (isShowForgotPassword) {
  //     if (isMobile) {
  //       router.push("/reset-password");
  //     } else {
  //       setIsShowForgotPassWord(true);
  //     }
  //   }
  // }, [isMobile, isShowForgotPassword, router]);

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
    setChangePassword(true);
  };

  const handleSaveNewPassword = (password: string) => {
    updateUserData({ userPassword: password });
    setChangePassword(false);
  };

  return (
    <>
      <div>
        <AuthPage
          form={<LoginForm onForgotPassWord={handleForgotPassword} />}
          header="Login"
          text="New to Agriconnect?"
          linkhref="/create-account"
          linkText="Create an Account"
        />
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
            <CreateNewPasswordForm onSubmit={handleSaveNewPassword} />
          }
        />
      </DrawerDialog>
    </>
  );
};

export default LoginPage;
