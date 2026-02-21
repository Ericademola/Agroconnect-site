"use client";

import AuthPage from "@/components/AuthPage/AuthPage";
import ResetPasswordViaEmailForm, {
  ResetPasswordViaPhoneNumberForm,
} from "@/components/Forms/ResetPasswordForm";
import { useEffect, useState } from "react";
import { ResetMethod } from "../login/page";
import { IuserData } from "@/types";
import { getUserData, updateUserData } from "@/hooks/getUserData";
import VerificationCodeInput from "@/components/Forms/VerificationCodeInput";
import CreateNewPasswordForm from "@/components/Forms/CreateNewPasswordForm";
import { useRouter } from "next/navigation";

const ResetPassword = () => {
  const [resetMethod, setResetMethod] = useState<ResetMethod>("email");
  const [isShowVerify, setIsShowVerify] = useState(false);
  const [loadingVerifyBtn, setLoadingVerifyBtn] = useState(false);
  const [isShowChangePassword, setIsShowChangePassword] = useState(false);
  const [userInfo, setUserInfo] = useState<IuserData | null>(null);

  useEffect(() => {
    const data = getUserData();
    setUserInfo(data);
  }, []);

  const router = useRouter();

  const handleEmailFormSubmit = () => {
    setIsShowVerify(true);
  };

  const handlePhoneFormSubmit = () => {
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

  const handleSaveNewPassword = async (password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    updateUserData({ userPassword: password });
    setIsShowChangePassword(false);
    router.push("/login");
  };

  return (
    <div>
      <AuthPage
        form={
          <>
            {!isShowVerify && !isShowChangePassword && (
              <>
                {resetMethod === "email" ? (
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
                )}
              </>
            )}

            {isShowVerify && (
              <VerificationCodeInput
                onVerify={handleVerifyCode}
                phoneNumber={userInfo?.phoneNumber}
                email={userInfo?.email}
                loading={loadingVerifyBtn}
              />
            )}

            {isShowChangePassword && (
              <CreateNewPasswordForm onSubmit={handleSaveNewPassword} />
            )}
          </>
        }
        header={
          isShowVerify
            ? "Enter Verification Code"
            : isShowChangePassword
              ? "Change Password"
              : "Reset Password"
        }
        text={
          isShowVerify
            ? `We sent a 6-digit code to ${resetMethod === "email" ? userInfo?.email : userInfo?.phoneNumber}. Enter it below to continue`
            : isShowChangePassword
              ? "`Choose a strong password you haven't used before.`"
              : resetMethod === "email"
                ? "Enter the email address linked to your account and we'll send you a link to reset your password."
                : "Enter the phone number linked to your account and we'll send you a verification code to reset your password."
        }
        linkhref=""
      />
    </div>
  );
};

export default ResetPassword;
