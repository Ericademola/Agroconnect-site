"use client";
import AuthPage from "@/components/AuthPage/AuthPage";
import { DrawerDialog } from "@/components/DrawerDialog/DrawerDialog";
import ResetAuthCards from "@/components/ResetAuthCards/ResetAuthCards";
import { CloseIcon } from "@/Icons";
import { useState } from "react";
import { useRouter } from "next/navigation";
import VerificationCodeInput from "@/components/Forms/VerificationCodeInput";
import PopUpUtility from "@/components/PopUtility/PopUtility";
import Image from "next/image";
import BecomeFarmerForm from "@/components/Forms/BecomeFarmerForm";
import { getUserData, updateUserData } from "@/hooks/getUserData";

type UserFormData = {
  email: string;
};

const BecomeFarmer = () => {
  const [isShowVerify, setIsShowVerify] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isVerificationStatus, setIsVerificationStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [loadingLoginBtn, setLoadingLoginBtn] = useState(false);
  const [loadingVerifyBtn, setLoadingVerifyBtn] = useState(false);

  const router = useRouter();

  const handleFormSubmit = ({ email }: UserFormData) => {
    setUserEmail(email);
    setIsShowVerify(true);
  };

  const handleVerifyCode = async (code: string) => {
    setLoadingVerifyBtn(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Verification code:", code);

    // Add FARMER to accountType array
    const currentData = getUserData();
    const hasFarmer = currentData.accountType.includes("FARMER");

    if (!hasFarmer) {
      updateUserData({
        accountType: [...currentData.accountType, "FARMER"],
      });
    }

    setIsShowVerify(false);
    setIsVerificationStatus("success");
  };

  const closeModal = () => {
    setIsVerificationStatus("idle");
  };

  const handleLogin = async () => {
    setLoadingLoginBtn(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    router.push("/");
  };

  return (
    <>
      <div>
        <AuthPage
          form={<BecomeFarmerForm onSubmit={handleFormSubmit} />}
          header="Become a Farmer"
          text=" Become a our accredited supplier of farm produce."
          linkhref=""
        />
      </div>

      {/* Verification Code Dialog */}
      <DrawerDialog
        open={isShowVerify}
        close={() => setIsShowVerify(false)}
        size="md"
        title="Enter Verification Code"
        titleCSS="sr-only"
        contentCSS="md:pt-[20px] md:px-[30px] h-fit pb-5 md:pb-20"
        closeIcon={
          <div className="border border-[#0000001A] p-3 rounded-full">
            <CloseIcon className="w-2 h-2" />
          </div>
        }
      >
        <ResetAuthCards
          title="Enter Verification Code"
          subTitle={`We sent a 6-digit code to ${userEmail}. Enter it below to continue`}
          cardContent={
            <VerificationCodeInput
              onVerify={handleVerifyCode}
              email={userEmail}
              loading={loadingVerifyBtn}
            />
          }
        />
      </DrawerDialog>

      {/* Success Modal */}
      <DrawerDialog
        open={isVerificationStatus === "success"}
        close={closeModal}
        size="sm"
        title="Account Created Successfully!"
        titleCSS="sr-only text-xs"
        contentCSS=" h-fit"
        headerClassName="border-none py-0"
        scrollAreaClassName="h-fit pb-5"
      >
        <PopUpUtility
          className="w-fit py-5 border-none"
          header="Account Created Successfully!"
          desc="Welcome aboard! Your account has been created. You can now start exploring and shopping with ease."
          icon={
            <Image
              width={100}
              height={100}
              src="/assets/avatars/successCheckMark.svg"
              alt=""
              className="w-[100px] md:w-[120px] ml:w-[140px] lg:w-[150px] h-auto object-cover"
            />
          }
          buttonTitle="Continue to Login"
          hrClassName="hidden"
          handleFirstBtnAtn={handleLogin}
          disabledFirstBtn={loadingLoginBtn}
          loadingFirstBtnAtn={loadingLoginBtn}
        />
      </DrawerDialog>
    </>
  );
};

export default BecomeFarmer;
